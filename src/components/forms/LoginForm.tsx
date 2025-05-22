import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import Logo from "../landing/Logo";
import Google from "../../../public/google.svg";
import { useLogin } from "@/hooks/useLogin";
import { Loader2, Terminal } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "../ui/alert";

export function LoginForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  const { googleError, isGoogleLoading, loginWithGoogle } = useLogin();

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
          </div>
          {googleError && (
            <Alert variant={"destructive"}>
              <Terminal className='h-4 w-4' />
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>{googleError}</AlertDescription>
            </Alert>
          )}
          <div className='grid gap-4'>
            <Button
              variant='default'
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
