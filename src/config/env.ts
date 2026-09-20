import dotenv from 'dotenv';

// This reads variables from the .env file.
dotenv.config();

// This function stops execution when a required variable is missing.
// It is better to fail immediately than to run a test with undefined data.
function getRequiredEnvironmentVariable(name: string): string {
  const value = process.env[name];

  if (!value) {
    throw new Error(`Environment variable "${name}" is missing in the .env file.`);
  }

  return value;
}

// Export all environment values from one place.
export const env = {
  baseUrl: getRequiredEnvironmentVariable('BASE_URL'),

  courier: {
    username: getRequiredEnvironmentVariable('COURIER_USERNAME'),
    password: getRequiredEnvironmentVariable('COURIER_PASSWORD'),
  },

  custodian: {
    username: getRequiredEnvironmentVariable('CUSTODIAN_USERNAME'),
    password: getRequiredEnvironmentVariable('CUSTODIAN_PASSWORD'),
  },

  acdc: {
    username: getRequiredEnvironmentVariable('ACDC_USERNAME'),
    password: getRequiredEnvironmentVariable('ACDC_PASSWORD'),
  },

  ao: {
    username: getRequiredEnvironmentVariable('AO_USERNAME'),
    password: getRequiredEnvironmentVariable('AO_PASSWORD'),
  },

  inspector: {
    username: getRequiredEnvironmentVariable('INSPECTOR_USERNAME'),
    password: getRequiredEnvironmentVariable('INSPECTOR_PASSWORD'),
  },
} as const;