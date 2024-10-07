import { StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { Button, FormErrorMessage, Logo, TextInput } from '../components'
import { Colors, Images } from '../config'
import { Formik } from 'formik'
import { loginPhoneValidationSchema } from '../utils'
import auth from '@react-native-firebase/auth'
import { useNavigation } from '@react-navigation/native'
import { Toast } from 'toastify-react-native'
import { BarIndicator } from 'react-native-indicators'

export default function PhoneLoginScreen() {
  const navigation = useNavigation();
  const [errorState, setErrorState] = useState('');
  const [loading, setLoading] = useState(false);

  const handlePhoneLogin = async (values) => {
    setLoading(true);

    await auth().signInWithPhoneNumber('+84' + values.phone)
    .then((confirm) => {
      navigation.navigate('Otp', {confirm: confirm});
    })
    .catch(error => {
      Toast.error("Login Phone Failed", "top");
      setErrorState(error.message);
    })
  }

  return (
    <View style={styles.container}>
      <KeyboardAwareScrollView>
        <View style={styles.logoContainer}>
          <Logo uri={Images.logo} />
          <Text style={styles.screenTitle}>Login With Phone Number</Text>
        </View>
        <Formik
          initialValues={{
            phone: ''
          }}
          validationSchema={loginPhoneValidationSchema}
          onSubmit={(values) => handlePhoneLogin(values)}
        >
          {({
            values,
            touched,
            errors,
            handleChange,
            handleSubmit,
            handleBlur
          }) => (
            <>
              <TextInput 
                name='phone'
                leftIconName={'phone'}
                placeholder='Enter phone number'
                autoCorrect={false}
                value={values.phone}
                onChangeText={handleChange('phone')}
                onBlur={handleBlur('phone')}
                keyboardType='numeric'
              />
              <FormErrorMessage error={errors.phone} visible={touched.phone} />
              {
                errorState !== '' ? (
                  <FormErrorMessage error={errorState} visible={true} />
                ) : null
              }
              <Button style={styles.button} onPress={handleSubmit}>
                {loading ? <BarIndicator color='white' size={20} count={5} /> : <Text style={styles.buttonText}>Login</Text>}
              </Button>
            </>
          )}
        </Formik>
        <Button 
          style={styles.borderlessButtonContainer}
          borderless
          title={'Login With Email'}
          onPress={() => navigation.navigate('Login')}
        />
      </KeyboardAwareScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 45,
    flex: 1,
    backgroundColor: Colors.white,
    paddingHorizontal: 12,
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 100,
  },
  screenTitle: {
    fontSize: 32,
    fontWeight: '700',
    color: Colors.black,
    paddingTop: 20,
  },
  button: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 8,
    backgroundColor: Colors.orange,
    padding: 10,
    borderRadius: 8,
  },
  buttonText: {
    fontSize: 20,
    color: Colors.white,
    fontWeight: '700',
  },
  borderlessButtonContainer: {
    marginTop: 16,
    alignItems: 'center',
    justifyContent: 'center'
  }
})