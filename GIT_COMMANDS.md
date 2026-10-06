# Git Commands

A simple Git reference guide.

Each command has:
- **What:** What the command does
- **When:** When you normally use it
- **Example:** A simple example

---

# Level 1 – Beginner

## 1. Check Git Version

```bash
git --version
```

**What:** Shows your installed Git version.  
**When:** When you want to check whether Git is installed.

---

## 2. Configure Your Name

```bash
git config --global user.name "Pushkal"
```

**What:** Sets the name Git uses for your commits.  
**When:** Usually done once when setting up Git.

---

## 3. Configure Your Email

```bash
git config --global user.email "your@email.com"
```

**What:** Sets the email attached to your commits.  
**When:** Usually done once during Git setup.

---

## 4. Check Configuration

```bash
git config --list
```

**What:** Shows your Git settings.  
**When:** When checking your Git configuration.

---

## 5. Create a Git Repository

```bash
git init
```

**What:** Starts Git tracking in the current folder.  
**When:** When creating a new Git repository.

---

## 6. Clone a Repository

```bash
git clone <repository-url>
```

**What:** Downloads an existing repository to your computer.  
**When:** When starting work on an existing project.

Example:

```bash
git clone https://github.com/username/project.git
```

---

## 7. Check Repository Status

```bash
git status
```

**What:** Shows changed, new, deleted, and staged files.  
**When:** Use this frequently, especially before committing.

---

## 8. Add One File

```bash
git add filename
```

**What:** Moves a file to the staging area.  
**When:** When you want to include that file in your next commit.

Example:

```bash
git add LoginPage.ts
```

---

## 9. Add All Changes

```bash
git add .
```

**What:** Adds all changed/new files.  
**When:** Before creating a commit.

---

## 10. Commit Changes

```bash
git commit -m "Add login test"
```

**What:** Saves staged changes in your local Git history.  
**When:** After completing a meaningful change.

---

## 11. View Commit History

```bash
git log --oneline
```

**What:** Shows commits in a short format.  
**When:** When checking previous work.

---

## 12. See Current Changes

```bash
git diff
```

**What:** Shows changes that are not staged yet.  
**When:** Before `git add`, to review your work.

---

# Level 2 – Daily Git Commands

## 13. Check Current Branch

```bash
git branch --show-current
```

**What:** Shows the branch you are currently using.  
**When:** Before making changes or pushing code.

---

## 14. List Branches

```bash
git branch
```

**What:** Shows local branches.  
**When:** When checking available branches.

---

## 15. Create a Branch

```bash
git branch developer
```

**What:** Creates a new branch.  
**When:** When you want a separate place for new work.

---

## 16. Create and Switch to a Branch

```bash
git switch -c developer
```

**What:** Creates a branch and moves to it.  
**When:** When starting a new feature or development task.

---

## 17. Switch Branch

```bash
git switch developer
```

**What:** Moves to another branch.  
**When:** When changing from one area of work to another.

---

## 18. Push Your Branch

```bash
git push -u origin developer
```

**What:** Uploads your branch to the remote repository.  
**When:** First time you push a new branch.

After this, normally:

```bash
git push
```

---

## 19. Pull Latest Changes

```bash
git pull
```

**What:** Downloads and integrates the latest remote changes.  
**When:** Before starting work or when others have pushed changes.

---

## 20. Fetch Remote Changes

```bash
git fetch
```

**What:** Downloads information about remote changes without changing your files.  
**When:** When you want to see remote updates before merging them.

---

## 21. Show Remote Repository

```bash
git remote -v
```

**What:** Shows the remote repository URL.  
**When:** When checking where your project is connected.

---

## 22. Add a Remote Repository

```bash
git remote add origin <repository-url>
```

**What:** Connects your local repository to a remote repository.  
**When:** Usually after `git init` when connecting to GitHub.

---

# Level 3 – Branching

## 23. Delete a Local Branch

```bash
git branch -d developer
```

**What:** Deletes a local branch.  
**When:** After the branch work has been completed and merged.

---

## 24. Force Delete a Branch

```bash
git branch -D developer
```

**What:** Deletes a local branch even if it has unmerged work.  
**When:** Only when you are sure the branch/work is no longer needed.

