---
description: create atomic commits for changes and open a pull request to main
---

1. Analyze all uncommitted changes in the repository.
2. Group the changes into logical, "atomic" sets (e.g., separating UI components from backend logic).
// turbo
3. For each logical group identified:
   - Stage the relevant files.
   - Commit them with a descriptive message following the pattern: `git commit -m "<message>"`
// turbo
4. Push the current branch to the remote repository and set upstream if necessary:
   `git push -u origin $(git branch --show-current)`
5. Generate a detailed Pull Request description that includes:
   - **Summary**: A high-level overview of the changes.
   - **Technical Details**: Specific components or logic modified.
   - **Verification**: How the changes were tested.
// turbo
6. Create the Pull Request to the `main` branch:
   - Check if `gh` (GitHub CLI) is installed. If so, run: 
     `gh pr create --base main --title "$(git log -1 --pretty=%s)" --body "<generated_description>"`
   - If `gh` is not available, provide the URL to create the PR (e.g., `https://github.com/<user>/<repo>/compare/main...<branch>?expand=1`).
7. Inform the user that the atomic commits have been pushed and the PR is ready.
