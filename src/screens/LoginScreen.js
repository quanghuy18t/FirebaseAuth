import { Image, StyleSheet, Text } from 'react-native'
import React, { useState } from 'react'
import { useTogglePasswordVisibility } from '../hooks/useTogglePasswordVisibility';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Button, FormErrorMessage, Logo, TextInput, View } from '../components';
import { Colors, Images } from '../config';
import { Formik } from 'formik';
import { loginValidationSchema } from '../utils';
import auth from '@react-native-firebase/auth';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { AccessToken, LoginManager } from 'react-native-fbsdk-next';
import { Toast } from 'toastify-react-native';
import { BarIndicator } from 'react-native-indicators';

export default function LoginScreen({ navigation }) {
  const [errorState, setErrorState] = useState('');
  const [loading, setLoading] = useState(false);

  const {
    passwordVisibility, 
    handlePasswordVisibility, 
    rightIcon,
  } = useTogglePasswordVisibility();

  const handleGoogleLogin = async () => {
    try {
      await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });

      const { data } = await GoogleSignin.signIn();
      console.log(data);
  
      const googleCredential = auth.GoogleAuthProvider.credential(data.idToken);
  
      await auth().signInWithCredential(googleCredential);

      Toast.success('Google Login successful', 'top');
    } catch (error) {
      Toast.error('Login Google Failed', 'top');
      setErrorState(error.message);
    }
  }

  const handleFacebookLogin = async () => {
    try {
      await LoginManager.logInWithPermissions(['public_profile', 'email']);

      const data = await AccessToken.getCurrentAccessToken();
      if (!data) {
        throw 'Something went wrong obtaining access token';
      }
  
      const facebookCredential = auth.FacebookAuthProvider.credential(data.accessToken);
      await auth().signInWithCredential(facebookCredential);

      Toast.success('Facebook Login successful', 'top');
    } catch (error) {
      Toast.error('Login Facebook Failed', 'top');
      setErrorState(error.message);
    }
  }

  const handleLogin = async (values) => {
    try {
      setLoading(true);

      const { email, password } = values;
      await auth().signInWithEmailAndPassword(email, password);
      navigation.navigate('Login')
      Toast.success('Login successful', 'top');
    } catch (error) {
      Toast.error('Login Failed', 'top');
      setErrorState(error.message);
    }
    
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
                {loading ? <BarIndicator color='white' size={20} count={5} /> : <Text style={styles.buttonText}>Login</Text>}
              </Button>
            </>
          )}
        </Formik>
        <Button 
          style={styles.borderlessButtonContainer}
          borderless
          title={'Create a new account?'}
          onPress={() => navigation.navigate('Signup')}
        />
        <Button 
          style={styles.borderlessButtonContainer}
          borderless
          title={'Forgot Password'}
          onPress={() => navigation.navigate('ForgotPassword')}
        />
        <View style={styles.signupContainer}>
          <View style={styles.signupWrapper} />
          <Text style={{fontSize: 14}}>Or Login with</Text>
          <View style={styles.signupWrapper} />
        </View>
        <View style={{flexDirection: 'row', justifyContent: 'center'}}>
          <TouchableOpacity
            style={styles.buttonStyle}
            onPress={handleGoogleLogin}
          >
            <Image 
              source={require('../../assets/google.png')}
              style={{
                height: 36,
                width: 36,
                marginRight: 8,
                resizeMode: 'contain'
              }}
            />
            <Text>Google</Text>
          </TouchableOpacity>
          <View style={{width: 60}}  />
          <TouchableOpacity
            style={styles.buttonStyle}
            onPress={handleFacebookLogin}
          >
            <Image 
              source={require('../../assets/facebook.png')}
              style={{
                height: 36,
                width: 36,
                marginRight: 8,
                resizeMode: 'contain'
              }}
            />
            <Text>Facebook</Text>
          </TouchableOpacity>
        </View>
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
  },
  signupContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 20,
  },
  signupWrapper: {
    flex: 1,
    height: 1,
    backgroundColor: Colors.mediumGray,
    marginHorizontal: 10
  },
  buttonStyle: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    height: 52,
    borderWidth: 1,
    borderColor: 'gray',
    marginRight: 4,
    borderRadius: 10
  },
});