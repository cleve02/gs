import React, {useState,useEffect} from "react";
import { StyleSheet, View} from "react-native";
import * as Navigator from "./navigation/navigators";
import { useFonts } from '@use-expo/font';
import { AppLoading } from 'expo';
import Authloading from './screens/AuthLoadingScreen'
import AuthLoadingScreen from "./screens/AuthLoadingScreen";
import {useNavigation,useRoute,NavigationContainer} from '@react-navigation/native'
import { FIREBASE_CONFIG } from "./core/config";
import firebase from "firebase/app";
import "firebase/auth";
// import Dashboard from './screens/Dashboard'
import AuthScreen from './screens/AuthScreen'
import LoginScreen from './screens/LoginScreen'
import RegisterScreen from './screens/RegisterScreen'
import { createStackNavigator } from '@react-navigation/stack';


const Stack = createStackNavigator();
export default function App() {
  let [hasLoaded] = useFonts({
    'Google-Fonts': require('./assets/fonts/Righteous-Regular.ttf'),
  });

  // const [user, setUser] = useState(null)
  // useEffect(()=>{
  //   init()
  // },[])
  
  // const init = async ()=>{
  //   firebase.initializeApp(FIREBASE_CONFIG);
  //   firebase.auth().onAuthStateChanged(user => {
  //     if (user) {
  //     // User is logged in
  //     setUser(user)
  //     } else {
  //     // User is not logged in
  
  //     }
  //   });    
  // }



  if (!hasLoaded) {
    return <AppLoading />;
  }
  else{
    
    return (
    <View style={styles.container}>
      <NavigationContainer >
      <Stack.Navigator screenOptions={{headerShown:false}}>
        <Stack.Screen name="AuthLoadingScreen" component={AuthLoadingScreen} />
        <Stack.Screen name="MainDrawer" component={Navigator.MainDrawer} />
        {/* <Stack.Screen name="Dashboard" component={Dashboard} /> */}
        <Stack.Screen name="AuthScreen" component={AuthScreen} />
        <Stack.Screen name="LoginScreen" component={LoginScreen} />
        <Stack.Screen name="RegisterScreen" component={RegisterScreen} />
        </Stack.Navigator>
    </NavigationContainer>
    </View>
  );
}}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});


