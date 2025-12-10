import React, { createContext, useContext, useState, useEffect } from 'react';
import { getStorageItem, removeStorageItem, setStorageItem } from './utils';
import { router } from 'expo-router';

type AuthContextData = {
  session: string | null;
  isLoading: boolean;
  signIn: (token: string) => void;
  signOut: () => void;
};

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [session, setSession] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  //terminar de ajustar

  useEffect(() => {
    const loadToken = async () => {
      try {
        const token = await getStorageItem('token');
        if (token) {
          setSession(token);
        }
      } catch (e) {
        console.error(e);
      } finally {
        setIsLoading(false);
      }
    };
    loadToken();
  }, []);

  const signIn = async (token: string) => {
    setSession(token);
    await setStorageItem('token', token);
    router.replace('/(tabs)/home');
  };

  const signOut = async () => {
    setSession(null);
    await removeStorageItem('token');
  };

  return (
    <AuthContext.Provider value={{ session, isLoading, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};
