#!/usr/bin/env bash

file=$1

vyper -f bytecode contracts/${file}.vy > build/deployments/${file}.bin
vyper -f abi contracts/${file}.vy > build/deployments/${file}.abi

cat build/deployments/${file}.bin
cat build/deployments/${file}.abi
