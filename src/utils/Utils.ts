/**
 * Generate avatar with dicebear.
 * @param seed
 */
export const generateAvatar = (seed: string) => {
  return `https://api.dicebear.com/6.x/identicon/svg?seed=${seed}`;
};
