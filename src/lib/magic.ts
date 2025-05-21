import { readDotEnv } from "@/utils/ReadDotEnv";
import { Magic } from "magic-sdk";

const PUBLIC_KEY = readDotEnv("VITE_MAGIC_PUBLIC_KEY");
const RPC_URL = readDotEnv("VITE_RPC_URL");
const CHAIN_ID = readDotEnv("VITE_CHAIN_ID");

export const magic = new Magic(PUBLIC_KEY, {
  network: {
    rpcUrl: RPC_URL,
    chainId: CHAIN_ID,
  },
});
