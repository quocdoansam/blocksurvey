/**
 * Generate avatar with dicebear.
 * @param seed
 */
export const generateAvatar = (seed?: string | null) => {
  return `https://api.dicebear.com/6.x/identicon/svg?seed=${
    seed ? seed : "block-survey"
  }`;
};