---

## 25. Rename a Branch

```bash
git branch -m new-name
```

**What:** Renames the current branch.  
**When:** When a branch name needs to be corrected.

---

## 26. List All Branches

```bash
git branch -a
```

**What:** Shows local and remote branches.  
**When:** When checking all available branches.

---

## 27. Compare Two Branches

```bash
git diff main..developer
```

**What:** Shows code differences between two branches.  
**When:** Before merging or reviewing branch changes.

---

## 28. Show Branch Commit Differences

```bash
git log main..developer --oneline
```

**What:** Shows commits in `developer` that are not in `main`.  
**When:** When checking what your branch has added.

---

# Level 4 – Merge

## 29. Merge a Branch

```bash
git switch developer
git merge main
```

**What:** Brings `main` changes into `developer`.  
**When:** When you want your branch updated with main.

---

## 30. Cancel a Merge

```bash
git merge --abort
```

**What:** Cancels an ongoing merge.  
**When:** When a merge has conflicts and you want to return to the previous state.

---

## 31. Merge Example

```text
main
  |
  +---- A ---- B
              \
developer       C ---- D
```

To bring `main` changes into `developer`:

```bash
git switch developer
git merge main
```

---

# Level 5 – Stash

## 32. Save Unfinished Changes

```bash
git stash
```

**What:** Temporarily stores your changes.  
**When:** When you need to change branches but your current work is not ready to commit.

---

## 33. Stash with a Message

```bash
git stash push -m "Login work"
```

**What:** Saves changes with a description.  
**When:** When you have multiple pieces of temporary work.

---

## 34. View Stashes

```bash
git stash list
```

**What:** Shows saved stashes.  
**When:** When you want to find previously saved work.

---

## 35. Restore Stash

```bash
git stash pop
```

**What:** Restores the latest stash and removes it from the stash list.  
**When:** When you want to continue your saved work.

---

## 36. Apply Stash Without Removing It

```bash
git stash apply
```

**What:** Restores stash but keeps it in the stash list.  
**When:** When you may need the same stash again.

---

## 37. Delete a Stash

```bash
git stash drop stash@{0}
```

**What:** Deletes one stash.  
**When:** When you no longer need it.

---

# Level 6 – Undo Changes

## 38. Unstage a File

```bash
git restore --staged filename
```

**What:** Removes a file from staging but keeps your changes.  
**When:** When you accidentally used `git add`.

---

## 39. Discard File Changes

```bash
git restore filename
```

**What:** Removes local changes from a file.  
**When:** When you do not want your local changes.

**Warning:** Your uncommitted changes can be lost.

---

## 40. Revert a Commit

```bash
git revert <commit-id>
```

**What:** Creates a new commit that reverses another commit.  
**When:** Best suited for undoing a commit that has already been pushed/shared.

Example:

```bash
git revert a83ba5f
```

---

## 41. Soft Reset

```bash
git reset --soft HEAD~1
```

**What:** Removes the last commit but keeps changes staged.  
**When:** When you want to redo the last commit.

---

## 42. Mixed Reset

```bash
git reset HEAD~1
```

**What:** Removes the last commit and unstages the changes, but keeps the files.  
**When:** When you want to modify and recommit the work.

---

## 43. Hard Reset

```bash
git reset --hard HEAD~1
```

**What:** Removes the last commit and its local changes.  
**When:** When you intentionally want to completely remove the latest work.

**Warning:** This can permanently remove uncommitted work.

---

# Level 7 – Remote Branches

## 44. List Remote Branches

```bash
git branch -r
```

**What:** Shows branches available on the remote repository.  
**When:** When checking GitHub branches.

---

## 45. List Local + Remote Branches

```bash
git branch -a
```

**What:** Shows all local and remote branches.  
**When:** When you need a complete branch list.

---

## 46. Delete Remote Branch

```bash
git push origin --delete developer
```

**What:** Deletes a branch from the remote repository.  
**When:** When a remote branch is no longer required.

---

## 47. Set Upstream Branch

```bash
git push -u origin developer
```

**What:** Connects your local branch with its remote branch.  
**When:** First time pushing a new branch.

---

# Level 8 – Rebase

