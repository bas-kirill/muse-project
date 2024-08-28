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

if [ -z "$2" ]; then
  echo -e "\033[0;33m[$stage] No Docker Hub username provided. 'myshx' will be used.\033[0m"
  dockerRepository="myshx"
fi

(cd "$rootDir" && exec ./tools/scripts/server/buildJar.sh)
(cd "$rootDir" && exec ./tools/scripts/server/buildImage.sh "$stage" "$dockerRepository")

echo "debug one"
(cd "$rootDir" && exec ./tools/scripts/client/build.sh "$stage")
echo "debug two"
(cd "$rootDir" && exec ./tools/scripts/client/buildDevImage.sh "$stage" "$dockerRepository")
echo "debug three"
(cd "$rootDir" && exec ./tools/scripts/client/buildImage.sh "$stage" "$dockerRepository" )
echo "debug four"
