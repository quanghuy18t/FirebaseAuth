import { Button, StyleSheet, View } from 'react-native'
import React from 'react'
import { getAuth, signOut } from "firebase/auth";

export default function HomeScreen() {
  const handleLogout = () => {
    const auth = getAuth();
    signOut.catch(error => console.log('Error logging out: ', error));
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