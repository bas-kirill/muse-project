#!/bin/bash
set -e
currentDir=$(cd -P -- "$(dirname -- "$0")" && pwd -P)
rootDir="$currentDir/../../"

stage=$1

if [ -z "$1" ]
  then
    echo -e "\033[0;33mNo stage provided. 'local' stage will be used.\033[0m"
    stage="local"
fi

dockerRepository=$2

if [ -z "$2" ]
  then
    echo -e "\033[0;33mNo Docker Hub username provided. 'myshx' will be used.\033[0m"
    dockerRepository="myshx"
fi

(cd "$rootDir" && exec ./tools/scripts/stop.sh "$stage")
(cd "$rootDir" && exec ./tools/scripts/clean.sh "$stage")

dockerTag="$stage-$(git rev-parse --short HEAD)"
(cd "$rootDir" && exec ./tools/scripts/buildAndPush.sh "$dockerRepository" "$dockerTag")

export MUSE_SERVER_IMAGE="$dockerRepository/muse-server:$dockerTag"
export MUSE_CLIENT_IMAGE="$dockerRepository/muse-client:$dockerTag"
export MUSE_CLIENT_DEV_IMAGE="$dockerRepository/muse-client-dev:$dockerTag"
(cd "$rootDir/tools/docker" && exec docker compose config)
(cd "$rootDir" && exec ./tools/scripts/run.sh "$stage" "dev")

echo -e "\033[0;32mList of available ports:\n\033[0m"
(cd "$rootDir" && exec cat ./tools/docker/env/$stage.env)
