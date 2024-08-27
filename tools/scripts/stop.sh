#!/bin/bash
set -e
currentDir=$(cd -P -- "$(dirname -- "$0")" && pwd -P)
rootDir="$currentDir/../../"

stage=$1

if [ -z "$1" ]; then
  echo -e "\033[0;33mNo stage provided. 'local' stage will be used.\033[0m"
  stage="local"
fi

#if [ "$stage" != "local" ]; then
#  context_name=muse-deploy-server
#  if ! docker context ls --format '{{.Name}}' | grep -q "^${context_name}$"; then
#      docker context create "${context_name}" --description "[MUSE] Deploy Server" --docker "host=ssh://kiryuxa@88.201.171.120"
#  fi
#
#  docker context use muse-deploy-server
#
#  function finish {
#      docker context use default
#  }
#
#  trap 'finish' EXIT
#fi

# https://github.com/docker/docs/issues/20709
(cd "$rootDir" && exec docker compose \
   -f ./tools/docker/docker-compose.yml \
   --env-file ./tools/docker/env/$stage.env \
   --project-name=muse-$stage \
   down -v)

echo -e "\033[0;32mDocker Service has been stopped.\033[0m"
