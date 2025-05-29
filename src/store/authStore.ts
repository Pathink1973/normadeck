import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { supabase } from '../lib/supabase';

type User = {
  id: string;
  email: string;
};

type AuthState = {
  user: User | null;
  session: any | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<{ error: any | null }>;
  signOut: () => Promise<void>;
  checkSession: () => Promise<void>;
};

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      session: null,
      loading: true,
      
      signIn: async (email, password) => {
        const { data, error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        
        if (!error && data.user) {
          set({ 
            user: { 
              id: data.user.id, 
              email: data.user.email as string 
            }, 
            session: data.session 
          });
        }
        
        return { error };
      },
      
      signOut: async () => {
        await supabase.auth.signOut();
        set({ user: null, session: null });
      },
      
      checkSession: async () => {
        set({ loading: true });
        
        const { data } = await supabase.auth.getSession();
        
        if (data.session && data.session.user) {
          set({ 
            user: { 
              id: data.session.user.id, 
              email: data.session.user.email as string 
            }, 
            session: data.session 
          });
        }
        
        set({ loading: false });
      },
    }),
    {
      name: 'normadeck-auth',
      partialize: (state) => ({ session: state.session }),
    }
  )
);