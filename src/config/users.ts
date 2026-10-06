import { env } from './env';

// These are the roles currently used in the business flow.
export type UserRole =
  | 'RMS_ADMIN'
  | 'COURIER'
  | 'CUSTODIAN'
  | 'ACDC'
  | 'AO'
  | 'INSPECTOR'
  | 'SUPERINTENDENT'
  | 'CUSTOM_GA'
  | 'COURIER_GA'
  | 'CUSTODIAN_GA';

export interface UserConfig {
  username: string;
  password: string;

}

export const users: Record<UserRole, UserConfig> = {
  
  RMS_ADMIN: {
    username: env.rmsAdmin.username,
    password: env.rmsAdmin.password,
  },

  COURIER: {
    username: env.courier.username,
    password: env.courier.password,
  },

  CUSTODIAN: {
    username: env.custodian.username,
    password: env.custodian.password,
  },

  ACDC: {
    username: env.acdc.username,
    password: env.acdc.password,
  },

  AO: {
    username: env.ao.username,
    password: env.ao.password,
  },

  INSPECTOR: {
    username: env.inspector.username,
    password: env.inspector.password,
  },

  SUPERINTENDENT: {
    username: env.superintendent.username,
    password: env.superintendent.password,
  },

  CUSTOM_GA: {
    username: env.customGA.username,
    password: env.customGA.password,
  },

  COURIER_GA: {
    username: env.courierGA.username,
    password: env.courierGA.password,
  },

  CUSTODIAN_GA: {
    username: env.custodianGA.username,
    password: env.custodianGA.password,
  },
 
};