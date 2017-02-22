#!/usr/bin/env bash

# Get remote URL of documentation repo (either the `docs`)
REPO_URL="$(git remote get-url docs 2>/dev/null)"
if [ -z "$REPO_URL" ]; then
  # Default documentation repo if no "docs" remote is configured
  REPO_URL="git@github.com:MediaComem/comem-webdev-docs.git"
fi

# Stop if any command fails
set -e

DIR="$PWD"
CURRENT_BRANCH="$(git rev-parse --abbrev-ref HEAD)"
CURRENT_COMMIT="$(git rev-parse --verify HEAD)"
CURRENT_COMMIT_SHORT="$(git rev-parse --verify --short HEAD)"
SLIDES_VERSION="$(node -e 'console.log(require("./config").version);')"

# Stop if slides version is not a number
if [[ ! "$SLIDES_VERSION" =~ ^[0-9]+$ ]]; then
  >&2 echo "Unexpected slides version format: ${SLIDES_VERSION}"
  exit 1
fi

echo



echo "Creating temporary directory..."

TMP_DIR="$(mktemp -d -t comemwebdev.XXX)"

function cleanup {
  echo "Cleaning up..."
  rm -fr "$TMP_DIR"
}

# Clean up the temporary directory when the script exits (successfully or not)
trap cleanup EXIT

echo "$TMP_DIR"
echo



echo "Fetching repository..."
echo
cd "$TMP_DIR"
git init
git remote add -t master origin "$REPO_URL"
git fetch origin
echo



echo "Checking out master..."
echo
cd "$TMP_DIR"
git checkout master
echo



echo "Building..."
echo
cd "$TMP_DIR"
rm -fr "$TMP_DIR/$SLIDES_VERSION"
cd "$DIR"
BUILD_DIR="${TMP_DIR}/${SLIDES_VERSION}" SOURCE_VERSION="$CURRENT_COMMIT" npm run build
echo



echo "Updating latest directory..."
echo
cd "$TMP_DIR"
rm -fr latest
cp -R "$SLIDES_VERSION" latest
echo



echo "Committing & pushing changes..."
echo
cd "$TMP_DIR"
git add --all .
git commit -m "Generated content from ${CURRENT_BRANCH}@${CURRENT_COMMIT_SHORT}"
git push origin master
echo



echo "Done!"
