# Formatting Review: v1.md

**Reviewer:** Formatting
**Draft:** v1.md
**Date:** 2026-07-16

---

## Dimension Scores

### 1. Heading hierarchy (1x) -- Score: 8/10

**Positives:**
- All body headings use H2 (`##`), no H1 in body. Clean cascade.
- Sentence case used throughout ("What is zot-answer?", "Why containerize a CLI extension?", "What we learned").

**Issues:**
- Title in frontmatter uses title case ("Containerizing a CLI Extension for OpenShift: A zot-answer PoC"). Should be sentence case: "Containerizing a CLI extension for OpenShift: A zot-answer PoC".
- No H3 subheadings are used. This is acceptable given the post length, but the "What we learned" section uses bold-lead paragraphs that could be H3s for better semantic structure.

### 2. Code formatting (1x) -- Score: 3/10

**Positives:**
- Code blocks use fenced syntax with language identifiers (`dockerfile`, `yaml`, `mermaid`).
- Code samples are real, runnable code, not pseudocode.

**Issues (critical):**
- **34 instances of inline backticks** found throughout the draft. Rule 3 explicitly states "no backticks in final output." Every inline code reference (`/answer`, `package.json`, `tsx`, `Dockerfile.ubi`, `COPY`, `chgrp`, `USER 0`, `USER 1001`, `EXPOSE`, `hello_ack`, `shutdown`, `hello`, `ready`, `shutdown_ack`, `command_invoked`, `command_response`, `open_panel`, `Dockerfile`, `ubi9/nodejs-22`, `restartPolicy: Never`, `ErrImagePull`, `poc-plan.md`, `poc_test.py`, `poc-report.md`, `kubernetes/`, etc.) must be reformatted. Use italics for file names and monospace formatting appropriate to the publishing platform (not raw markdown backticks).

### 3. CTA placement (2x) -- Score: 3/10

**Positives:**
- A "Try it yourself" section exists at the end (line 109) with actionable steps.

**Issues (critical):**
- No CTA near the top of the post. The rubric requires CTA placement near top, mid, and closing.
- No CTA at mid-point of the article.
- No links to redhat.com anywhere in the CTAs. The closing CTA links to GitHub, not to any Red Hat product page, developer page, or trial.
- Missing suggested CTAs like "Get started with Red Hat OpenShift" or "Try Red Hat OpenShift AI" linking to redhat.com/openshift or developers.redhat.com.

### 4. SEO readiness (1x) -- Score: 6/10

**Positives:**
- Title contains relevant keywords ("Containerizing", "CLI Extension", "OpenShift").
- First paragraph mentions the project name and its technology (TypeScript, CLI tool).
- Tags in frontmatter include relevant terms.

**Issues:**
- Title is 62 characters ("Containerizing a CLI Extension for OpenShift: A zot-answer PoC"), exceeding the 50-60 character target. Consider shortening.
- The primary keyword "OpenShift" doesn't appear in the first body paragraph (line 10). It first appears in line 16 (third paragraph). The first paragraph should mention OpenShift to reinforce SEO.
- No meta description provided in the frontmatter.

### 5. Link strategy (1x) -- Score: 3/10

**Positives:**
- No competitor links present.
- Links to the source project on GitHub are appropriate.

**Issues (critical):**
- Zero internal links to redhat.com or developers.redhat.com. The rubric requires internal links to redhat.com.
- The post mentions "OpenShift", "UBI", "Quay" -- all of which should link to their respective Red Hat product pages on first mention.
- Suggested links to add:
  - OpenShift -> https://www.redhat.com/en/technologies/cloud-computing/openshift
  - UBI -> https://developers.redhat.com/products/rhel/ubi
  - Quay.io -> https://quay.io (Red Hat product)
  - Red Hat Developer -> https://developers.redhat.com
