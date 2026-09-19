import path from 'path';
import { env } from './env';

// These are the roles currently used in the business flow.
export type UserRole = 'courier' | 'custodian';

export interface UserConfig {
  username: string;
  password: string;

  // This is the file where the authenticated session will be saved.
  storageState: string;
}

// All authentication file paths are created in one common directory.
const authDirectory = path.resolve('.auth');

// Each role has different credentials and a different storageState file.
export const users: Record<UserRole, UserConfig> = {
  courier: {
    username: env.courier.username,
    password: env.courier.password,
    storageState: path.join(authDirectory, 'courier.json'),
  },

  custodian: {
    username: env.custodian.username,
    password: env.custodian.password,
    storageState: path.join(authDirectory, 'custodian.json'),
  },
};