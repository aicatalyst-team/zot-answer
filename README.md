# zot-answer

TypeScript [zot](https://www.zot.sh) extension that opens `/answer` and lets you answer numbered questions from the last assistant message in an interactive panel.

## Behavior

- Watches `assistant_message` events and stores the latest assistant text.
- Registers a single slash command: `/answer`.
- Extracts numbered questions like `1. <question>`, `2. <question>`, `3. <question>`.
- Opens a panel with one answer field per question.
- Type to fill the current answer.
- Use `up` / `down` to move between answers.
- Press `enter` to submit the answers as a prompt to the agent.
- Press `esc` to cancel.

The answer text is rendered in the terminal's normal foreground color; only the `Answer:` label is muted.

You can also pass questions directly:

```text
/answer 1. First question? 2. Second question?
```

## Run for development

```bash
zot --ext .
```

Then use `/answer` in zot.

## Install

```bash
zot ext install .
```

Restart zot, or run `/reload-ext` if zot is already open.

## Runtime

The manifest uses:

```json
"exec": "npx",
"args": ["--yes", "tsx", "index.ts"]
```

That avoids requiring a local package setup. If you have global `tsx`, you can change it to:

```json
"exec": "tsx",
"args": ["index.ts"]
```

## License

MIT
