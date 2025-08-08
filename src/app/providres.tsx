'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from 'sonner';

export default function Providers({ children }: { children: React.ReactNode }) {
  const reactQueryClient = new QueryClient();
  return (
    <>
      <QueryClientProvider client={reactQueryClient}>
        {children}
        <Toaster />
      </QueryClientProvider>
    </>
  );
}
