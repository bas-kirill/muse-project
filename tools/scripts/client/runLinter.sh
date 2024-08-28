#!/bin/bash
set -e
currentDir=$(cd -P -- "$(dirname -- "$0")" && pwd -P)
rootDir="$currentDir/../../../"

(cd "$rootDir/client" && echo "Current path: '$(pwd)'" && npx prettier . --check)
(cd "$rootDir/client" && npx prettier . --write)
