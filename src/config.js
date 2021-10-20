const CONTRACT = process.env.REACT_APP_CONTRACT;

export function gearConfig(env) {
  const customTypes = {
    Action: {
      _enum: {
        AddMessage: {
          author: 'String',
          msg: 'String',
        },
        ViewMessages: 'Null',
      },
    },
    MessageIn: {
      author: 'String',
      msg: 'String',
    },
  };

  switch (env) {
    case 'local':
      return {
        providerAddress: 'ws://127.0.0.1:9944',
        contract: CONTRACT,
        customTypes: customTypes,
      };
    case 'testnet':
      return {
        providerAddress: 'wss://rpc-node.gear-tech.io:443',
        contract: CONTRACT,
        customTypes: customTypes,
      };

    default:
      throw Error(`Unconfigured environment '${env}'. Can be configured in src/config.js.`);
  }
}
