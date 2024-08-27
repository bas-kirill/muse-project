#!/bin/bash
set -e
currentDir=$(cd -P -- "$(dirname -- "$0")" && pwd -P)
rootDir="$currentDir/../../"

function finish {
  docker context use desktop-linux
}

trap 'finish' EXIT

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

docker context use desktop-linux

if [ "$stage" != "local" ]; then
  context_name=muse-$stage
  if ! docker context ls --format '{{.Name}}' | grep -q "^${context_name}$"; then
      docker context create "${context_name}" --description "[MUSE] '$stage' Deploy Server" --docker "host=ssh://kiryuxa@88.201.171.120"
  fi

  docker context use "$context_name"

  function finish {
    docker context use desktop-linux
  }

  trap "finish" EXIT
fi

(cd "$rootDir" && exec ./tools/scripts/stop.sh "$stage" "$dockerRepository")
(cd "$rootDir" && exec ./tools/scripts/clean.sh "$stage" "$dockerRepository")
(cd "$rootDir" && exec ./tools/scripts/run.sh "$stage")

echo -e "\033[0;32m[$stage] List of available ports:\n\033[0m"
(cd "$rootDir" && exec cat "./tools/docker/env/$stage.env")
