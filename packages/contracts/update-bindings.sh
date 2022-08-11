#!/bin/bash

if [[ -z "$VERTEX_HOME" ]]; then
    echo "Must provide VERTEX_HOME in environment" 1>&2
    exit 1
fi

ABI_FILES=(
"IOracle.json"
"IClearinghouse.json"
"IOrderBook.json"
"IPerpEngine.json"
"IProductEngine.json"
"ISpotEngine.json"
"IVertexQuerier.json"
)
ABIS_ROOT=$VERTEX_HOME/vertex-evm/src/abis/

for FILE in ${ABI_FILES[*]}
  do
    cp "$ABIS_ROOT/$FILE" "abis/$FILE"
    echo "Copied $FILE"
  done


echo "Generating Types"

yarn run typechain --target ethers-v5 --out-dir 'src/typechain-types' './src/abis/*.json'

echo "Done"