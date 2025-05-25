import { LoginForm } from "@/components/forms/LoginForm";

const Login = () => {
  return (
    <div className='bg-grid dark:bg-grid flex min-h-svh w-full items-center justify-center p-6 md:p-10'>
      <div className='w-full max-w-sm'>
        <LoginForm />
      </div>
    </div>
  );
};

export default Login;