- External link to `www.zot.sh` is fine (it's the upstream project being containerized).

### 6. Editorial compliance (2x) -- Score: 6/10

**Positives:**
- Good use of contractions throughout: "It's", "isn't", "doesn't", "can't", "there's", "you'd". Rule 8 (aggressive contractions) is well followed.
- No em dashes found (Rule 9 compliance).
- No instances of uncontracted forms found ("do not", "does not", etc.).
- Numerals used in running text: "236 lines", "2 seconds", "3 packages" (Rule 9 compliance).

**Issues:**
- **Product names not using full official names on first mention (Rule 4, critical):** "OpenShift" is used throughout without ever being introduced as "Red Hat OpenShift" (or "Red Hat OpenShift AI" per the abstract's product list). First mention on line 2 (title) and line 42 should use the full product name "Red Hat OpenShift."
- **"UBI" never expanded on first mention (Rule 7):** First appearance is line 18. Should be "Universal Base Image (UBI)."
- **"CLI" never expanded on first mention (Rule 7):** First appearance is in the title. Should be "command-line interface (CLI)" at first use in body text.
- **"PoC" never expanded on first mention (Rule 7):** Used in the title, first body use on line 16. Should be "proof of concept (PoC)."
- **"JSON" never expanded:** First use line 10. Should be "JavaScript Object Notation (JSON)" -- though this one is borderline given universal recognition.
- **Oxford comma (Rule 2):** Line 16 has "CLI extensions, developer tools, and protocol-based utilities" -- this correctly uses an Oxford comma. However, line 88 has "sends its `hello` frame with capabilities, registers the `/answer` command, subscribes to events, sends `ready`, receives `hello_ack`, then responds to `shutdown`" -- this serial list is acceptable. Overall, Oxford comma usage is adequate where applicable.

### 7. Brand standards (1x) -- Score: 5/10

**Positives:**
- Mermaid diagram uses Red Hat brand colors (`#EE0000` primary, `#A30000` border, `#0066CC` tertiary). Good attention to visual branding.

**Issues:**
- "OpenShift" used without "Red Hat" prefix. Per Red Hat brand guidelines, the full name "Red Hat OpenShift" should be used on first reference.
- "Quay" used without indicating it's a Red Hat product/service.
- "UBI" used without connecting it to Red Hat ("Red Hat Universal Base Image").
- No reference to Red Hat Developer program or resources.
- The author is listed as "AutoPoC" which doesn't align with Red Hat editorial standards for attribution.

### 8. Word count (1x) -- Score: 9/10

**Positives:**
- Word count is approximately 849 words, falling within the 800-1300 range for tutorials.
- On the shorter end, which is fine for a focused PoC walkthrough.

**Issues:**
- Minor: slightly lean at 849 words. Adding the missing CTAs and product name expansions will naturally bring this closer to the ideal range.

---

## Issue Summary

| # | Severity | Line(s) | Issue | Fix |
|---|----------|---------|-------|-----|
| 1 | Critical | All | 34 inline backtick usages violate Rule 3 | Remove all backticks; use italics for file names, plain text for commands in prose |
| 2 | Critical | All | No redhat.com CTAs at top or mid-post | Add CTA with redhat.com link after intro and after "Deploying as Kubernetes Jobs" |
| 3 | Critical | All | Zero internal links to redhat.com | Add links for OpenShift, UBI, Quay to Red Hat product pages |
| 4 | Major | 2 | Title uses title case ("CLI Extension") | Change to sentence case: "CLI extension" |
| 5 | Major | All | "OpenShift" never introduced as "Red Hat OpenShift" | Use "Red Hat OpenShift" on first mention |
| 6 | Major | 18 | "UBI" acronym not expanded | Expand to "Universal Base Image (UBI)" on first use |
| 7 | Major | 2, 14 | "CLI" acronym not expanded | Expand to "command-line interface (CLI)" on first body use |
| 8 | Major | 16 | "PoC" acronym not expanded | Expand to "proof of concept (PoC)" on first body use |
| 9 | Minor | 2 | Title is 62 chars, target is 50-60 | Shorten title |
| 10 | Minor | 10 | First paragraph doesn't mention OpenShift | Add OpenShift reference to first paragraph for SEO |

---

## Scoring

| Dimension | Weight | Score | Weighted |
|-----------|--------|-------|----------|
| Heading hierarchy | 1x | 8 | 8 |
| Code formatting | 1x | 3 | 3 |
| CTA placement | 2x | 3 | 6 |
| SEO readiness | 1x | 6 | 6 |
| Link strategy | 1x | 3 | 3 |
| Editorial compliance | 2x | 6 | 12 |
| Brand standards | 1x | 5 | 5 |
| Word count | 1x | 9 | 9 |
| **Totals** | **10x** | | **52** |

**Normalized score: (52 / 100) * 10 = 5.2**

---

## Verdict

The draft has strong structural bones -- clean heading hierarchy, real runnable code, good use of contractions, and appropriate word count. However, it has 3 critical formatting failures: pervasive inline backticks (Rule 3 violation), absent CTAs to redhat.com, and zero internal Red Hat links. Acronyms (UBI, CLI, PoC) are never expanded, and the product name "Red Hat OpenShift" is never used in full. These are fixable issues that will significantly improve the score in v2.
