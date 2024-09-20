import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import HomeScreen from '../screens/HomeScreen';

const Stack = createStackNavigator();

export default function AppStack() {
  console.log('1111111');
  return (
    <Stack.Navigator>
      <Stack.Screen name='Home' component={HomeScreen} />
    </Stack.Navigator>
  )
}