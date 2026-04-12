---
description: merge the current feature branch into main to trigger deployment
---

1. Get the current branch name. Ensure it is not `main`.
2. Check for any uncommitted changes using `git status --porcelain`. If there are changes, advise the user to commit them or use the `/create-pr` workflow first.
// turbo
3. Push the current branch to origin to ensure the remote is up to date:
   `git push origin $(git branch --show-current)`
// turbo
4. Sync the local `main` branch with the remote:
   `git checkout main && git pull origin main`
// turbo
5. Merge the feature branch into `main`. Use `--no-ff` to keep a merge commit if preferred, or standard merge:
   `git merge <feature_branch_name> --no-edit`
// turbo
6. Push the updated `main` branch to GitHub. This will trigger the Dokploy deployment:
   `git push origin main`
7. Inform the user that the merge is complete and Dokploy should be starting the deployment process.
8. Switch back to the previous branch or stay on main:
   `git checkout -`
