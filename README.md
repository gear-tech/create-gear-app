# Gear Application boilerplate

[![Gitpod Ready-to-Code](https://img.shields.io/badge/Gitpod-Ready--to--Code-blue?logo=gitpod)](https://gitpod.io/#https://github.com/gear-tech/create-gear-app)

A ready-made application template with a well-thought-out infrastructure for quickly turning the application on [Gear](https://www.gear-tech.io/) blockchain.

# Features

- Configured app ready to use with @gear-js/@polkadot-js library
- Gear Api Context
- User Context
- Wallet component (Integration with Polkadot-js extansiopn)
- Alert component
- SendMessage to program service
- Read State service
- Build contract script
- Read meta types script
- Gear contract example on Rust (Guestbook)
- Gear dApp frontend exapmle (Guesbook)

# Getting Started

Configure basic dApp in .env:

```shell
REACT_APP_NETWORK
REACT_APP_CONTRACT_ADDRESS
REACT_APP_REGISTRY_TYPES
```

`REACT_APP_NETWORK` is Gear network address (wss://rpc-node.gear-tech.io:443)
`REACT_APP_CONTRACT_ADDRESS` is Gear contract address
`REACT_APP_REGISTRY_TYPES` is registry types for encode/decode data

To get `types` run:

```shell
yarn run build:contract
```

`opt.wasm` and `meta.wasm` files should appear in `src/out`

```shell
yarn run build:types
```

To run:

``shell
yarn run start
```

# License

The source code is licensed under GPL v3.0 license.
See [LICENSE](LICENSE) for details.
