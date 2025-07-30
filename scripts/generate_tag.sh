    #!/bin/bash
    set -e

    TIMESTAMP=$(date +%Y%m%d%H%M%S)
    TAG_NAME="prod-${TIMESTAMP}"

    git config user.name "github-actions"
    git config user.email "github-actions@github.com"
    git remote set-url origin "https://x-access-token:${GITHUB_TOKEN}@github.com/${GITHUB_REPOSITORY}.git"
    git tag "$TAG_NAME"
    git push origin "$TAG_NAME"

    echo "$TAG_NAME" > new_tag.txt
    echo "✅ Created and pushed tag: $TAG_NAME"
