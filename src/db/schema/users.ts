/**
 *
 * @param id
 * @param name
 * @param email
 * @param avatar_url
 * @param public_address
 * @param created_at
 */
export interface UserRow {
  id: string;
  name: string;
  email: string;
  avatar_url: string;
  public_address: string;
  created_at?: string;
}

export const USER_FIELDS = {
  ID: "id",
  NAME: "name",
  EMAIL: "email",
  AVATAR_URL: "avatar_url",
  PUBLIC_ADDRESS: "public_address",
  CREATED_AT: "created_at",
} as const;
