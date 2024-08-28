#!/bin/bash
set -e
currentDir=$(cd -P -- "$(dirname -- "$0")" && pwd -P)
rootDir="$currentDir/../../../"

(cd "$rootDir" && exec ./tools/scripts/openapi/bundle.sh)
(cd "$rootDir/client" && rm -rf ./src/generated)
(cd "$rootDir" && exec docker run \
    --rm \
    -v "${PWD}/openapi:/local/openapi" \
    -v "${PWD}/client/src/generated:/local/client/src/generated" \
    openapitools/openapi-generator-cli:v7.8.0 generate \
    --input-spec /local/openapi/openapi.yml \
    --output /local/client/src/generated \
    --generator-name typescript-axios \
    --additional-properties=apiPackage=api,modelPackage=model,supportsES6=true,withSeparateModelsAndApi=true
)
(cd "$rootDir/server" && ./gradlew clean)
(cd "$rootDir/server" && ./gradlew openApiGenerate)

echo -e "\033[0;32mOpenAPI specs has been regenerated.\033[0m"
