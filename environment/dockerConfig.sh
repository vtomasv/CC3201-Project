#!/usr/bin/env bash
docker-machine start # Start virtual machine for docker
docker-machine env  # It's helps to get environment variables
eval "$(docker-machine env default)" # Set environment variables
