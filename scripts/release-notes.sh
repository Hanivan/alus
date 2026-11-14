#!/usr/bin/env bash
# Release notes for a tag, grouped by commit type (type(scope): title).
# Usage: scripts/release-notes.sh vX.Y.Z [previous-tag]
set -euo pipefail
tag=${1:?usage: release-notes.sh <tag> [previous-tag]}
prev=${2:-$(git describe --tags --abbrev=0 --match "${tag%%[0-9]*}*" "$tag^" 2>/dev/null || true)}
repo=${GITHUB_REPOSITORY:-$(gh repo view --json nameWithOwner -q .nameWithOwner)}
range=$tag
[ -n "$prev" ] && range="$prev..$tag"

# subject only: drop the " — details" tail older commits carry; @words get backticks (no GitHub mentions)
log=$(git log --no-merges --format='%s%x09%h' "$range" | sed 's/ — [^\t]*//')

section() { # title, type regex
  local lines
  lines=$(printf '%s\n' "$log" | grep -E "^($2)(\(|!|:)" | sed -E 's/^[a-z]+(\(([^)]*)\))?!?: (.*)\t(.*)$/- **\2** \3 (\4)/; s/^- \*\*\*\* /- /; s/(^|[^`[:alnum:]])@([[:alnum:]_-]+)/\1`@\2`/g') || true
  [ -n "$lines" ] && printf '### %s\n\n%s\n\n' "$1" "$lines"
  return 0
}

echo "## What's changed"
echo
section 'Features' 'feat|feature'
section 'Fixes' 'fix'
section 'Improvements' 'update|perf|refactor|style'
section 'Maintenance' 'chore|ci|docs|build|test|init'
if [ -n "$prev" ]; then
  echo "**Full changelog**: https://github.com/$repo/compare/$prev...$tag"
else
  echo "**Full changelog**: https://github.com/$repo/commits/$tag"
fi
