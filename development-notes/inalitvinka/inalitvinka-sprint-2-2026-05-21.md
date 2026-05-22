# Sprint 2: Routing & Signals

## CI Setup (GitHub Actions) 

**Date: 2026-05-21**

### What was done:
I configured a CI pipeline using GitHub Actions to ensure code quality before merging changes into the repository.

### Problems:
At the beginning, I had difficulty understanding why the CI pipeline failed, as the logs were not clear and required time to navigate through GitHub Actions output. I also wanted to intentionally test both successful and failing CI runs to better understand its behavior.

### Solution:
I reviewed the GitHub Actions documentation and inspected workflow logs step by step to understand where the pipeline failed. I also introduced intentional errors (linting and formatting issues) to observe how CI reacts to different types of failures.

To test different CI behaviors, I temporarily modified the workflow trigger from:
`branches: [main, dev]`
to:
`branches: ['**']`

This allowed me to run CI on all branches during testing.

I also temporarily turned off Husky pre-commit hooks using `git commit --no-verify` and pushed the changes to a branch. Then I confirmed that GitHub Actions correctly failed the pipeline, and after fixing the issues, verified that CI passed successfully.

**CI result:**

**Failed run**
![CI failed]()

**Successful run**
![CI passed]()

---

### What I learned:
- How GitHub Actions workflows are structured (jobs, steps, and reusable actions from the GitHub Marketplace)
- How CI is triggered on different GitHub events
- How to use CI as a quality gate before merging
- Difference between linting, formatting, style checking, and build verification

---

## Plans for current sprint
- Project deployment on Netlify
- Implement CD pipeline using Netlify deployment
- Routing
- AuthService implementation

---

## Time spent:
Approximately 2–3 hours
