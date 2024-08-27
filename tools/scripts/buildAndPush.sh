#!/bin/bash
set -e
currentDir=$(cd -P -- "$(dirname -- "$0")" && pwd -P)
rootDir="$currentDir/../../"

stage=$1

if [ -z "$1" ]; then
  echo -e "\033[0;33mNo stage provided. 'local' stage will be used.\033[0m"
  stage="local"
fi

dockerRepository=$2

if [ -z "$2" ]
  then
    echo -e "\033[0;33m[$stage] No Docker Hub username provided. 'myshx' will be used.\033[0m"
    dockerRepository="myshx"
fi

(cd "$rootDir" && ./tools/scripts/openapi/regenerateOpenApi.sh)

(cd "$rootDir" && exec ./tools/scripts/server/buildJar.sh)
echo "[DEBUG]: Repo: '$dockerRepository'"
(cd "$rootDir" && exec ./tools/scripts/server/buildImage.sh "$stage" "$dockerRepository")

(cd "$rootDir" && exec ./tools/scripts/client/build.sh "$stage")

(cd "$rootDir" && exec ./tools/scripts/client/buildDevImage.sh "$stage" "$dockerRepository")
(cd "$rootDir" && exec ./tools/scripts/client/buildImage.sh "$stage" "$dockerRepository" )
