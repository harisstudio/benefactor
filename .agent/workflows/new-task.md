---
description: start a new task by syncing main and creating a new branch
---

1. Ask the user for the implementation details: "What would you like to implement today?"
2. Based on the user's task description, decide on a concise and descriptive branch name (e.g., `feature/branch-name` or `fix/branch-name`).
// turbo
3. Check the current branch and status. If the current branch is not `main` and there are no uncommitted changes, switch to `main`. If there are uncommitted changes on a non-main branch, ask the user if they want to stash them or commit them before proceeding.
   `git status --porcelain` and `git branch --show-current`
// turbo
4. Sync the main branch with the remote repository:
   `git checkout main && git pull origin main`
// turbo
5. Create and switch to the new branch from main:
   `git checkout -b <branch_name>`
6. Confirm to the user that the branch has been created and the environment is ready for implementation.

