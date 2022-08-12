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
"IERC20.json"
"MockERC20.json"
)
SOURCE_ABIS_ROOT=$VERTEX_HOME/vertex-evm/abis/
DEST_ABIS_ROOT=abis/

rm -rf $DEST_ABIS_ROOT
mkdir $DEST_ABIS_ROOT

for FILE in ${ABI_FILES[*]}
  do
    cp "$SOURCE_ABIS_ROOT/$FILE" "$DEST_ABIS_ROOT/$FILE"
    echo "Copied $FILE"
  done


echo "Generating Types"

yarn run typechain --target ethers-v5 --out-dir 'src/typechain-types' './abis/*.json'

echo "Done"