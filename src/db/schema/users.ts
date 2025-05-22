/**
 * @param id
 * @param name
 * @param email
 * @param avatar_url
 * @param public_address
 * @param created_at
 */
export interface UserRow {
  id?: string;
  name: string;
  email: string | null;
  avatar_url: string;
  public_address: string;
  is_admin?: boolean;
  login_provider: string;
  created_at?: string;
}

export const USER_FIELDS = {
  ID: "id",
  NAME: "name",
  EMAIL: "email",
  AVATAR_URL: "avatar_url",
  PUBLIC_ADDRESS: "public_address",
  IS_ADMIN: "is_admin",
  LOGIN_PROVIDER: "login_provider",
  CREATED_AT: "created_at",
} as const;
