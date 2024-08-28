#!/bin/bash
currentDir=$(cd -P -- "$(dirname -- "$0")" && pwd -P)
rootDir="$currentDir/../../../"

(cd "$rootDir/client" && npx prettier . --check)
(cd "$rootDir/client" && npx prettier . --write)
