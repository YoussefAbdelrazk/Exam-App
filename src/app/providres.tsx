'use client';

import { getQueryClient } from '@/lib/get-query';
import { QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from 'sonner';

export default function Providers({ children }: { children: React.ReactNode }) {
  const reactQueryClient = getQueryClient();
  return (
    <QueryClientProvider client={reactQueryClient}>
      {children}
      <Toaster />
    </QueryClientProvider>
  );
}
