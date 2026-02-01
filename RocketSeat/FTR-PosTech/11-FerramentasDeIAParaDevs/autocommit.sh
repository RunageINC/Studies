#!/bin/bash

# Load .env from script directory (so OPENAI_API_KEY is available without exporting)
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
if [ -f "$SCRIPT_DIR/.env" ]; then
    set -a
    source "$SCRIPT_DIR/.env"
    set +a
fi

# check if there's any changes on repo
if git diff --staged --quiet && git status --porcelain | grep '??' -q; then
    echo "No changes to commit";
    exit 1;
fi

# Generate commit message
echo "There are changes to commit. Generating message according to conventional commit rules...";

openai api chat.completions.create -m gpt-4o -g user "Generate a commit message utilizing the Conventional Commits standard to the following code changes: $(git diff) and if there's any new files, add it to the commit message as well. Don't account for untracked files: $(git status). The output will be saved in a txt file to the atuomation, therefore return only the commit message without any other explanations or additional text." > commit_msg.txt

# Check if the message has been generated
if [ ! -f commit_msg.txt ]; then
    echo "Failed to generate commit message. Stopping the script...";
    exit 1;
fi

echo "Commit message generated successfully!";

# User confirmation before committing message

read -p "Do you want to commit the changes with the message: $(cat commit_msg.txt)? (y/n): " confirm
if [ "$confirm" != "y" ]; then
    echo "Commit message not confirmed. Stopping the script...";
    exit 1;
fi

# Commit the changes
git commit -am "$(cat commit_msg.txt)"

# Add success message
echo "Changes committed successfully!";

# Push the changes
git push origin main

# Clean up
rm commit_msg.txt