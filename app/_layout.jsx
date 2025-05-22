import '../global.css';

import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

export default function Layout() {
  return(
  <>
  <StatusBar hidden={true} />
  <Stack>
    
    <Stack.Screen name="(tabs)" options={{headerShown: false}} />
    <Stack.Screen name="movies/[id]" options={{headerShown: false}} />
  </Stack>
  </>
  
  );
}
