import { GearApi } from '@gear-js/api';

// Connecting to RPC node

async function initApi() {
  const gear = await GearApi.create();
  return gear;
}

export default initApi;
