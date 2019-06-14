#!/bin/bash

echo "Building production files"
yarn build
echo "Building Docker container"
docker build --no-cache -t robodomo/react-client .


