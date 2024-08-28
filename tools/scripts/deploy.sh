#!/bin/bash
set -e
currentDir=$(cd -P -- "$(dirname -- "$0")" && pwd -P)
rootDir="$currentDir/../../"

[[ -z "${MUSE_DOCKER_DEFAULT_CONTEXT}" ]] && { echo "'MUSE_DOCKER_DEFAULT_CONTEXT' is not set. Exiting."; exit 1; }
[[ -z "${MUSE_JWT_SECRET_KEY}" ]] && { echo "'MUSE_JWT_SECRET_KEY' is not set. Exiting."; exit 1; }

function finish {
  docker context use "${MUSE_DOCKER_DEFAULT_CONTEXT}"

  # unstash the unstashed changes if it's exists
  if [ "$DIFFS_COUNT" -ne 0 ]; then
    git stash pop -q
  fi
}

trap finish EXIT

DIFFS_COUNT=$(git diff --name-only | wc -l)

# stash any unstaged changes if it's exists
if [ "$DIFFS_COUNT" -ne 0 ]; then
  echo "\033[0;31mGit diff not empty. Commit it before deploying. Exiting.\033[0m";
  exit 1;
fi

if [ "$DIFFS_COUNT" -eq 0 ]; then
  git stash -q --keep-index
fi

stage=$1

if [ -z "$1" ]; then
  echo -e "\033[0;33mNo stage provided. 'DEV' stage will be used.\033[0m"
  stage="dev"
fi

dockerRepository=$2

if [ -z "$2" ]; then
  echo -e "\033[0;33m[$stage] No Docker Hub username provided. 'myshx' will be used.\033[0m"
  dockerRepository="myshx"
fi
#
## Stop local containers
#(cd "$rootDir" && exec ./tools/scripts/stop.sh "local" "$dockerRepository")
#(cd "$rootDir" && exec ./tools/scripts/clean.sh "local" "$dockerRepository")

(cd "$rootDir" && exec ./tools/scripts/buildAndPush.sh "$stage" "$dockerRepository")

docker context use "${MUSE_DOCKER_DEFAULT_CONTEXT}"

if [ "$stage" != "local" ]; then
  context_name=muse-$stage
  if ! docker context ls --format '{{.Name}}' | grep -q "^${context_name}$"; then
      docker context create "${context_name}" --description "[MUSE] '$stage' Deploy Server" --docker "host=ssh://kiryuxa@88.201.171.120"
  fi

  docker context use "$context_name"
fi

(cd "$rootDir" && exec ./tools/scripts/stop.sh "$stage" "$dockerRepository")
(cd "$rootDir" && exec ./tools/scripts/clean.sh "$stage" "$dockerRepository")
(cd "$rootDir" && exec ./tools/scripts/run.sh "$stage")

echo -e "\033[0;32m[$stage] List of available ports:\n\033[0m"
(cd "$rootDir" && exec cat "./tools/docker/env/$stage.env")
