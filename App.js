import { SafeAreaProvider } from 'react-native-safe-area-context';
import AuthenticatedUserProvider from './src/providers/AuthenticatedUserProvider';
import RootNavigator from './src/navigation/RootNavigator';

export default function App() {
  return (
    <AuthenticatedUserProvider>
      <SafeAreaProvider>
        <RootNavigator  />
      </SafeAreaProvider>
    </AuthenticatedUserProvider>
  );
}