import { GearApi } from '@gear-js/api';
import { gearConfig } from '../config'
 
// Connecting to RPC node

const config = gearConfig(process.env.REACT_APP_NETWORK);

async function initApi() {
  const gear = await GearApi.create({
    providerAddress: config.providerAddress,
    customTypes: config.customTypes,
  });
  return gear;
}

export default initApi;
