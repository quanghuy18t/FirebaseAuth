import 'react-native-gesture-handler';
import AuthenticatedUserProvider from './src/providers/AuthenticatedUserProvider';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import RootNavigator from './src/navigation/RootNavigator';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { Settings } from 'react-native-fbsdk-next';
import { useEffect } from 'react';

export default function App() {
  GoogleSignin.configure({
    webClientId: '942294252135-bv9vm64h5r1esc3et52g8i92cmj0sfrn.apps.googleusercontent.com'
  })
  useEffect(() => {
    Settings.initializeSDK();
  }, []);

  return (
    <AuthenticatedUserProvider>
      <SafeAreaProvider>
        <RootNavigator />
      </SafeAreaProvider>
    </AuthenticatedUserProvider>
  );
}