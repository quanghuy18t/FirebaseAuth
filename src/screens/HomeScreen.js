import { Button, StyleSheet, View } from 'react-native'
import React from 'react'
import auth from '@react-native-firebase/auth';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { AccessToken, LoginManager } from 'react-native-fbsdk-next';

export default function HomeScreen() {
  const handleLogout = async () => {
    const user = auth().currentUser;

    if (user) {
      const provider = user.providerData;
      const isGoogle = provider.some(provider => provider.providerId === 'google.com');
      const isFacebook = await AccessToken.getCurrentAccessToken();

      if (isGoogle) {
        console.log('google')
        await GoogleSignin.signOut();
      }
      else if (isFacebook) {
        console.log('facebook');
        LoginManager.logOut();
      }

      auth().signOut().catch(error => console.log('Error logging out: ', error));
    }
  }

  return (
    <View style={styles.container}>
      <Button title={'Sign Out'} onPress={handleLogout} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 45
  }
})