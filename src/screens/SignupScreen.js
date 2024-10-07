import { StyleSheet, Text } from 'react-native'
import React, { useState } from 'react'
import { View, TextInput, Logo, Button, FormErrorMessage } from '../components'
import { useTogglePasswordVisibility } from '../hooks/useTogglePasswordVisibility'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Colors, Images } from '../config';
import { Formik } from 'formik'
import { signupValidationSchema } from '../utils';
import auth from '@react-native-firebase/auth';
import { Toast } from 'toastify-react-native';
import { BarIndicator } from 'react-native-indicators';
import { useNavigation } from '@react-navigation/native';

export default function SignupScreen() {
  const navigation = useNavigation();
  const [errorState, setErrorState] = useState('');
  const [loading, setLoading] = useState('');

  const {
    passwordVisibility,
    handlePasswordVisibility,
    rightIcon,
    handleConfirmPasswordVisibility,
    confirmPasswordVisibility,
    confirmPasswordIcon
  } = useTogglePasswordVisibility();

  const handleSignup = async (values) => {
    try {
      setLoading(true);

      const { email, password } = values;
      const userCredential = await auth().createUserWithEmailAndPassword(email, password);

      const user = userCredential.user;

      await user.sendEmailVerification();

      Toast.success('Verify Email to Login', 'top');
    } catch (error) {
      Toast.error('Signup Failed', 'top');
      setErrorState(error.message);
    }
  };

  return (
    <View style={styles.container}>
      <KeyboardAwareScrollView enableOnAndroid={true}>
        <View style={styles.logoContainer}>
          <Logo uri={Images.logo} />
          <Text style={styles.screenTitle}>Create a new account!</Text>
        </View>
        <Formik
          initialValues={{
            email: '',
            password: '',
            confirmPassword: '',
          }}
          validationSchema={signupValidationSchema}
          onSubmit={values => handleSignup(values)}
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
                placeholder='Enter email'
                autoCapitalize='none'
                keyboardType='email-address'
                textContentType='emailAddress'
                value={values.email}
                onChangeText={handleChange('email')}
                onBlur={handleBlur('email')}
              />
              <FormErrorMessage error={errors.email} visible={touched.email} />
              <TextInput 
                name='password'
                leftIconName={'key-variant'}
                placeholder='Enter password'
                autoCapitalize='none'
                autoCorrect={false}
                secureTextEntry={passwordVisibility}
                textContentType='newPassword'
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
              <TextInput 
                name='confirmedPassword'
                leftIconName={'key-variant'}
                placeholder='Enter password'
                autoCapitalize='none'
                autoCorrect={false}
                secureTextEntry={confirmPasswordVisibility}
                textContentType='password'
                rightIcon={confirmPasswordIcon}
                handlePasswordVisibility={handleConfirmPasswordVisibility}
                value={values.confirmPassword}
                onChangeText={handleChange('confirmPassword')}
                onBlur={handleBlur('confirmPassword')}
              />
              <FormErrorMessage 
                error={errors.confirmPassword}
                visible={touched.confirmPassword}
              />
              {
                errorState !== '' ? (
                  <FormErrorMessage error={errorState} visible={true} />
                ) : null
              }
              <Button style={styles.button} onPress={handleSubmit}>
                {loading ? <BarIndicator color='white' size={20} count={5} /> : <Text style={styles.buttonText}>Signup</Text>}
              </Button>
            </>
          )}
        </Formik>
        <Button 
          style={styles.borderlessButtonContainer}
          borderless
          title={'Already have an account?'}
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