import { User } from '@/lib/types/UserType';
import { create } from 'zustand';

interface AuthStore {
  user: User | null;
  setUser: (user: User) => void;
  token: string | null;
  setToken: (token: string) => void;
}

export const useAuthStore = create<AuthStore>(set => ({
  user: null,
  token: null,
  setUser: user => set({ user }),
  setToken: token => set({ token }),
}));
