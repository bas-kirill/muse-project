#!/bin/bash
set -e
currentDir=$(cd -P -- "$(dirname -- "$0")" && pwd -P)
rootDir="$currentDir/../../"

function finish {
  docker context use "${MUSE_DOCKER_DEFAULT_CONTEXT}"
}

trap 'finish' EXIT

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

docker context use "${MUSE_DOCKER_DEFAULT_CONTEXT}"
if [ "$stage" != "local" ]; then
  context_name=muse-$stage
  if ! docker context ls --format '{{.Name}}' | grep -q "^${context_name}$"; then
      docker context create "${context_name}" --description "[MUSE $stage] Deploy Server" --docker "host=ssh://kiryuxa@88.201.171.120"
  fi

  docker context use "$context_name"
fi

export DOCKER_REPOSITORY=$dockerRepository
export MUSE_GIT_COMMIT_HASH="$(git rev-parse --short HEAD)"
(cd "$rootDir" && docker compose \
  -f ./tools/docker/docker-compose.yml \
  -f ./tools/docker/docker-compose.$stage.yml \
  --env-file ./tools/docker/env/$stage.env \
  --project-name=muse-$stage \
  --profile "$stage" \
  up -d \
  --remove-orphans)

echo -e "\033[0;32m[$stage] Docker Serviced has been started.\n\033[0m"
