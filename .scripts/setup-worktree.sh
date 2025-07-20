#!/bin/bash

# Simple Git worktree setup
# Usage: ./setup-worktree.sh <github-issue-url>

if [ -z "$1" ]; then
  echo "Usage: $0 <github-issue-url>"
  exit 1
fi

GITHUB_ISSUE_URL="$1"

# Validate Github issue URL format
if [[ ! "$GITHUB_ISSUE_URL" =~ ^https://github\.com/[^/]+/[^/]+/issues/[0-9]+$ ]]; then
  echo "❌ Invalid GitHub issue URL format."
  exit 1
fi

# Generate branch name using opencode CLI
echo "🤖 Generating branch name from issue..."
OPENCODE_OUTPUT=$(pnpm --silent exec opencode run "Get information about this GitHub issue using 'gh' CLI: $GITHUB_ISSUE_URL. Based on the issue title and description, generate a perfect git branch name. The branch name MUST follow this format: 'issue-XX-some-understanding-name where XX is the issue number. The branch should be suitable as a folder name. Always answer in the following JSON format: { name: 'issue-XX-some-understanding-name' }. ONLY JSON IS ALLOWED as an answer. No explanation or other text is allowed." 2>/dev/null)

if [ $? -ne 0 ]; then
  echo "❌ Failed to run opencode CLI. Please ensure it is installed and configured correctly."
  echo "Output was: $OPENCODE_OUTPUT"
  exit 1
fi

# Parse the output to get the branch name
echo "🤖 Parsing branch name from opencode output..."
BRANCH_NAME=$(echo "$OPENCODE_OUTPUT" | jq -r '.name' 2>/dev/null)
if [ -z "$BRANCH_NAME" ] || [ "$BRANCH_NAME" == "null" ]; then
  echo "❌ Failed to generate branch name. Please check the opencode CLI output."
  echo "Output was: $OPENCODE_OUTPUT"
  exit 1
fi
echo "🤖 Generated branch name: $BRANCH_NAME"

# Get issue number from URL
echo "🤖 Extracting issue number from URL..."
ISSUE_NUMBER=$(echo "$GITHUB_ISSUE_URL" | grep -oE '[0-9]+$')
if [ -z "$ISSUE_NUMBER" ]; then
  echo "❌ Failed to extract issue number from URL."
  exit 1
fi
echo "🤖 Extracted issue number: $ISSUE_NUMBER"

# Create feature name
echo "🤖 Creating worktree for feature branch..."
FEATURE_NAME="issue-$ISSUE_NUMBER-$BRANCH_NAME"
PROJECT_NAME=$(basename "$(git rev-parse --show-toplevel)")
WORKTREE_PATH="$HOME/worktrees/$PROJECT_NAME/$FEATURE_NAME"

# Create worktree directory
echo "🤖 Setting up worktree directory at $WORKTREE_PATH..."
mkdir -p "$WORKTREE_PATH"

# Check if the worktree already exists
if [ -d "$WORKTREE_PATH" ]; then
  echo "🤖 Worktree directory already exists. Removing existing worktree to avoid conflicts..."
  git worktree remove "$WORKTREE_PATH" 2>/dev/null || rm -rf "$WORKTREE_PATH"
  if [ $? -ne 0 ]; then
    echo "❌ Failed to remove existing worktree. Please check the directory and try again."
    exit 1
  fi
  # Si la branche existe, on la supprime d'abord
  if git show-ref --verify --quiet refs/heads/"$FEATURE_NAME"; then
    echo "🤖 Branch '$FEATURE_NAME' already exists. Deleting it..."
    git branch -D "$FEATURE_NAME"
  fi
fi

# Create the worktree
echo "🤖 Creating worktree for feature branch..."
git worktree add -b "$FEATURE_NAME" "$WORKTREE_PATH"

if [ $? -ne 0 ]; then
  echo "❌ Failed to create worktree. Please check your Git configuration and try again."
  exit 1
fi

# Copy environment files to worktree
echo "🤖 Copying environment files to worktree..."
find . -name ".env*" -type f | while read -r env_file; do
  relative_path=${env_file#./}
  target_dir="$WORKTREE_PATH/$(dirname "$relative_path")"
  mkdir -p "$target_dir"
  cp "$env_file" "$target_dir/"
  echo "Copied $env_file to $target_dir/"
done

# Install dependencies in the worktree
cd "$WORKTREE_PATH"
if [ -f "package.json" ]; then
  echo "🤖 Installing dependencies in the worktree..."
  pnpm install
  if [ $? -ne 0 ]; then
    echo "❌ Dependency installation failed. Please check your package.json and try again."
    exit 1
  fi
  echo "🤖 Dependencies installed successfully."
else
  echo "🤖 No package.json found in the worktree. Skipping dependency installation."
fi

# Make database migrations if applicable
echo "🤖 Checking for database migrations..."
cd "$WORKTREE_PATH"
pnpm run db:migrate
if [ $? -ne 0 ]; then
  echo "❌ Database migrations failed. Did you have 'pnpm run db:migrate' in package.json?"
  echo "🤖 Skipping database migrations."
fi

echo "✅ Worktree setup complete!"

LAUNCH_OUTPUT=$(pnpm --silent exec opencode run "You have successfully set up a new worktree for the GitHub issue: $GITHUB_ISSUE_URL with branch name: $FEATURE_NAME. You can now start working on your feature in the directory: $WORKTREE_PATH by referecing to @./.github/instructions/run-task.md" 2>/dev/null)

if [ $? -ne 0 ]; then
  echo "❌ Failed to run opencode CLI for completion message. Please check the opencode CLI output."
  echo "Output was: $LAUNCH_OUTPUT"
else
  echo "🤖 Completion message sent to opencode CLI."
fi