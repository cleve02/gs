import React, { useEffect, useState }  from 'react';
import { StyleSheet, View, Button,Text, TouchableOpacity,Image,Linking } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import {createDrawerNavigator} from "@react-navigation/drawer";
import CustomDrawerContent from '../components/drawer/CustomDrawerContent'
import SettingsScreen from '../screens/SettingsScreen'
import ProfileScreen from '../screens/ProfileScreen';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs'
import {useNavigation,useRoute,NavigationContainer} from '@react-navigation/native'
import { Ionicons,AntDesign,Octicons,Entypo , MaterialCommunityIcons,MaterialIcons} from "@expo/vector-icons";
import {AboutScreen} from '../screens/AboutScreen'
import ActivityScreen from '../screens/RET/ActivityScreen'
import PickImageScreen from '../screens/PickImageScreen'
import PickProfilePhotoScreen from '../screens/PickProfilePhotoScreen'
import FeedScreen from '../screens/FeedScreen'
import ExploreScreen from '../screens/ExploreScreen';
import PostDetailsScreen from '../screens/PostDetailsScreen'
import UploadImageScreen from '../screens/UploadImageScreen'
import BetScreen from "../screens/BetScreen";
import LiveScreen from "../screens/LiveScreen"
import ProsScreen from "../screens/ProsScreen";
import UserScreen from '../screens/UserScreen'
import NotificationsScreen from '../screens/NotificationsScreen'
// import Dashboard from '../screens/Dashboard'
import AuthScreen from '../screens/AuthScreen'
import LoginScreen from '../screens/LoginScreen'
import RegisterScreen from '../screens/RegisterScreen'
import { logoutUser } from "../api/auth-api";
import LiveScreenDemo from '../screens/LiveScreenDemo'

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();

const INITIAL_ROUTE_NAME = "Home"

export function MainDrawer() {
  return (
      <Drawer.Navigator
        drawerType="slide"
        hideStatusBar={false}
        drawerStyle={{
          borderTopColor: "#fff",
          borderColor: "red",
        }}
        drawerContent={(props) => <CustomDrawerContent {...props} />}
        drawerContentOptions={{
          activeTintColor: "#66BB6A",
          labelStyle: {fontFamily:"Google-Fonts"},
        }}
        // drawerPosition="right"
      >
        <Drawer.Screen
          name="Home1"
          component={HomeScreens}
          options={{
            drawerIcon: () => <Ionicons name="md-home" size={20} />,
            title:"Home",
          }}
        />
        <Drawer.Screen
          name="Settings"
          component={SettingsStack}
          options={{
            drawerIcon: () => <Ionicons name="ios-settings" size={20} />,
          }}
        />
        <Drawer.Screen
          name="Betting"
          component={BetStack}
          options={{
            drawerIcon: () => <MaterialCommunityIcons name="cards-playing-outline" size={15} />,
          }}
        />     
        <Drawer.Screen
          name="Notifications"
          component={NotificationsStack}
          options={{
            drawerIcon: () => <Ionicons name="ios-notifications" size={20} />,
          }}
        />              
      </Drawer.Navigator>
  )
}


export function AuthStack() {
  return (
    <Stack.Navigator>
      {/* <Stack.Screen name="Dashboard" component={Dashboard} /> */}
      <Stack.Screen name="AuthScreen" component={AuthScreen} />
      <Stack.Screen name="LoginScreen" component={LoginScreen} />
      <Stack.Screen name="RegisterScreen" component={RegisterScreen} />
    </Stack.Navigator>
  )
}



export function HomeScreens({navigation}) {
    return (
    <Stack.Navigator
      // screenOptions={{
      //   headerLeftContainerStyle: {paddingLeft:15},
      // headerLeft: ({onPress}) =>{ 
      //   return <TouchableOpacity style={{width:500}} onPress={()=>navigation.toggleDrawer()}><Ionicons name="ios-menu" size={35}/></TouchableOpacity>},
      // }}
      initialRouteName="Home">
      <Stack.Screen
        name="Home"
        component={HomeTabs}
        options={{
          headerTitle:"Home Title",
          headerLeftContainerStyle: {paddingLeft:15},
          //headerLeft: ({onPress}) =>{ return <TouchableOpacity style={{width:500}} onPress={()=>navigation.toggleDrawer()}><Ionicons name="ios-menu" size={35}/></TouchableOpacity> },
          headerTitleAlign:"center",
          headerTitleStyle: {
            fontFamily:"Google-Fonts"
          }
        }}
      />
      
      <Stack.Screen
        name="Post Details"
        component={PostDetailsScreen}
        options={{ title: "Post Details " }}
      />
      <Stack.Screen
        name="NewPost"
        component={UploadImageScreen}
        options={{ title: "Add a description " }}
      />    
      <Stack.Screen
        name="Upload Profile Photo"
        component={PickProfilePhotoScreen}
        options={{ title: "Upload Profile Photo " }}
      />       
      <Stack.Screen
        name="Live Upload"
        component={LiveScreenDemo}
        options={{ title: "Upload Live Stream Link " }}
      />          
      <Stack.Screen
        name="User"
        component={UserScreen}
        options={{ title: "User" }}
      />        
      {/* <Stack.Screen name="Dashboard" component={Dashboard} /> */}
      <Stack.Screen name="AuthScreen" component={AuthScreen} />
      <Stack.Screen name="LoginScreen" component={LoginScreen} />
      <Stack.Screen name="RegisterScreen" component={RegisterScreen} />      
    </Stack.Navigator>
  )
}

