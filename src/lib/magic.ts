import { readDotEnv } from "@/utils/ReadDotEnv";
import { OAuthExtension } from "@magic-ext/oauth2";
import { Magic } from "magic-sdk";
import { ethers } from "ethers";

const PUBLIC_KEY = readDotEnv("VITE_MAGIC_PUBLIC_KEY");
const RPC_URL = readDotEnv("VITE_RPC_URL");
const CHAIN_ID = readDotEnv("VITE_CHAIN_ID");

const LOCAL_PRIVATE_KEY = readDotEnv("VITE_LOCAL_PRIVATE_KEY");
const LOCAL_RPC_URL = readDotEnv("VITE_LOCAL_NETWORK");

export const magic = new Magic(PUBLIC_KEY, {
  extensions: [new OAuthExtension()],
  network: {
    rpcUrl: RPC_URL,
    chainId: CHAIN_ID,
  },
});

export const getProvider = () => {
  return new ethers.JsonRpcProvider(LOCAL_RPC_URL);
};

export const getSigner = () => {
  return new ethers.Wallet(LOCAL_PRIVATE_KEY, getProvider());
};
