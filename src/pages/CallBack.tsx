import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { magic } from "../lib/magic";
import { Loader2 } from "lucide-react";
import { syncUserToSupabase } from "@/services/supabase/userService";
import type { User } from "@/types/User";
import { generateAvatar } from "@/utils/Utils";
import { useAuth } from "@/contexts/AuthContext";

export default function Callback() {
  const navigate = useNavigate();
  const { fetchUser } = useAuth();

  const formatUserData = async (): Promise<User> => {
    const result = await magic.oauth2.getRedirectResult({});
    const userInfo = result.oauth.userInfo;
    const userMetadata = result.magic.userMetadata;

    return {
      name: userInfo.name || "Unknown",
      email: userInfo.email || null,
      avatar_url:
        userInfo.picture || generateAvatar(userMetadata.publicAddress),
      public_address: userMetadata.publicAddress || null,
      login_provider: result.oauth.provider || null,
    };
  };

  useEffect(() => {
    (async () => {
      try {
        const user = await formatUserData();
        await syncUserToSupabase(user);
        await fetchUser();
        navigate("/");
      } catch (error: any) {
        if (error?.code === -32600) {
          console.warn("Already logged in, skipping redirect handling.");
          await fetchUser();
          navigate("/");
        } else {
          console.error("OAuth callback error:", error);
          navigate("/login");
        }
      }
    })();
  }, []);

  return (
    <div className='min-h-screen flex items-center justify-center'>
      <Loader2 className='animate-spin' size={72} />
    </div>
  );
}
