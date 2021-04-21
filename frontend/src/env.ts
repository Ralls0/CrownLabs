const getEnvVar = (envVarName: string) => {
  const envVar = process.env[envVarName] ?? (window as any)[envVarName];
  if (envVar === undefined) {
    throw new Error(`ERROR: ENV VAR ${envVarName} NOT DEFINED`);
  }
};

export const UTIL = getEnvVar("REACT_APP_UTIL");
export const TOOL = getEnvVar("REACT_APP_TOOL");