## 48. Rebase Your Branch

```bash
git switch developer
git rebase main
```

**What:** Moves your branch changes on top of the latest `main`.  
**When:** When you want a cleaner project history.

---

## 49. Continue Rebase

```bash
git add <resolved-file>
git rebase --continue
```

**What:** Continues a rebase after resolving a conflict.  
**When:** When Git stops because of a conflict.

---

## 50. Cancel Rebase

```bash
git rebase --abort
```

**What:** Cancels the current rebase.  
**When:** When you want to stop the rebase and return to the previous state.

---

## 51. Skip a Rebase Commit

```bash
git rebase --skip
```

**What:** Skips the commit currently causing the rebase problem.  
**When:** Only when you intentionally do not need that commit.

---

# Level 9 – Conflict Handling

## 52. Check Conflicts

```bash
git status
```

**What:** Shows files with merge/rebase conflicts.  
**When:** Whenever Git reports a conflict.

---

## 53. Typical Conflict

Git may show:

```text
<<<<<<< HEAD
Your code
=======
Other branch code
>>>>>>> main
```

Choose the required code and remove the conflict markers.

Then:

```bash
git add filename
```

For a merge:

```bash
git commit
```

For a rebase:

```bash
git rebase --continue
```

---

# Level 10 – Cherry-Pick

## 54. Cherry-Pick a Commit

```bash
git cherry-pick <commit-id>
```

**What:** Copies one specific commit into your current branch.  
**When:** When you need one particular change without merging the entire branch.

---

## 55. Cancel Cherry-Pick

```bash
git cherry-pick --abort
```

**What:** Cancels an ongoing cherry-pick.  
**When:** When a cherry-pick causes conflicts and you want to stop.

---

## 56. Continue Cherry-Pick

```bash
git add <resolved-file>
git cherry-pick --continue
```

**What:** Continues cherry-pick after resolving conflicts.  
**When:** When Git stopped because of a conflict.

---

# Level 11 – Tags

## 57. Create a Tag

```bash
git tag v1.0.0
```

**What:** Gives a name to a specific commit.  
**When:** Usually for releases or important versions.

---

## 58. Create an Annotated Tag

```bash
git tag -a v1.0.0 -m "Version 1.0.0"
```

**What:** Creates a tag with additional information.  
**When:** For official/release versions.

---

## 59. Push a Tag

```bash
git push origin v1.0.0
```

**What:** Uploads a tag to the remote repository.  
**When:** After creating a release tag.

---

## 60. Push All Tags

```bash
git push origin --tags
```

**What:** Uploads all local tags.  
**When:** When multiple tags need to be pushed.

---

## 61. Delete a Local Tag

```bash
git tag -d v1.0.0
```

**What:** Deletes a local tag.  
**When:** When a tag was created by mistake.

---

# Level 12 – Recovery

## 62. Reflog

```bash
git reflog
```

**What:** Shows previous positions of HEAD and branch history.  
**When:** When you accidentally reset, rebase, delete, or lose a commit.

This is one of Git's most useful recovery commands.

---

## 63. Recover Using Reflog

First:

```bash
git reflog
```

Find the required commit, then:

```bash
git reset --hard <commit-id>
```

**When:** When you need to recover previous work.

---

# Level 13 – Remove Untracked Files

## 64. Preview Untracked Files to Remove

```bash
git clean -n
```

**What:** Shows what `git clean` would remove.  
**When:** Before actually deleting untracked files.

---

## 65. Remove Untracked Files

```bash
git clean -f
```

**What:** Deletes untracked files.  
**When:** When unwanted untracked files are present.

---

## 66. Remove Untracked Files and Folders

```bash
git clean -fd
```

**What:** Deletes untracked files and folders.  
**When:** When you intentionally want a clean working directory.

**Warning:** Check with `git clean -n` first.

---

# Level 14 – Git Ignore

## 67. `.gitignore`

Create:

```text
.gitignore
```

Example:

```gitignore
node_modules/
.env
playwright-report/
test-results/
auth/
*.log
```

**What:** Tells Git which files/folders should not be tracked.  
**When:** For files such as passwords, reports, logs, and generated files.

---

## 68. Check Why a File Is Ignored

