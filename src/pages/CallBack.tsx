import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { magic } from "../lib/magic";
import { Badge } from "lucide-react";
import { syncUserToSupabase } from "@/services/supabase/userService";
import { generateAvatar } from "@/utils/Utils";
import type { UserRow } from "@/db/schema/users";

export default function Callback() {
  const navigate = useNavigate();

  const formatUserData = async (): Promise<UserRow> => {
    const result = await magic.oauth2.getRedirectResult({});
    const userInfo = result.oauth.userInfo;
    const metadata = await magic.user.getInfo();
    const issuer = metadata.issuer;

    return {
      id: issuer ?? "",
      name: userInfo.name ?? userInfo.email?.split("@")[0] ?? "Unknown",
      email: userInfo.email ?? metadata.email ?? "",
      avatar_url:
        userInfo.picture ??
        generateAvatar(metadata.publicAddress ?? "default-avatar"),
      public_address: metadata.publicAddress || "",
    };
  };

  useEffect(() => {
    (async () => {
      try {
        const user = await formatUserData();
        await syncUserToSupabase(user);
        localStorage.setItem("user", JSON.stringify(user));
        navigate("/");
      } catch (error: any) {
        if (
          error?.code === -32600 &&
          error?.message?.includes(
            "Skipped remaining OAuth verification steps."
          )
        ) {
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
      <Badge className='animate-[spin_2s_ease_infinite]' size={72} />
    </div>
  );
}
function fetchUser() {
  throw new Error("Function not implemented.");
}
