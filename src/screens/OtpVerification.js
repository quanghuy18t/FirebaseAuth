import { StatusBar, StyleSheet, Text, View, TouchableOpacity, LogBox } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Colors, Images } from '../config'
import { Button, Logo } from '../components'
import { OtpInput } from 'react-native-otp-entry'
import { useRoute } from '@react-navigation/native'

export default function OtpVerification({ navigation }) {
  const route = useRoute();
  const { confirm } = route.params;
  const [code, setCode] = useState();

  LogBox.ignoreLogs([
    'Non-serializable values were found in the navigation state',
  ])

  const confirmCode = async () => {
    try {
      await confirm.confirm(code);
    }
    catch (error) {
      console.log(error);
    }
  }

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: Colors.white, paddingTop: 45}}>
      <View>
        <StatusBar hidden />
        <View style={{alignItems: 'center'}}>
          <Logo uri={Images.logo} />
          <Text style={{fontSize: 20, fontWeight: 'bold', paddingTop: 20}}>Enter Verification Code</Text>
          <Text style={{paddingTop: 20}}>We are automatically detecting SMS</Text>
          <Text>Send to your mobile phone number</Text>
        </View>
        <View style={{marginVertical: 20, width: '90%', alignItems: 'center', marginHorizontal: 20}}>
          <OtpInput 
            numberOfDigits={6}
            onTextChange={(text) => setCode(text)}
            focusColor={Colors.orange}
            focusStickBlinkingDuration={400}
            textInputProps={{accessibilityLabel: "One-Time Password"}}
            onFilled={(text) => console.log(text)}
            theme={{
              pinCodeContainerStyle: {
                backgroundColor: Colors.white,
                width: 58,
                height: 58,
                borderRadius: 12
              }
            }}
          />
        </View>
        <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginBottom: 30}}>
          <Text>Don't receive the code ?</Text>
          <TouchableOpacity>
            <Text style={{color: Colors.red}}>Resend Code</Text>
          </TouchableOpacity>
        </View>
        <Button
          style={styles.button}
          onPress={confirmCode}
        >
          <Text style={{fontSize: 20, color: Colors.white}} >OKAY</Text>
        </Button>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  button: {
    width: '70%',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 8,
    backgroundColor: Colors.orange,
    padding: 10,
    borderRadius: 20,
    alignSelf: 'center',
  },
})