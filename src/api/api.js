import { GearApi } from '@gear-js/api';

// Connecting to RPC node

async function initApi() {
  const gear = await GearApi.create({
    customTypes: {
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
    },
  });
  return gear;
}

export default initApi;