export function BetStack() {
  const navigation = useNavigation()
  return (
    <Stack.Navigator screenOptions={{
      headerLeftContainerStyle: {paddingLeft:15},
      headerLeft: ()=> <TouchableOpacity style={{width:500}} onPress={()=>navigation.toggleDrawer()}><Ionicons name="ios-menu" size={28}/></TouchableOpacity>
    }}>
      <Stack.Screen name="Betting" component={BetScreen} options={{title:"Betting"}} />
    </Stack.Navigator>
  );
}

export function NotificationsStack() {
  const navigation = useNavigation()
  return (
    <Stack.Navigator screenOptions={{
      headerLeftContainerStyle: {paddingLeft:15},
      headerLeft: ()=> <TouchableOpacity style={{width:500}} onPress={()=>navigation.toggleDrawer()}><Ionicons name="ios-menu" size={28}/></TouchableOpacity>
    }}>
      <Stack.Screen name="Notifications" component={NotificationsScreen} options={{title:"Notifications"}} />
    </Stack.Navigator>
  );
}

export function SettingsStack() {
  const navigation = useNavigation()
  return (
    <Stack.Navigator screenOptions={{
      headerLeftContainerStyle: {paddingLeft:15},
      headerLeft: ()=> <TouchableOpacity style={{width:500}} onPress={()=>navigation.toggleDrawer()}><Ionicons name="ios-menu" size={28}/></TouchableOpacity>
    }}>
      <Stack.Screen name="Settings" component={SettingsScreen} options={{title:"Settings"}} />
    </Stack.Navigator>
  );
}


function HomeTabs({route,navigation}) {


  navigation.setOptions({ headerTitle: setHeader(route,"title"), headerLeft:setHeader(route,"left"), headerRight:setHeader(route,"right")}); //setHeader(route,"left")
  // navigation.reset({
  //   index: 0,
  //   routes: [{ name: 'Home' }],
  // });  
  return (
    <Tab.Navigator initialRouteName={INITIAL_ROUTE_NAME} 
     tabBarOptions={{
      activeTintColor:"green",
      inactiveTintColor:"grey",
      showLabel:true,
      labelStyle:{fontFamily:"Google-Fonts"},
      keyboardHidesTabBar:true,
      showIcon:true,
      labelPosition: 'below-icon',
      tabStyle:{elevation:10,shadowColor:"blue"},
      
    }}>
      <Tab.Screen name="Home" component={FeedScreen} options={{
         title: "Field",
         tabBarIcon:({focused})=> <AntDesign name="home" size={30} color={focused? "green": "grey"}/>
         }} />
      <Tab.Screen name="Pros" component={ProsScreen} options={{ 
        title: "Pros",
        tabBarIcon:({focused})=> <MaterialIcons name="golf-course" size={30} color={focused? "green": "grey"} />,
        
        }}  /> 
      <Tab.Screen name="Upload" component={PickImageScreen} options={{ 
        title: "Upload",
        tabBarIcon:({focused})=> <AntDesign name="upload" size={30} color={focused? "green": "grey"} />,
        
        }}  />  
      <Tab.Screen name="Live" component={LiveScreen} options={{ 
        title: "Live",
        tabBarIcon:({focused})=> <MaterialIcons name="live-tv" size={30} color={focused? "green": "grey"} />,
        
        }}  />   
      {/* <Tab.Screen name="Bet" component={BetScreen} options={{ 
        title: "Bet",
        tabBarIcon:({focused})=> <MaterialCommunityIcons name="cards-playing-outline" size={30} color={focused? "green": "grey"} />,
        
        }}  />                               */}
      <Tab.Screen name="Profile" component={ProfileScreen} options={{ 
        title: "Profile",
        tabBarIcon:({focused})=> <AntDesign name="user" size={30} color={focused? "green": "grey"} />,
        
        }}  />
    </Tab.Navigator>
  )

  function setHeader(route, element) {
    const routeName = route.state?.routes[route.state.index]?.name ?? INITIAL_ROUTE_NAME;
    const navigation = useNavigation()
  
    if (element=="title") {
  
      switch (routeName) {
        case 'Home':
          return 'Stroke';
        case 'Pros':
          return 'The Pros';    
        case 'Upload':
          return 'Upload'; 
        case 'Live':
          return 'Live';  
        case 'Bet':
          return 'Bet';                                   
        case 'Profile':
          return 'Profile';
      }
      
    } else if (element=="right"){
  
      switch (routeName) {
        // case 'Home':
        //   return ()=><TouchableOpacity style={{width:500}} onPress={()=>navigation.toggleDrawer()}><Entypo name="dots-two-horizontal" size={35}/></TouchableOpacity>;
        case 'Live':
          return ()=><View style={{marginRight:10}}><TouchableOpacity onPress={()=>{navigation.navigate("Live Upload")}}><AntDesign name="upload" size={23} /></TouchableOpacity></View>;
        // case 'Profile':
        //   return ()=><View style={{marginRight:10}}><TouchableOpacity onPress={()=>navigation.toggleDrawer()}><Entypo name="dots-two-horizontal" size={35}/></TouchableOpacity></View>;
      } 
  
      
    }
    else if  (element=="left"){

      switch (routeName) {
        case 'Profile':
          return ()=><View style={{marginRight:10,width:300}}><TouchableOpacity onPress={()=>navigation.toggleDrawer()}><Ionicons name="ios-menu" size={28}/></TouchableOpacity></View>;
        default :
          return null;
      }       
    }
      
  }  

}
    

