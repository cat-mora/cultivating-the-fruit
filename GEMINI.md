# Project Overview: Cultivating the Fruits

This project is a comprehensive implementation of the **BMAD (Business Methodology for Agentic Development)** framework. it provides a structured repository of AI agent skills, workflows, and templates designed to guide the development process from initial ideation through design, implementation, and testing.

## Modules and Capabilities

The framework is organized into specialized modules, each covering a specific domain of the development lifecycle:

### 1. Core Module (`_bmad/core`)
Provides foundational utilities for agentic interaction and document management:
- **BMAD Help**: Analyzes current state and recommends next steps in the workflow.
- **Brainstorming**: Facilitates ideation sessions using various techniques.
- **Distillator**: Creates token-efficient document distillates for LLM consumption.
- **Party Mode**: Orchestrates multi-agent discussions and collaboration.
- **Review Tools**: Includes Adversarial Review and Edge Case Hunter for quality assurance.

### 2. Business Method Management (`_bmad/bmm`)
Defines the standard business development phases:
- **1-Analysis**: Product Brief, Market/Technical/Domain Research.
- **2-Planning**: PRD creation, Validation, and UX Design.
- **3-Solutioning**: Architecture design, Epic/Story creation, Readiness checks.
- **4-Implementation**: Sprint Planning, Code Review, Retrospectives.

### 3. Web Design Studio (`_bmad/wds`)
Specialized workflows for strategic web and product design:
- **Strategy**: Project Briefing and Trigger Mapping (mapping goals to user psychology).
- **Design**: Conceptual Sketching, User Scenarios, and Storyboarding.
- **Systems**: Design System management and Functional Component definition.
- **Build**: Agentic development and iterative browser-based verification.

### 4. Test Architecture Enterprise (`_bmad/tea`)
Enterprise-grade testing workflows:
- **Learning**: TEA Academy for testing fundamentals.
- **Implementation**: ATDD (Acceptance Test-Driven Development), Automation, and NFR (Non-Functional Requirements) assessments.
- **Quality Gates**: CI/CD integration, Test Review, and Traceability Matrix generation.

## Directory Structure

- `_bmad/`: Contains module configurations, workflow definitions (`workflow.md`), and skill manifests (`SKILL.md`).
- `_bmad-output/`: Default destination for generated artifacts (planning, implementation, and test reports).
- `design-artifacts/`: Repository for design-specific outputs (Product Briefs, Trigger Maps, UX Scenarios).
- `.gemini/`, `.claude/`, `.agents/`: Specialized skill definitions optimized for different AI agent interfaces.

## Usage Conventions

### Invoking Skills
Agents should interpret the `SKILL.md` files within the respective module folders to understand their persona, objectives, and required data sources. Many skills rely on the `bmad-help.csv` catalog for routing.

### Workflow Execution
1.  **Start with Help**: Invoke `bmad-help` to orient yourself within the project.
2.  **Follow Workflows**: Most skills point to a `workflow.md` file that defines a step-by-step process.
3.  **Artifact Grounding**: Agents should read existing artifacts in `design-artifacts/` or `_bmad-output/` to ensure continuity and consistency across phases.

### Configuration
Global settings like `communication_language` and `output_folder` are defined in the `config.yaml` files within each module directory (e.g., `_bmad/core/config.yaml`).
