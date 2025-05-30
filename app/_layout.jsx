import '../global.css';

import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { AuthContext } from '../contexts/UserContext';
import AuthenticationProvider from '../contexts/UserContext';
import { useContext } from 'react';
import { useRouter } from 'expo-router';
import { enableAndroidFontFix } from '../AndroidFontFix';


enableAndroidFontFix();

export default function Layout() {
  return(
    <AuthenticationProvider>
      <StatusBar hidden />
      <RootNavigation />
    </AuthenticationProvider>
  )
}



function RootNavigation(){
    const {user, loading} = useContext(AuthContext);


    return(
      <Stack>
        <Stack.Protected guard={!user}>
          <Stack.Screen name="(auth)/Index" options={{headerShown: false}} />
          <Stack.Screen name="(auth)/Verify" options={{headerShown: false}} />
        </Stack.Protected>
        <Stack.Protected guard={user}>
          <Stack.Screen name="(tabs)" options={{headerShown: false}} />
          <Stack.Screen name="movies/[id]" options={{headerShown: false}} />
        </Stack.Protected>
      </Stack>
    )
}