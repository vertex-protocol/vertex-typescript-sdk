#!/bin/bash

# These libraries require a singular source of truth for library code, so having multiple instances
# will break local development of web-related packages. This must be run AFTER running the related script in the SDK repo
PACKAGES=(
  "react"
  "@tanstack/react-query"
  "wagmi"
  "viem"
)

# Check UNLINK env var as a quick way to use a "flag"
if [ "$UNLINK" ]; then YARN_CMD="yarn unlink"; else YARN_CMD="yarn link"; fi

for PACKAGE in "${PACKAGES[@]}"; do
  $YARN_CMD "$PACKAGE"
done

yarn install --force
