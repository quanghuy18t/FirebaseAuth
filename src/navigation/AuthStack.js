import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import LoginScreen from '../screens/LoginScreen';
import SignupScreen from '../screens/SignupScreen';
import ForgotPasswordScreen from '../screens/ForgotPasswordScreen';
import OtpVerification from '../screens/OtpVerification';
import PhoneLoginScreen from '../screens/PhoneLoginScreen';

const Stack = createStackNavigator();

export default function AuthStack() {
  return (
    <Stack.Navigator
      initialRouteName='Phone'
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name='Phone' component={PhoneLoginScreen} />
      <Stack.Screen name='Login' component={LoginScreen} />
      <Stack.Screen name='Signup' component={SignupScreen} />
      <Stack.Screen name='ForgotPassword' component={ForgotPasswordScreen} />
      <Stack.Screen name='Otp' component={OtpVerification} />
    </Stack.Navigator>
  )
}