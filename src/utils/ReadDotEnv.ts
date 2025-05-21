import type { EnvKey } from "@/types/EnvKey";

export const readDotEnv = (key: EnvKey) => {
  const value = import.meta.env[key];
  if (!value) throw new Error(`Missing environment variable: ${key}`);
  return value;
};