```bash
git check-ignore -v filename
```

**What:** Shows which `.gitignore` rule is ignoring a file.  
**When:** When Git does not show a file that you expected to track.

---

# Level 15 – File Operations

## 69. Rename a File

```bash
git mv old-name.ts new-name.ts
```

**What:** Renames a tracked file.  
**When:** When changing a file name.

---

## 70. Delete a File

```bash
git rm filename
```

**What:** Deletes a file and stages the deletion.  
**When:** When removing a tracked file.

---

## 71. Stop Tracking but Keep the File

```bash
git rm --cached filename
```

**What:** Removes the file from Git tracking but keeps it on your computer.  
**When:** Useful when a file should be local only, such as `.env`.

---

# Level 16 – Search and History

## 72. Show One Commit

```bash
git show <commit-id>
```

**What:** Shows details and changes from a commit.  
**When:** When reviewing a specific commit.

---

## 73. Find Commits by Message

```bash
git log --all --grep="login"
```

**What:** Searches commit messages.  
**When:** When looking for a previous change.

---

## 74. Find Who Changed a Line

```bash
git blame filename
```

**What:** Shows which commit/author changed each line.  
**When:** When investigating when or why a line changed.

---

## 75. Show File History

```bash
git log -- filename
```

**What:** Shows commits that changed a particular file.  
**When:** When investigating a file's history.

---

# Level 17 – Advanced Comparison

## 76. Compare Two Commits

```bash
git diff <commit1> <commit2>
```

**What:** Shows differences between two commits.  
**When:** When comparing versions.

---

## 77. Show Commit Graph

```bash
git log --oneline --graph --decorate --all
```

**What:** Shows branches and commits as a visual text graph.  
**When:** When understanding complex branch history.

---

## 78. Find Common Branch History

```bash
git merge-base main developer
```

**What:** Finds the common ancestor of two branches.  
**When:** When investigating branch history.

---

# Level 18 – Advanced Git Commands

## 79. Interactive Rebase

```bash
git rebase -i HEAD~3
```

**What:** Lets you edit, combine, reorder, or remove recent commits.  
**When:** When cleaning up your own local commit history before sharing it.

---

## 80. Amend Last Commit

```bash
git commit --amend -m "Updated message"
```

**What:** Changes the latest commit.  
**When:** When you forgot something or want to correct the last commit.

---

## 81. Add File to Last Commit

```bash
git add filename
git commit --amend --no-edit
```

**What:** Adds another file to the previous commit.  
**When:** When you forgot to include a file.

---

## 82. Force Push Safely

```bash
git push --force-with-lease
```

**What:** Updates a remote branch after history was rewritten while checking that the remote has not unexpectedly changed.  
**When:** Commonly after rebasing your own remote branch.

**Warning:** Use carefully on shared branches.

---

# Level 19 – Git Aliases

## 83. Create Status Shortcut

```bash
git config --global alias.st status
```

Then:

```bash
git st
```

**What:** Creates a shorter command.  
**When:** When you use a command frequently.

---

## 84. Create Log Shortcut

```bash
git config --global alias.lg "log --oneline --graph --decorate --all"
```

Then:

```bash
git lg
```

**What:** Creates a shortcut for a useful log view.  
**When:** When you frequently check project history.

---

# Level 20 – Complete Daily Workflow

For normal development:

```bash
git switch developer
git pull

# Make your changes

git status
git diff

git add .
git commit -m "Update automation"

git push
```

### Simple meaning

```text
git pull
   ↓
Get latest code

Make changes
   ↓
git status
   ↓
Check changes

git add .
   ↓
Prepare changes

git commit
   ↓
Save changes locally

git push
   ↓
Upload changes to GitHub
```

---

# Level 21 – Create a New Developer Branch

```bash
git switch main
git pull
git switch -c developer
git push -u origin developer
```

### Meaning

```text
main
 ↓
Get latest code
 ↓
Create developer branch
 ↓
Push developer branch to GitHub
```

---

# Level 22 – Update Developer from Main

Using merge:

```bash
git switch developer
git fetch origin
git merge origin/main
```

Using rebase:

```bash
git switch developer
git fetch origin
git rebase origin/main
```

