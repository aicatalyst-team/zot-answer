# Formatting review: v2.md

**Reviewer:** Formatting
**Draft:** v2.md
**Normalized score:** 8.2 / 10

---

## Dimension scores

| Dimension | Weight | Score | Weighted | Notes |
|---|---|---|---|---|
| Heading hierarchy | 1x | 9 | 9 | All H2, sentence case, no H1 in body, clean flat cascade appropriate for length |
| Code formatting | 1x | 9 | 9 | Zero inline backticks in running text, proper fenced blocks with language IDs, real runnable code |
| CTA placement | 2x | 8 | 16 | Top (line 20, OpenShift link), mid (lines 22, 52, UBI + OpenShift links), closing (line 151, developers.redhat.com). Mid CTAs are implicit product links rather than explicit calls to action |
| SEO readiness | 1x | 6 | 6 | Title is 76 chars, exceeds 50-60 char target. Keywords present in title and first paragraph |
| Link strategy | 1x | 9 | 9 | 3 links to redhat.com, 1 to developers.redhat.com, 1 to quay.io (Red Hat property), 2 to GitHub. No competitor links |
| Editorial compliance | 2x | 8 | 16 | Oxford commas present throughout. Contractions used well. Acronyms expanded on first use. One uncontracted "you have" on line 151. Abstract lists "Red Hat OpenShift AI" but body says only "OpenShift" |
| Brand standards | 1x | 8 | 8 | Mermaid diagrams use Red Hat brand red (#EE0000). Official product names used correctly |
| Word count | 1x | 9 | 9 | ~891 words in body, well within 800-1300 tutorial target |

**Weighted total:** 82 / 100
**Normalized:** (82 / 100) x 10 = **8.2**

---

## Issues to fix

### Must fix

1. **Title too long for SEO (line 2).** At 76 characters, it will be truncated in search engine results. Shorten to 50-60 characters. Suggested: "Containerizing a CLI extension for OpenShift" (46 chars) or "Deploy a CLI tool on OpenShift with UBI containers" (51 chars).

2. **Product name mismatch with abstract.** The abstract lists "Red Hat OpenShift AI" as a target product, but the blog never mentions OpenShift AI. Either update the blog to reference OpenShift AI where appropriate, or update the abstract. This matters for editorial compliance and keyword targeting.

3. **Uncontracted "you have" on line 151.** Change "If you have CLI tools" to "If you've got CLI tools" to match the aggressive contraction guideline.

### Should fix

4. **Mid-article CTA is implicit (lines 22, 52).** The links to redhat.com are woven into technical sentences rather than serving as explicit calls to action. Consider adding a standalone sentence near the middle like: "Learn more about [building with UBI images](https://www.redhat.com/en/blog/introducing-red-hat-universal-base-image) for your own projects." This would strengthen the 2x-weighted CTA dimension.

5. **Em dash in changelog comment (line 8).** The em dash in "CHANGELOG -- removed during finalization" is inside a comment that gets stripped, so it won't appear in the final post. No action required unless the comment is kept.

### Nice to have

6. **Mermaid rendering.** The Mermaid diagrams (lines 82-89, 95-108) won't render on platforms that don't support Mermaid. Consider providing static image fallbacks for the final published version.

7. **Heading for "What zot-answer does" (line 24).** Consider making it more specific, such as "What zot-answer does and why it matters" to strengthen the narrative hook.

---

## What's working well

- Zero inline backticks in running text -- clean editorial compliance.
- Acronyms (ML, CLI, UBI, PoC, stdin/stdout) all expanded on first use.
- Oxford commas consistently applied across multiple lists.
- Contractions used naturally throughout ("Here's," "There's," "can't," "you'd").
- Real kubectl logs output as evidence rather than pseudocode.
- Word count sits comfortably in the 800-1300 tutorial range.
- Red Hat brand colors (#EE0000) used in Mermaid theme configuration.
- No competitor links anywhere in the post.
