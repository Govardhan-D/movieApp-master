import '../global.css';

import { Stack } from 'expo-router';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

export default function Layout() {
  return(
  
  <Stack>
    <Stack.Screen name="(tabs)" options={{headerShown: false}} />
  </Stack>
  );
}