### When to use

Use this when `main` has new changes and your development branch needs them.

---

# Level 23 – Typical ECCS Playwright Workflow

Example:

```bash
cd C:\Users\pushkal_shripad\.vscode\ECCS_Workspace\ECCS_Playwright

git switch developer
git pull

# Update Playwright code

git status
git diff

git add .
git commit -m "Update ECCS Playwright automation"
git push
```

---

# Level 24 – Quick Decision Guide

## I changed some code. What next?

```bash
git status
git diff
git add .
git commit -m "message"
git push
```

## I want the latest code from GitHub

```bash
git pull
```

## I want to create a new branch

```bash
git switch -c feature-name
```

## I want to change branch

```bash
git switch branch-name
```

## I accidentally staged a file

```bash
git restore --staged filename
```

## I want to discard local changes

```bash
git restore filename
```

## I need to temporarily save my work

```bash
git stash
```

Then:

```bash
git stash pop
```

## I need to undo a pushed commit

```bash
git revert <commit-id>
git push
```

## I lost a commit

```bash
git reflog
```

## I have a merge conflict

```bash
git status
```

Resolve the conflict, then:

```bash
git add .
git commit
```

## I need to update my branch with main

```bash
git switch developer
git pull origin main
```

Or:

```bash
git fetch origin
git merge origin/main
```

---

# Level 25 – Commands to Learn in Order

If you are learning Git from the beginning, learn in this order:

### Beginner

```bash
git --version
git config
git init
git clone
git status
git add
git commit
git log
git diff
```

### Daily Work

```bash
git branch
git switch
git pull
git push
git fetch
git remote
```

### Intermediate

```bash
git merge
git stash
git restore
git revert
git reset
```

### Advanced

```bash
git rebase
git cherry-pick
git reflog
git rebase -i
git tag
git push --force-with-lease
```

---

# Git Safety Rules

Before using a command that can remove or rewrite work, check:

```bash
git status
git branch --show-current
git log --oneline -5
```

Be especially careful with:

```bash
git reset --hard
git clean -fd
git branch -D
git push --force
git push --force-with-lease
git stash clear
```

---

# Final Git Cheat Sheet

| Command | What | When |
|---|---|---|
| `git status` | Check changes | Very frequently |
| `git add .` | Prepare changes | Before commit |
| `git commit -m "msg"` | Save changes locally | After completing work |
| `git push` | Upload changes | After commit |
| `git pull` | Get latest changes | Before starting work |
| `git fetch` | Check/download remote updates | Before merge/rebase |
| `git branch` | List branches | Check branches |
| `git switch branch` | Change branch | Move between work |
| `git switch -c branch` | Create + switch branch | Start new work |
| `git merge branch` | Combine branch changes | Update branch |
| `git rebase branch` | Reapply commits on another branch | Clean/update history |
| `git stash` | Temporarily save work | Switch branch with unfinished work |
| `git stash pop` | Restore saved work | Continue previous work |
| `git diff` | See code changes | Review before commit |
| `git restore file` | Discard file changes | Remove unwanted local changes |
| `git restore --staged file` | Unstage file | Correct accidental `git add` |
| `git revert commit` | Reverse a commit safely | Undo pushed/shared commit |
| `git reset --soft HEAD~1` | Remove commit, keep changes staged | Redo last commit |
| `git reset --hard HEAD~1` | Remove commit + local changes | Carefully remove work |
| `git reflog` | Find previous Git states | Recover lost work |
| `git cherry-pick commit` | Copy one commit | Take one specific change |
| `git tag v1.0.0` | Mark a version | Releases |
| `git clean -n` | Preview untracked deletion | Before `git clean` |
| `git clean -f` | Delete untracked files | Clean workspace |
| `git remote -v` | Show remote URL | Check GitHub connection |
| `git blame file` | Show line history | Find who/when changed code |

---

# The 5 Commands You Will Use Most

For everyday development, these five are the most common:

```bash
git pull
git status
git add .
git commit -m "message"
git push
```

Remember:

```text
PULL → Get latest code
STATUS → Check your work
ADD → Prepare your work
COMMIT → Save your work
PUSH → Send your work to GitHub
```
