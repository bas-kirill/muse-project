#!/bin/bash
set -e
currentDir=$(cd -P -- "$(dirname -- "$0")" && pwd -P)
rootDir="$currentDir/../../../"

stage=$1

if [ -z "$1" ]; then
  stage="local"
  echo -e "\033[0;33mNo stage provided. 'local' stage will be used.\033[0m"
fi

echo "kek"
export SERVER_API_URL="$(grep -w SERVER_API_URL "./tools/docker/env/$stage.env" | cut -d '=' -f2-)"  # extract env variable by key
echo "SERVER_API_URL: '${SERVER_API_URL}'"
(cd "$rootDir" && npm --prefix "$rootDir/client" run build)

echo -e "\033[0;32mClient has been built.\033[0m"
