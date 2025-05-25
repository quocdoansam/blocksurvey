import { ethers } from "ethers";
import ElectionABI from "../abi/BlockSurvey.json";
import { readDotEnv } from "@/utils/ReadDotEnv";

const CONTRACT_ADDRESS = readDotEnv("VITE_LOCAL_CONTRACT_ADDRESS");

const getBlockSurveyContract = (
  providerOrSigner: ethers.BrowserProvider | ethers.Signer
) => {
  return new ethers.Contract(CONTRACT_ADDRESS, ElectionABI, providerOrSigner);
};

export default getBlockSurveyContract;
