# Image Review: v2.md

**Reviewer:** Image
**Draft:** v2.md
**Score:** 7.7 / 10

---

## Visual Element Inventory

| # | Type | Location (lines) | Description |
|---|------|-------------------|-------------|
| 1 | Mermaid `graph LR` | 82-89 | Build pipeline flow: Dockerfile -> OpenShift Build -> Quay.io -> K8s Jobs -> Validate |
| 2 | Mermaid `sequenceDiagram` | 95-108 | JSON protocol exchange between K8s Job and zot-answer extension |

Total visual elements: 2 (both Mermaid diagrams, no generated images)

---

## Dimension Scores

| Dimension | Weight | Score | Weighted | Notes |
|-----------|--------|-------|----------|-------|
| Placement rationale | 2x | 8 | 16 | Both diagrams are positioned where they aid comprehension. Pipeline diagram follows the Job YAML to summarize the workflow. Sequence diagram precedes test results to visualize the protocol exchange. Minor: pipeline diagram could appear earlier to establish context before the Dockerfile details. |
| Prompt specificity | 2x | 9 | 18 | Mermaid code is fully specified and deterministic. Node labels, participant names, and message payloads are explicit. Both render correctly on first try. |
| Brand compliance | 2x | 8 | 16 | Both diagrams include `%%{init:...}%%` blocks with Red Hat brand variables: `#EE0000`, `#A30000`, `#F0F0F0`, `#6A6E73`. Missing `#151515` from palette but `#fff` text on red primary is a reasonable accessible choice. `tertiaryColor: '#0066CC'` is a sensible accent. |
| Aspect ratio & sizing | 1x | 8 | 8 | Per rubric: Mermaid diagrams are not penalized for missing aspect ratios. Both are appropriately scoped in content to render at reasonable sizes. |
| Alt text quality | 1x | 4 | 4 | Neither diagram has alt text or a descriptive caption. Mermaid blocks in markdown don't natively support alt attributes, but surrounding paragraphs could serve as captions. Diagram 1 has no preceding description of what the diagram shows. Diagram 2 has partial context ("We ran two scenarios...") but does not describe the diagram itself. |
| Image count | 1x | 7 | 7 | 2 diagrams for a ~150-line post with 6 sections is adequate. Both earn their place. The post could benefit from a hero or architecture image at the top, but the existing count avoids bloat. |

**Weighted total:** 69 / 90
**Normalized score:** (69 / 90) x 10 = **7.7**

---

## Strengths

1. **Well-chosen diagram types.** The `graph LR` for the pipeline and `sequenceDiagram` for the protocol exchange are the correct Mermaid types for their content. The sequence diagram is particularly effective at making the JSON frame protocol readable.

2. **Consistent brand theming.** Both diagrams use identical `%%{init:...}%%` blocks with Red Hat palette colors. This ensures visual consistency across the post.

3. **No gratuitous images.** Every visual element serves a clear purpose. There are no filler diagrams or decorative images that would slow the reader.

---

## Issues

### Must Fix

1. **Add accessible descriptions for both diagrams.** Add a brief italic caption or descriptive sentence immediately before or after each Mermaid block so that readers using screen readers (or environments that don't render Mermaid) understand what the diagram conveys.
   - Before Diagram 1: *"Figure 1: The build-deploy-validate pipeline from Dockerfile to Job output verification."*
   - Before Diagram 2: *"Figure 2: The JSON frame protocol exchange during a complete extension lifecycle."*

### Should Fix

2. **Consider a hero or overview image at the top.** The post opens with text-only content and the first visual doesn't appear until line 82 (past the halfway point). A pipeline overview diagram or a branded hero image near the top would improve scannability and social sharing previews. If adding a generated image, provide a detailed prompt with Red Hat palette constraints and aspect ratio (e.g., 16:9 for hero, 4:3 for inline).

### Nice to Have

3. **Add `#151515` to the Mermaid theme.** The rubric palette includes `#151515` (Red Hat near-black). Consider using it for `textColor` or `actorTextColor` in the sequence diagram for full palette coverage.
