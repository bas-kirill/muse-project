#!/bin/bash
set -e
currentDir=$(cd -P -- "$(dirname -- "$0")" && pwd -P)
rootDir="$currentDir/../../../"

stage=$1

if [ -z "$1" ]; then
  stage="local"
  echo -e "\033[0;33mNo stage provided. 'local' stage will be used.\033[0m"
fi

(cd "$rootDir" &&
  export SERVER_API_URL=$(grep -w SERVER_API_URL "./tools/docker/env/$stage.env" | cut -d '=' -f2-) &&
  echo "1337: '$SERVER_API_URL'" &&
  npm --prefix "$rootDir/client" run build)
