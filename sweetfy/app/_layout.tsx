// app/_layout.tsx (Este é o arquivo RAIZ do seu app)

import React, { useEffect } from 'react';
import { PaperProvider, Portal } from 'react-native-paper';
import { Stack, useRouter, useSegments } from 'expo-router';
import { AuthProvider, useAuth } from '../context/AuthContext';
import { primaryTheme } from '../theme/theme';
import '../app/app.css';
const RootLayoutNav = () => {
  const { session, isLoading } = useAuth();
  const segments = useSegments();
  const router = useRouter();

  useEffect(() => {
    if (isLoading) return;

    const inAuthGroup = segments[0] === '(auth)';

    if (!session && !inAuthGroup) {
      router.replace('/login');
    } else if (session && inAuthGroup) {
      router.replace('/home');
    }
  }, [session, isLoading, segments, router]);

  return (
    <Stack>
      <Stack.Screen
        name="(auth)"
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="(tabs)"
        options={{ headerShown: false }}
      />
    </Stack>
  );
};

export default function RootLayout() {
  return (
    <PaperProvider theme={primaryTheme}>
      <AuthProvider>
        <Portal.Host>
          <RootLayoutNav />
        </Portal.Host>
      </AuthProvider>
    </PaperProvider>
  );
}
