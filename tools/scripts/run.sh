#!/bin/bash
set -e
currentDir=$(cd -P -- "$(dirname -- "$0")" && pwd -P)
rootDir="$currentDir/../../"

[[ -z "${MUSE_DOCKER_DEFAULT_CONTEXT}" ]] && { echo "'MUSE_DOCKER_DEFAULT_CONTEXT' is not set. Exiting."; exit 1; }
[[ -z "${MUSE_JWT_SECRET_KEY}" ]] && { echo "'MUSE_JWT_SECRET_KEY' is not set. Exiting."; exit 1; }
[[ -z "${SSH_USER}" ]] && { echo "'SSH_USER' is not set. Exiting."; exit 1; }
[[ -z "${SSH_HOST}" ]] && { echo "'SSH_HOST' is not set. Exiting."; exit 1; }

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

echo -e "\033[0;37m[$stage] Running Docker Services\033[0m"

docker context use "${MUSE_DOCKER_DEFAULT_CONTEXT}"

if [ "$stage" != "local" ]; then
  context_name=muse-$stage
  if ! docker context ls --format '{{.Name}}' | grep -q "^${context_name}$"; then
      docker context create "${context_name}" --description "[MUSE $stage] Deploy Server" --docker "host=ssh://${SSH_USER}@${SSH_HOST}"
  fi

  docker context use "$context_name"
fi

export DOCKER_REPOSITORY=$dockerRepository
export MUSE_GIT_COMMIT_HASH="$(git rev-parse --short HEAD)"
export MUSE_STAGE="$stage"

echo "muse stage: '${MUSE_STAGE}"
echo "DOCKER_REPOSITORY: '${DOCKER_REPOSITORY}"
echo "MUSE_GIT_COMMIT_HASH: '${MUSE_GIT_COMMIT_HASH}"

(cd "$rootDir" && docker compose \
  -f ./tools/docker/docker-compose.yml \
  --env-file ./tools/docker/env/$stage.env \
  --project-name=muse-$stage \
  --profile "$stage" \
  up -d \
  --remove-orphans)


echo -e "\033[0;32m[$stage] Docker Services has been started.\n\033[0m"
