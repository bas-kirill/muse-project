#!/bin/bash
set -e
currentDir=$(cd -P -- "$(dirname -- "$0")" && pwd -P)
rootDir="$currentDir/../../"

[[ -z "${MUSE_DOCKER_DEFAULT_CONTEXT}" ]] && { echo "'MUSE_DOCKER_DEFAULT_CONTEXT' is not set. Exiting."; exit 1; }
[[ -z "${MUSE_JWT_SECRET_KEY}" ]] && { echo "'MUSE_JWT_SECRET_KEY' is not set. Exiting."; exit 1; }
[[ -z "${SSH_USER}" ]] && { echo "'SSH_USER' is not set. Exiting."; exit 1; }
[[ -z "${SSH_HOST}" ]] && { echo "'SSH_HOST' is not set. Exiting."; exit 1; }

trap 'docker context use "${MUSE_DOCKER_DEFAULT_CONTEXT}"' EXIT

DIFFS_COUNT=$(git diff --name-only | wc -l)

if [ "$DIFFS_COUNT" -ne 0 ]; then
  echo -e "\033[0;31mGit diff not empty. Commit it before deploying. Exiting.\033[0m";
  exit 1;
fi

stage=$1

if [ -z "$1" ]; then
  echo -e "\033[0;33mNo stage provided. 'local' stage will be used.\033[0m"
  stage="local"
fi

dockerRepository=$2

if [ -z "$2" ]; then
  echo -e "\033[0;33m[$stage] No Docker Hub username provided. 'myshx' will be used.\033[0m"
  dockerRepository="myshx"
fi

echo -e "\033[0;37m[$stage] Deploying Docker Services...\033[0m"

if [ "$stage" != "local" ]; then
  context_name=muse-$stage
  if ! docker context ls --format '{{.Name}}' | grep -q "^${context_name}$"; then
      docker context create "${context_name}" --description "[MUSE] '$stage' Deploy Server" --docker "host=ssh://${SSH_USER}@${SSH_HOST}"
  fi

  docker context use "$context_name"
fi

# do not regenerate OpenAPI due to it is already committed to repo
#(cd "$rootDir" && exec ./tools/scripts/openapi/regenerateOpenApi.sh)
(cd "$rootDir" && exec ./tools/scripts/server/generateJooq.sh)
(cd "$rootDir" && exec ./tools/scripts/buildAndPush.sh "$stage" "$dockerRepository")
(cd "$rootDir" && exec ./tools/scripts/stop.sh "$stage" "$dockerRepository")
(cd "$rootDir" && exec ./tools/scripts/clean.sh "$stage" "$dockerRepository")
(cd "$rootDir" && exec ./tools/scripts/run.sh "$stage")

echo -e "\033[0;32m[$stage] List of available ports:\n\033[0m"
(cd "$rootDir" && exec cat "./tools/docker/env/$stage.env")
