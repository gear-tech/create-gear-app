import { GearApi } from '@gear-js/api';

// Connecting to RPC node

async function initApi() {
  const api = await GearApi.create();
  console.log(api)
  return api;
}

export default initApi;
