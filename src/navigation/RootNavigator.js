import React, { useContext, useEffect, useState } from 'react'
import { AuthenticatedUserContext } from '../providers/AuthenticatedUserProvider'
import { LoadingIndicator } from '../components';
import { NavigationContainer } from '@react-navigation/native';
import { getAuth, onAuthStateChanged } from "firebase/auth";
import AppStack from './AppStack';
import AuthStack from './AuthStack';

export default function RootNavigator() {
  const {user, setUser} = useContext(AuthenticatedUserContext);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const auth = getAuth();
    const unsubscribeAuthStateChanged = onAuthStateChanged(
      auth, authenticatedUser => {
        authenticatedUser ? setUser(authenticatedUser) : setUser(null);
        setIsLoading(false);
      }
    );
    return unsubscribeAuthStateChanged;
  }, [user]);

  if (isLoading) {
    return <LoadingIndicator />
  }
console.log('123', user);
  return (
    <NavigationContainer>
      {user ? <AppStack /> : <AuthStack />}
    </NavigationContainer>
  )
}