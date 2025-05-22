import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Logo from "../landing/Logo";
import Google from "../../../public/google.svg";
import Github from "../../../public/github.svg";
import { useLogin } from "@/hooks/useLogin";
import { Loader2, Terminal } from "lucide-react";
import { useState } from "react";
import { Alert, AlertDescription, AlertTitle } from "../ui/alert";

export function LoginForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  const [email, setEmail] = useState("");
  const {
    googleError,
    isGoogleLoading,
    loginWithGoogle,
    emailError,
    isEmailLoading,
    loginWithEmail,
    githubError,
    isGithubLoading,
    loginWithGithub,
  } = useLogin();

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <form>
        <div className='flex flex-col gap-6'>
          <div className='flex flex-col items-center gap-2'>
            <a
              href='/'
              className='flex flex-col items-center gap-2 font-medium'
            >
              <div className='flex items-center justify-center rounded-md'>
                <Logo size={64} />
              </div>
            </a>
            <h1 className='text-xl font-bold'>Welcome to BlockSurvey</h1>
            <div className='text-center text-sm'>
              Continue without account{" "}
              <a href='/' className='underline underline-offset-4'>
                Home page
              </a>
            </div>
          </div>
          <div className='flex flex-col gap-6'>
            <div className='grid gap-2'>
              <Label htmlFor='email'>Email</Label>
              <Input
                id='email'
                type='email'
                placeholder='blocksurvey.team@example.com'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <Button
              type='submit'
              className='w-full cursor-pointer'
              onClick={() => loginWithEmail(email)}
              disabled={isEmailLoading}
            >
              {isEmailLoading ? <Loader2 className='animate-spin' /> : "Login"}
            </Button>
            {emailError && (
              <Alert variant={"destructive"}>
                <Terminal className='h-4 w-4' />
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>{emailError}</AlertDescription>
              </Alert>
            )}
          </div>
          <div className='relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border'>
            <span className='relative z-10 bg-background px-2 text-muted-foreground'>
              Or
            </span>
          </div>
          {googleError ||
            (githubError && (
              <Alert variant={"destructive"}>
                <Terminal className='h-4 w-4' />
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>
                  {googleError ? googleError : githubError}
                </AlertDescription>
              </Alert>
            ))}
          <div className='grid gap-4 sm:grid-cols-2'>
            <Button
              variant='outline'
              type='button'
              className='w-full cursor-pointer'
              onClick={loginWithGoogle}
              disabled={isGoogleLoading}
            >
              {isGoogleLoading ? (
                <Loader2 className='animate-spin' />
              ) : (
                <>
                  <img src={Google} alt='Google' className='size-4' />
                  Continue with Google
                </>
              )}
            </Button>
            <Button
              variant='outline'
              type='button'
              className='w-full cursor-pointer'
              onClick={loginWithGithub}
              disabled={isGithubLoading}
            >
              {isGithubLoading ? (
                <Loader2 className='animate-spin' />
              ) : (
                <>
                  <img src={Github} alt='Github' className='size-4' />
                  Continue with Github
                </>
              )}
            </Button>
          </div>
        </div>
      </form>
      <div className='text-balance text-center text-xs text-muted-foreground'>
        By clicking continue, you agree to our{" "}
        <a
          href='/terms-of-service'
          className='cursor-pointer font-bold hover:underline'
        >
          Terms of Service
        </a>{" "}
        and{" "}
        <a
          href='/privacy-policy'
          className='cursor-pointer font-bold hover:underline'
        >
          Privacy Policy
        </a>
        .
      </div>
    </div>
  );
}
