import {
    DrawerContentScrollView,
    DrawerItemList,
    DrawerItem,
  } from "@react-navigation/drawer";
import {View, Image,Linking } from "react-native";
import React from "react";
import { Octicons } from "@expo/vector-icons";
import {logoutUser} from '../../api/auth-api'

function CustomDrawerContent(props) {
    return (
      
      <DrawerContentScrollView {...props} >
        <View
          style={{ height: 150, alignItems: "center", justifyContent: "center" }}>
          <Image
            source={require("../../assets/splash.png")}
            style={{ height: 120, width: 120 }}
          />
        </View>
  
        <DrawerItemList {...props} />
        <DrawerItem
  
        // style={{
        //   position:"absolute",
        //   bottom:0
  
        // }}
        label="Logout"
        onPress={() => logoutUser()}
        icon={() => <Octicons name="link-external" size={20} />}
        // style={{position:"absolute"}}
        labelStyle={{fontFamily:"Google-Fonts",}}
        />  
      </DrawerContentScrollView>    
    );
  }

export default CustomDrawerContent