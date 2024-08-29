#!/bin/bash
set -e
currentDir=$(cd -P -- "$(dirname -- "$0")" && pwd -P)
rootDir="$currentDir/../../../"

(cd "$rootDir" && exec ./tools/scripts/openapi/bundle.sh)
(cd "$rootDir" && rm -rf ./client/src/generated)

# https://github.com/OpenAPITools/openapi-generator/issues/12191
(cd "$rootDir" && docker pull openapitools/openapi-generator-cli:v7.8.0)
(cd "$rootDir" &&
  mkdir local &&
  docker run \
  --rm \
  -v "${PWD}:/local" \
  -u "$(id -u)":"$(id -g)" \
  openapitools/openapi-generator-cli:v7.8.0 generate \
  --input-spec local/openapi/openapi.yml \
  --output local/client/src/generated \
  --generator-name typescript-axios \
  --additional-properties=apiPackage=api,modelPackage=model,supportsES6=true,withSeparateModelsAndApi=true
)

#    mkdir local &&
#    mkdir -p local/client/src/generated/model &&
#    mkdir -p /local/client/src/generated/model &&

(cd "$rootDir/server" && ./gradlew clean)
(cd "$rootDir/server" && ./gradlew openApiGenerate)
(cd "$rootDir" && ./tools/scripts/client/runLinter.sh)

echo -e "\033[0;32mOpenAPI specs has been regenerated.\033[0m"
