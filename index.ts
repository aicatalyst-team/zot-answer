import { Buffer } from "node:buffer";
import { createInterface } from "node:readline";
import { stderr, stdin, stdout } from "node:process";

type Frame = { type?: string; [key: string]: unknown };
type Question = { number: number; text: string };

const NAME = "answer";
const VERSION = "0.1.0";
const PANEL_ID = "answer-main";

let lastAssistantText = "";
let questions: Question[] = [];
let answers: string[] = [];
let cursor = 0;
let panelOpen = false;

function send(frame: object): void {
  stdout.write(`${JSON.stringify(frame)}\n`);
}

function log(message: string): void {
  stderr.write(`[${NAME}] ${message}\n`);
}

send({ type: "hello", name: NAME, version: VERSION, capabilities: ["commands", "events", "panels"] });
send({ type: "register_command", name: "answer", description: "answer the last numbered agent questions" });
send({ type: "subscribe", events: ["assistant_message"] });
send({ type: "ready" });

const rl = createInterface({ input: stdin, crlfDelay: Infinity });

rl.on("line", (line) => {
  let frame: Frame;
  try {
    frame = JSON.parse(line) as Frame;
  } catch (error) {
    log(`invalid json from host: ${String(error)}`);
    return;
  }

  switch (frame.type) {
    case "event":
      if (frame.event === "assistant_message" && typeof frame.text === "string") {
        lastAssistantText = frame.text;
      }
      break;
    case "command_invoked":
      handleCommand(frame);
      break;
    case "panel_key":
      handlePanelKey(frame);
      break;
    case "panel_close":
      if (frame.panel_id === PANEL_ID) panelOpen = false;
      break;
    case "shutdown":
      send({ type: "shutdown_ack" });
      rl.close();
      break;
    case "hello_ack":
      log("connected");
      break;
    default:
      break;
  }
});

rl.on("close", () => process.exit(0));

function handleCommand(frame: Frame): void {
  const id = String(frame.id ?? "");
  const name = String(frame.name ?? "");
  const args = typeof frame.args === "string" ? frame.args.trim() : "";

  if (name === "answer" && args.startsWith("--submit ")) {
    const prompt = decodePrompt(args.slice("--submit ".length).trim());
    send({ type: "command_response", id, action: "prompt", prompt });
    return;
  }

  const source = args.length > 0 ? args : lastAssistantText;

  questions = extractNumberedQuestions(source);
  answers = questions.map(() => "");
  cursor = 0;
  panelOpen = true;

  if (questions.length === 0) {
    send({
      type: "command_response",
      id,
      action: "display",
      display:
        "No numbered questions found in the last assistant message. You can also run `/answer 1. Question? 2. Question?`.",
    });
    panelOpen = false;
    return;
  }

  send({
    type: "command_response",
    id,
    action: "open_panel",
    open_panel: {
      id: PANEL_ID,
      title: `Answer ${questions.length} question${questions.length === 1 ? "" : "s"}`,
      lines: renderLines(),
      footer: footer(),
    },
  });
}

function handlePanelKey(frame: Frame): void {
  if (frame.panel_id !== PANEL_ID || !panelOpen) return;

  const key = String(frame.key ?? "");
  switch (key) {
    case "up":
      cursor = Math.max(0, cursor - 1);
      pushRender();
      return;
    case "down":
    case "tab":
      cursor = Math.min(questions.length - 1, cursor + 1);
      pushRender();
      return;
    case "backspace":
      answers[cursor] = (answers[cursor] ?? "").slice(0, -1);
      pushRender();
      return;
    case "delete":
      answers[cursor] = "";
      pushRender();
      return;
    case "enter":
      submitAnswers();
      return;
    case "esc":
      panelOpen = false;
      send({ type: "panel_close", panel_id: PANEL_ID });
      return;
    case "rune": {
      const text = typeof frame.text === "string" ? frame.text : "";
      if (text === "\n" || text === "\r") {
        submitAnswers();
        return;
      }
      answers[cursor] = `${answers[cursor] ?? ""}${text}`;
      pushRender();
      return;
    }
    default:
      return;
  }
}

function submitAnswers(): void {
  const prompt = questions
    .map((q, i) => `${q.number}. ${answers[i]?.trim() || "(no answer)"}`)
    .join("\n");

  panelOpen = false;
  send({ type: "panel_close", panel_id: PANEL_ID });
  send({ type: "submit_slash", text: `/answer --submit ${encodePrompt(prompt)}` });
}

function pushRender(): void {
  send({
    type: "panel_render",
    panel_id: PANEL_ID,
    title: `Answer ${questions.length} question${questions.length === 1 ? "" : "s"}`,
    lines: renderLines(),
    footer: footer(),
  });
}

function renderLines(): string[] {
  if (questions.length === 0) return ["No questions found."];

  const lines: string[] = [];
  questions.forEach((q, i) => {
    const marker = i === cursor ? ">" : " ";
    lines.push(`${marker} ${q.number}. ${q.text}`);
    lines.push(answerLine(answers[i] ?? "", i === cursor));
    if (i < questions.length - 1) lines.push("");
  });
  return lines;
}

function footer(): string {
  return "type to answer - up/down switch answer - enter submit - esc cancel";
}

function answerLine(answer: string, active: boolean): string {
  return `\x1b[90m  Answer: \x1b[39m${answer}${active ? "_" : ""}\x1b[0m`;
}

function encodePrompt(prompt: string): string {
  return Buffer.from(prompt, "utf8").toString("base64url");
}

function decodePrompt(encoded: string): string {
  try {
    return Buffer.from(encoded, "base64url").toString("utf8");
  } catch {
    return encoded;
  }
}

function extractNumberedQuestions(text: string): Question[] {
  const normalized = text.replace(/\r\n/g, "\n");
  const pattern = /(?:^|\n)\s*(\d+)\.\s+([\s\S]*?)(?=(?:\n\s*\d+\.\s+)|$)/g;
  const found: Question[] = [];
  let match: RegExpExecArray | null;

  while ((match = pattern.exec(normalized)) !== null) {
    const number = Number.parseInt(match[1] ?? "0", 10);
    const question = cleanupQuestion(match[2] ?? "");
    if (number > 0 && question.length > 0) {
      found.push({ number, text: question });
    }
  }

  return found;
}

function cleanupQuestion(text: string): string {
  return text
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean)
    .join(" ")
    .replace(/\s+/g, " ")
    .trim();
}
