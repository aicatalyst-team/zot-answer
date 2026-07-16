# Blog Abstract: zot-answer PoC

## Thesis
Deploying a TypeScript CLI extension on OpenShift demonstrates that even non-traditional workloads, those designed for local developer tooling, can be containerized with UBI images and validated as Kubernetes Jobs.

## Target Audience
Platform engineers and developers working with CLI extensions and developer tooling on OpenShift.

## Blog Type
Red Hat Developer Blog

## Key Points
1. A single-file TypeScript extension with no package.json was containerized using UBI Node.js 22 and tsx
2. The stdin/stdout JSON protocol was validated using Kubernetes Jobs that pipe input to the container
3. Both test scenarios (protocol handshake and question extraction) passed, proving the containerization preserved functionality

## Products/Projects
- Red Hat OpenShift AI
- UBI 9 (Node.js 22)
- Quay.io container registry

## CTA
Try deploying your own CLI tools and extensions on OpenShift using the AutoPoC pipeline.

## Proposed Sections
1. What is zot-answer?
2. Why containerize a CLI extension?
3. Containerizing with UBI Node.js
4. Deploying as Kubernetes Jobs
5. Running the PoC tests
6. What we learned
7. Try it yourself
