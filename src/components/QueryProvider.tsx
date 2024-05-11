'use client';
import {cartStore} from '@/lib/store';
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';
import {FC, ReactNode, useEffect} from 'react';

const queryClient = new QueryClient();

interface QueryProviderProps {
  children: ReactNode;
};

const QueryProvider: FC<QueryProviderProps> = ({children}) => {
  const updateStore = () => {
    cartStore.persist.rehydrate();
  };
  useEffect(() => {
    document.addEventListener('visibilitychange', updateStore);
    window.addEventListener('focus', updateStore);
    return () => {
      document.removeEventListener('visibilitychange', updateStore);
      window.removeEventListener('focus', updateStore);
    };
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  );
};

export default QueryProvider;