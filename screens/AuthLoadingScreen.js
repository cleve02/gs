import React, { memo } from "react";
import { ActivityIndicator } from "react-native";
import firebase from "firebase/app";
import "firebase/auth";
import Background from "../components/Background";
import { theme } from "../core/theme";
import { FIREBASE_CONFIG } from "../core/config";
import {useNavigation} from '@react-navigation/native'

// Initialize Firebase
if (!firebase.apps.length){
firebase.initializeApp(FIREBASE_CONFIG);
}

const AuthLoadingScreen = () => {


    const navigation = useNavigation()
    firebase.auth().onAuthStateChanged(user => {
        if (user) {
        // User is logged in
        navigation.navigate("MainDrawer");
        } else {
        // User is not logged in
        navigation.navigate('AuthScreen');

        }
    });

    return (
        <Background>
        <ActivityIndicator size="large" color={theme.colors.primary} />
        </Background>
    );
};

export default memo(AuthLoadingScreen);
