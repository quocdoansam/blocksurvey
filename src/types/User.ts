export interface User {
  id?: string;
  name: string;
  email: string | null;
  avatar_url: string | null;
  public_address: string | null;
  is_admin?: boolean;
  login_provider: string;
  created_at?: string;
}
