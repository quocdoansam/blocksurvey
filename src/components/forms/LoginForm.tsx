import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Logo from "../landing/Logo";
import Google from "../../../public/google.svg";
import Github from "../../../public/github.svg";

export function LoginForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
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
                required
              />
            </div>
            <Button type='submit' className='w-full cursor-pointer'>
              Login
            </Button>
          </div>
          <div className='relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border'>
            <span className='relative z-10 bg-background px-2 text-muted-foreground'>
              Or
            </span>
          </div>
          <div className='grid gap-4 sm:grid-cols-2'>
            <Button
              variant='outline'
              type='button'
              className='w-full cursor-pointer'
            >
              <img src={Google} alt='Google' className='size-4' />
              Continue with Google
            </Button>
            <Button
              variant='outline'
              type='button'
              className='w-full cursor-pointer'
            >
              <img src={Github} alt='Github' className='size-4' />
              Continue with Github
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
