import React from 'react';
import { LoginForm } from '@/components/login-form/LoginForm';

const LoginPage = () => {
  return (
    <div className="flex h-screen flex-col items-center justify-center bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-sky-400 to-blue-800">
      <LoginForm/>
    </div>
  );
};

export default LoginPage;
