#!/usr/bin/env bash

docker run \
    -d \
    --rm \
    --name="react-client" \
    --net=host \
    robodomo/react-client
