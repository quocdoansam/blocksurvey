import { uuidV4, randomBytes, ethers } from "ethers";

/**
 * Generate avatar with dicebear.
 * @param seed
 */
export const generateAvatar = (seed?: string | null) => {
  return `https://api.dicebear.com/6.x/identicon/svg?seed=${
    seed ? seed : "block-survey"
  }`;
};

export const generateUUID = () => {
  return uuidV4(randomBytes(16));
};

export const getTimeLeftString = (endTime?: string | Date): string => {
  if (!endTime) return "No deadline";

  const now = new Date().getTime();
  const end = new Date(endTime).getTime();
  const diff = end - now;

  if (diff <= 0) return "Expired";

  const minutes = Math.floor(diff / (1000 * 60)) % 60;
  const hours = Math.floor(diff / (1000 * 60 * 60)) % 24;
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));

  const parts = [];
  if (days > 0) parts.push(`${days}d`);
  if (hours > 0 || days > 0) parts.push(`${hours}h`);
  parts.push(`${minutes}m`);

  return parts.join(" ");
};

export const formatDate = (date?: Date | string) => {
  if (!date) return "N/A";
  return new Date(date).toLocaleString("vi-VN", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });
};

export const startHash = (content: string) => {
  return ethers.keccak256(ethers.toUtf8Bytes(content));
};
