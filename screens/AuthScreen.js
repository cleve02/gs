import React, { memo,useEffect } from "react";
import Background from "../components/Background";
import Logo from "../components/Logo";
import Header from "../components/Header";
import Button from "../components/Button";
import Paragraph from "../components/Paragraph";
import { CommonActions } from '@react-navigation/native';

const HomeScreen = ({ navigation }) => 
  // useEffect(() => {navigation.addListener('beforeRemove', (e) => e.preventDefault())},[]);

  

(
  
  <Background>
    <Logo />
    <Header>Stroke™</Header>

    <Paragraph>
      Login or Sign Up to enter the golfer's hub
    </Paragraph>
    <Button mode="contained" onPress={() => navigation.navigate("LoginScreen")}>
      Login
    </Button>
    <Button
      mode="outlined"
      onPress={() => navigation.navigate("RegisterScreen")}
    >
      Sign Up
    </Button>
  </Background>
);

export default memo(HomeScreen);
