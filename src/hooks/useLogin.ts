import { magic } from "@/lib/magic";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const useLogin = () => {
  const [emailError, setEmailError] = useState<string | null>(null);
  const [isEmailLoading, setEmailLoading] = useState(false);

  const [googleError, setGoogleError] = useState<string | null>(null);
  const [isGoogleLoading, setGoogleLoading] = useState(false);

  const [githubError, setGithubError] = useState<string | null>(null);
  const [isGithubLoading, setGithubLoading] = useState(false);

  const navigate = useNavigate();
  const loginWithEmail = async (email: string) => {
    setEmailError(null);
    if (!email) {
      setEmailError("The email is required.");
      return;
    }

    setEmailLoading(true);
    try {
      await magic.auth.loginWithMagicLink({
        email: email,
        showUI: false,
      });

      navigate("/");
    } catch (error: any) {
      setEmailError(error.message || "Login failed.");
    } finally {
      setEmailLoading(false);
    }
  };

  const loginWithGoogle = async () => {
    setGoogleError(null);
    setGoogleLoading(true);
    try {
      await magic.oauth2.loginWithRedirect({
        provider: "google",
        redirectURI: `${window.location.origin}/callback`,
      });
    } catch (error: any) {
      setGoogleError(error.message || "Google login failed.");
      setGoogleLoading(false);
    }
  };

  const loginWithGithub = async () => {
    setGithubError(null);
    setGithubLoading(true);
    try {
      await magic.oauth2.loginWithRedirect({
        provider: "github",
        redirectURI: `${window.location.origin}/callback`,
      });
    } catch (error: any) {
      setGithubError(error.message || "GitHub login failed.");
      setGithubLoading(false);
    }
  };

  return {
    emailError,
    isEmailLoading,
    loginWithEmail,
    googleError,
    isGoogleLoading,
    loginWithGoogle,
    githubError,
    isGithubLoading,
    loginWithGithub,
  };
};
