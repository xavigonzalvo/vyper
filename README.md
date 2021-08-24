# Compile

    brownie compile --all

Generates directory in `build/deployments`.

# Tests

    brownie test

# Local blockchain

    ganache-cli

Starts in `http://localhost:8545`.

Add the private network alias:

    brownie networks add live private host=http://127.0.0.1:8545 chainid=1337

Deploy contract locally:

    brownie run <deploy_script> --network private

Start a server in order to execute the interfaces:

    python -m http.server 8000
