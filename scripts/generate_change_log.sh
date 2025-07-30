    #!/bin/bash
    set -e

    TAG_NAME=$(cat new_tag.txt)
    PREV_TAG=$(git tag --sort=-creatordate | grep '^prod-' | grep -v "$TAG_NAME" | head -n 1)

    if [ -z "$PREV_TAG" ]; then
      echo "⚠️ No previous prod tag found. Showing last 10 commits."
      git log -10 --pretty=format:"- %h %s (%an, %ar)" > release_notes.txt
    else
      echo "📝 Changelog from $PREV_TAG to $TAG_NAME"
      git log "$PREV_TAG..$TAG_NAME" --pretty=format:"- %h %s (%an, %ar)" > release_notes.txt
    fi

    cat release_notes.txt
