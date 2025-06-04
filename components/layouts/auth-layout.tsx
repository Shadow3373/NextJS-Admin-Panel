"use client";

import { ReactNode, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { getTokenClient } from '@/lib/auth';
import { toast } from 'sonner';

interface AuthLayoutProps {
  children: ReactNode;
}

export function AuthLayout({ children }: AuthLayoutProps) {
  const router = useRouter();
  
  useEffect(() => {
    // If user is already logged in, redirect to dashboard
    if (getTokenClient()) {
      toast.info('Already logged in, redirecting to dashboard');
      router.push('/dashboard');
    }
  }, [router]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-background to-secondary/30 p-4">
      <div className="w-full max-w-md space-y-8">
        {children}
      </div>
    </div>
  );
}