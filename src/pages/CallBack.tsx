import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { magic } from "../lib/magic";
import { Loader2 } from "lucide-react";
import { createUser } from "@/services/supabase/userService";
import { useAuth } from "@/contexts/AuthContext";
import type { User } from "@/types/User";

export default function Callback() {
  const navigate = useNavigate();
  const { fetchUser } = useAuth();

  const formatUserData = async (): Promise<User> => {
    const result = await magic.oauth2.getRedirectResult({});
    const userInfo = result.oauth.userInfo;
    const userMetadata = result.magic.userMetadata;

    if (
      !userInfo.name ||
      !userInfo.email ||
      !userInfo.picture ||
      !userMetadata.publicAddress
    ) {
      throw new Error("Missing some field.");
    }

    return {
      name: userInfo.name,
      email: userInfo.email,
      avatar_url: userInfo.picture,
      wallet_address: userMetadata.publicAddress,
    };
  };

  useEffect(() => {
    (async () => {
      try {
        const user = await formatUserData();
        console.log("User: ", user);
        await createUser(user);
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
