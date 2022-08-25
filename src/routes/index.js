/** @format */

import App from './Appflow';
import AuthApp from './Authflow';
import {EventRegister} from 'react-native-event-listeners';
import {NavigationContainer} from '@react-navigation/native';
import React, {useState, useEffect} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import themeContext from '../assets/config/themeContext';
import theme from '../assets/config/theme';
import {Provider} from 'react-redux';
import {Store} from '../redux/store';
const AppStack = createStackNavigator();
const AppNavigation = () => {
  // const [mode,setMode] = useState(false)
  // useEffect(()=>{
  //   let eventListener = EventRegister.addEventListener("changeTheme",(data)=>
  //   {
  //   setMode(data)
  // console.log(data)});
  //   return()=>{
  //     EventRegister.removeAllListeners(eventListener)
  //   }
  // })
  return (
    <NavigationContainer>
      <AppStack.Navigator screenOptions={{headerShown: false}}>
        <AppStack.Screen name={'Auth'} component={AuthApp} />
        <AppStack.Screen name={'App'} component={App} />
      </AppStack.Navigator>
    </NavigationContainer>
    // <Provider store={Store}>
    // <themeContext.Provider
    // value={mode === true ? theme.dark : theme.light}>

    // </themeContext.Provider>
    // </Provider>
  );
};

export default AppNavigation;
