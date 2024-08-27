#!/bin/bash
set -e
currentDir=$(cd -P -- "$(dirname -- "$0")" && pwd -P)
rootDir="$currentDir/../../"

dockerRepository=$1

if [ -z "$1" ]
  then
    echo -e "\033[0;33mNo Docker Hub username provided. 'myshx' will be used.\033[0m"
    dockerRepository="myshx"
fi

dockerTag=$2

if [ -z "$2" ]; then
  echo -e "\033[0;33mNo Docker Tag provided. Latest will be used.\033[0m"
  dockerTag="latest"
fi

(cd "$rootDir" && ./tools/scripts/openapi/regenerateOpenApi.sh)

(cd "$rootDir" && exec ./tools/scripts/server/buildJar.sh)
(cd "$rootDir" && exec ./tools/scripts/server/buildImage.sh "$dockerRepository" "$dockerTag")

(cd "$rootDir" && exec ./tools/scripts/client/build.sh)

(cd "$rootDir" && exec ./tools/scripts/client/buildDevImage.sh "$dockerRepository" "$dockerTag")
(cd "$rootDir" && exec ./tools/scripts/client/buildImage.sh "$dockerRepository" "$dockerTag")
