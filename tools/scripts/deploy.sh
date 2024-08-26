#!/bin/bash
set -e
currentDir=$(cd -P -- "$(dirname -- "$0")" && pwd -P)
rootDir="$currentDir/../../"
gitCommitSha="$(git rev-parse --short HEAD)"

if [ -z "$SSH_HOST" ]; then
    echo "Error: The required environment variable 'SSH_HOST' is not set."
    exit 1
fi

if [ -z "$SSH_PORT" ]; then
    echo "Error: The required environment variable 'SSH_HOST' is not set."
    exit 1
fi

if [ -z "$SSH_USER" ]; then
    echo "Error: The required environment variable 'SSH_USER' is not set."
    exit 1
fi

if [ -z "$SSH_PASS" ]; then
    echo "Error: The required environment variable 'SSH_PASS' is not set."
    exit 1
fi

dockerRepository=$1

if [ -z "$1" ]
  then
    echo -e "\033[0;33mNo Docker Hub username provided. 'myshx' will be used."
    dockerRepository="myshx"
fi

stage=$2

if [ -z "$2" ]
  then
    echo -e "\033[0;33mNo stage provided. 'DEV' stage will be used."
    stage="dev"
fi


dockerTag="$stage-$gitCommitSha"

(cd "$rootDir" && exec ./tools/scripts/clean.sh local)

(cd "$rootDir" && ./tools/scripts/openapi/regenerateOpenApi.sh)

(cd "$rootDir" && exec ./tools/scripts/server/buildJar.sh)
(cd "$rootDir" && exec ./tools/scripts/server/buildImage.sh "$dockerTag")
(cd "$rootDir" && exec ./tools/scripts/pushImage.sh "$dockerRepository" "muse-server" "$dockerTag")

(cd "$rootDir" && exec ./tools/scripts/client/build.sh)

(cd "$rootDir" && exec ./tools/scripts/client/buildDevImage.sh "$dockerTag")
(cd "$rootDir" && exec ./tools/scripts/pushImage.sh "$dockerRepository" "muse-client-dev" "$dockerTag")

(cd "$rootDir" && exec ./tools/scripts/client/buildImage.sh "$dockerTag")
(cd "$rootDir" && exec ./tools/scripts/pushImage.sh "$dockerRepository" "muse-client" "$dockerTag")

sshpass -p "$SSH_PASS" ssh -p "$SSH_PORT" "$SSH_USER@$SSH_HOST" << EOF
export stage=$stage
echo \$stage
export dockerTag=$dockerTag
echo \$dockerTag

cd /tmp
rm -rf ./muse-project
git clone https://github.com/bas-kirill/muse-project.git
cd ./muse-project

./tools/scripts/clean.sh $stage

MUSE_SERVER_TAG="$dockerTag"
MUSE_CLIENT_TAG="$dockerTag"
MUST_CLIENT_DEV_TAG="$dockerTag"

docker compose \
  -f ./tools/docker/docker-compose.yml \
  --env-file ./tools/docker/env/$stage.env \
  --project-name=muse-$stage \
  up -d \
  --remove-orphans

echo -e "\033[0;32mList of available ports:\n\033[0m"
exec cat ./tools/docker/env/$stage.env
EOF
echo -e "\033[0;32mServices has been deployed to '$stage'.\033[0m"
