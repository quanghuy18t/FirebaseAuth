import { StyleSheet, Text } from 'react-native'
import React, { useState } from 'react'
import { useTogglePasswordVisibility } from '../hooks/useTogglePasswordVisibility';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Button, FormErrorMessage, Logo, TextInput, View } from '../components';
import { Colors, Images } from '../config';
import { Formik } from 'formik';
import { loginValidationSchema } from '../utils';

export default function LoginScreen({ navigation }) {
  const [errorState, setErrorState] = useState('');
  const {
    passwordVisibility, 
    handlePasswordVisibility, 
    rightIcon,
  } = useTogglePasswordVisibility();

  const handleLogin = (values) => {
    const { email, password } = values;
    const auth = getAuth();
    signInWithEmailAndPassword(email, password)
    .then(
      () => navigation.navigate('Login')
    )
    .catch(error => {
      setErrorState(error.message)
    });
  };

  return (
    <View isSafe style={styles.container}>
      <KeyboardAwareScrollView enableOnAndroid={true}>
        <View style={styles.logoContainer}>
          <Logo uri={Images.logo} />
          <Text style={styles.screenTitle}>Welcome Back!</Text>
        </View>
        <Formik
          initialValues={{
            email: '',
            password: ''
          }}
          validationSchema={loginValidationSchema}
          onSubmit={values => handleLogin(values)}
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
                name='email'
                leftIconName={'email'}
                placeholder='Enter Email'
                autoCapitalize='none'
                keyboardType='email-address'
                textContentType='emailAddress'
                autoFocus={true}
                value={values.email}
                onChangeText={handleChange('email')}
                onBlur={handleBlur('email')}
              />
              <FormErrorMessage 
                error={errors.email}
                visible={touched.email}
              />
              <TextInput
                name='password'
                leftIconName={'key-variant'}
                placeholder='Enter password'
                autoCapitalize='none'
                autoCorrect={false}
                secureTextEntry={passwordVisibility}
                textContentType='password'
                rightIcon={rightIcon}
                handlePasswordVisibility={handlePasswordVisibility}
                value={values.password}
                onChangeText={handleChange('password')}
                onBlur={handleBlur('password')}
              />
              <FormErrorMessage 
                error={errors.password}
                visible={touched.password}
              />
              {
                errorState !== '' ? (
                  <FormErrorMessage error={errorState} visible={true} />
                ) : null
              }
              <Button style={styles.button} onPress={handleSubmit}>
                <Text style={styles.buttonText}>Login</Text>
              </Button>
            </>
          )}
        </Formik>
        <Button 
          style={styles.borderlessButtonContainer}
          borderless
          title={'Create a new account?'}
          onPress={() => {}}
        />
        <Button 
          style={styles.borderlessButtonContainer}
          borderless
          title={'Forgot Password'}
          onPress={() => navigation.navigate('Home')}
        />
      </KeyboardAwareScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
    paddingHorizontal: 12,
  },
  logoContainer: {
    alignItems: 'center',
  },
  screenTitle: {
    fontSize: 32,
    fontWeight: '700',
    color: Colors.black,
    paddingTop: 20,
  },
  footer: {
    backgroundColor: Colors.white,
    paddingHorizontal: 12,
    paddingBottom: 48,
    alignItems: 'center',
  },
  footerText: {
    fontSize: 14,
    fontWeight: '700',
    color: Colors.orange
  },
  button: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 8,
    backgroundColor: Colors.orange,
    padding: 10,
    borderRadius: 8
  },
  buttonText: {
    fontSize: 20,
    color: Colors.white,
    fontWeight: '700'
  },
  borderlessButtonContainer: {
    marginTop: 16,
    alignItems: 'center',
    justifyContent: 'center'
  }
});