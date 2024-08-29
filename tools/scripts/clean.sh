#!/bin/bash
set -e
currentDir=$(cd -P -- "$(dirname -- "$0")" && pwd -P)
rootDir="$currentDir/../../"

[[ -z "${MUSE_DOCKER_DEFAULT_CONTEXT}" ]] && { echo "'MUSE_DOCKER_DEFAULT_CONTEXT' is not set. Exiting."; exit 1; }

trap 'docker context use "${MUSE_DOCKER_DEFAULT_CONTEXT}"' EXIT

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
  context_name=muse-deploy-server
  if ! docker context ls --format '{{.Name}}' | grep -q "^${context_name}$"; then
      docker context create "${context_name}" --description "[MUSE] Deploy Server" --docker "host=ssh://${SSH_USER}@${SSH_HOST}"
  fi

  docker context use muse-deploy-server
fi

(cd "$rootDir/server" && exec ./gradlew clean)

export DOCKER_REPOSITORY=$dockerRepository
export MUSE_GIT_COMMIT_HASH="$(git rev-parse --short HEAD)"
#https://github.com/docker/docs/issues/20709
(cd "$rootDir" && docker compose \
  -f ./tools/docker/docker-compose.$stage.yml \
  --env-file ./tools/docker/env/$stage.env \
  --project-name=muse-$stage \
  rm -f)

echo -e "\033[0;32m[$stage] Resources has been cleaned.\033[0m"
