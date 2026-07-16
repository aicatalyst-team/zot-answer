# Image Review: v1.md

**Reviewer:** Image Reviewer
**Draft:** v1.md
**Date:** 2026-07-16

---

## Visual Element Inventory

| # | Type | Location | Description |
|---|------|----------|-------------|
| 1 | Mermaid diagram | Lines 46-52 | `graph LR` showing build pipeline: Dockerfile.ubi -> OpenShift Build -> Quay registry -> Kubernetes Jobs |

**Total visual elements:** 1 (Mermaid diagram)
**Image placeholders:** 0
**Static images:** 0

---

## Dimension Scores

### 1. Placement Rationale (Weight: 2x)

**Score: 7/10**

The single Mermaid diagram is placed logically at the end of the "Containerizing with UBI Node.js" section, summarizing the build-to-deploy flow after the Dockerfile is shown. This aids comprehension by giving readers a visual overview of the pipeline steps they've just read about.

However, the draft has several sections that would strongly benefit from visuals but lack them:

- **"Running the PoC tests"**: A sequence diagram showing the JSON protocol handshake (hello -> hello_ack -> shutdown -> shutdown_ack) would make the protocol flow much clearer than the prose description.
- **"Deploying as Kubernetes Jobs"**: A diagram contrasting Deployment (CrashLoopBackOff) vs. Job (clean exit) would reinforce the "What we learned" insight.
- **"What is zot-answer?"**: A simple diagram showing zot CLI -> extension -> stdin/stdout JSON protocol -> terminal panel would ground readers quickly.

The one diagram that exists is well-placed, but significant comprehension opportunities are missed.

### 2. Prompt Specificity (Weight: 2x)

**Score: N/A (Mermaid only)**

There are no image generation prompts in this draft. The only visual is a Mermaid diagram, which is self-describing code. No image prompts to evaluate.

For Mermaid: the diagram code is clear and specific. Score as **8/10** for diagram code clarity.

### 3. Brand Compliance (Weight: 2x)

**Score: 8/10**

The Mermaid diagram includes a proper `%%{init: ...}%%` theme block with Red Hat brand variables:
- `primaryColor: '#EE0000'` (Red Hat red)
- `primaryBorderColor: '#A30000'` (dark red)
- `primaryTextColor: '#fff'`
- `secondaryColor: '#F0F0F0'` (light gray)
- `lineColor: '#6A6E73'` (mid gray)
- `tertiaryColor: '#0066CC'` (blue)

This is solid. The `#0066CC` blue is not from the standard Red Hat palette (which uses `#0066CC` for links but `#004080` or `#00B9E4` in broader guidelines), but it's a reasonable choice. The `#151515` dark background color from the rubric's reference palette is absent, though it's not needed for this light-themed diagram. Overall, good brand compliance for the one diagram present.

### 4. Aspect Ratio & Sizing (Weight: 1x)

**Score: N/A -> 7/10**

Mermaid diagrams handle their own sizing, so this isn't directly penalizable. However, the `graph LR` direction is appropriate for a 4-node linear flow and will render well in a blog column. No issues here. Giving a reasonable score since no static images need ratio specifications.

### 5. Alt Text Quality (Weight: 1x)

**Score: 3/10**

The Mermaid diagram has **no alt text**. Mermaid blocks rendered as inline SVG or images typically need surrounding alt text or a `figure`/`figcaption` for accessibility. There is no descriptive caption or alt text wrapper around the diagram. A screen reader user would get nothing from this visual.

**Recommendation:** Wrap the Mermaid block in a figure with a caption, or add a one-line text description immediately before/after the diagram, such as:

> *Figure 1: Build pipeline from Dockerfile through OpenShift build to Quay registry and Kubernetes Job deployment.*

### 6. Image Count (Weight: 1x)

**Score: 4/10**

Only 1 visual element in a 7-section, ~1200-word technical blog post. This is insufficient. The abstract identifies 7 sections covering containerization, deployment, protocol testing, and lessons learned. At minimum, 3-4 visuals would be appropriate:

1. The existing build pipeline diagram (keep)
2. A protocol sequence diagram for the JSON handshake
3. An architecture overview of zot -> extension -> stdin/stdout communication
4. Optionally, a diagram showing Job vs. Deployment execution model

One diagram is better than zero, but this post under-serves visual learners.

---

## Scoring Summary

| Dimension | Weight | Raw Score | Weighted |
|-----------|--------|-----------|----------|
| Placement rationale | 2x | 7 | 14 |
| Prompt specificity (Mermaid clarity) | 2x | 8 | 16 |
| Brand compliance | 2x | 8 | 16 |
| Aspect ratio & sizing | 1x | 7 | 7 |
| Alt text quality | 1x | 3 | 3 |
| Image count | 1x | 4 | 4 |

**Weighted total:** 60
**Normalized score:** (60 / 90) * 10 = **6.7**

---

## Recommendations

### Must Fix

1. **Add alt text / figure caption** to the Mermaid diagram for accessibility.
2. **Add a protocol sequence diagram** (Mermaid `sequenceDiagram`) in the "Running the PoC tests" section showing the JSON frame exchange:
   ```
   Extension->>Host: hello (capabilities, commands)
   Extension->>Host: ready
   Host->>Extension: hello_ack
   Host->>Extension: shutdown
   Extension->>Host: shutdown_ack
   ```
   Include the `%%{init: ...}%%` Red Hat theme block.

### Should Fix

3. **Add an architecture overview diagram** in the "What is zot-answer?" section showing the relationship between the zot CLI, the extension, and the stdin/stdout JSON protocol. A `graph TD` or `graph LR` Mermaid diagram would work well.
4. **Consider a Job vs. Deployment comparison** as a simple two-column Mermaid diagram or flowchart in "What we learned" to illustrate why Jobs are the right primitive.

### Nice to Have

5. Add `#151515` to the theme variables if any diagram uses dark backgrounds.
6. Consider whether a small terminal-output screenshot (showing the JSON frames) would add value in "Running the PoC tests", though Mermaid sequence diagrams are preferred over static screenshots.

---

**Final Score: 6.7**
