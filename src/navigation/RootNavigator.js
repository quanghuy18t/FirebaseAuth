import React, { useContext, useEffect, useState } from 'react'
import { AuthenticatedUserContext } from '../providers/AuthenticatedUserProvider'
import { LoadingIndicator } from '../components';
import { NavigationContainer } from '@react-navigation/native';
import auth from '@react-native-firebase/auth';
import AppStack from './AppStack';
import AuthStack from './AuthStack';

export default function RootNavigator() {
  const {user, setUser} = useContext(AuthenticatedUserContext);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const unsubscribeAuthStateChanged = auth().onAuthStateChanged(
      authenticatedUser => {
        authenticatedUser ? setUser(authenticatedUser) : setUser(null);
        setIsLoading(false);
      }
    );
    
    return unsubscribeAuthStateChanged;
  }, [user]);

  if (isLoading) {
    return <LoadingIndicator />
  }
  return (
    <NavigationContainer>
      {user ? <AppStack /> : <AuthStack />}
    </NavigationContainer>
  )
}