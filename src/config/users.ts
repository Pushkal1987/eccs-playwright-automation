import { env } from './env';

// These are the roles currently used in the business flow.
export type UserRole =
  | 'COURIER'
  | 'CUSTODIAN'
  | 'ACDC'
  | 'AO'
  | 'INSPECTOR'
  | 'SUPERINTENDENT';

export interface UserConfig {
  username: string;
  password: string;

}

export const users: Record<UserRole, UserConfig> = {
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
  
};