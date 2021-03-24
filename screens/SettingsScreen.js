import React, { memo, useState, useEffect,Component } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Dimensions, Button as MainButton, TouchableHighlight, RefreshControl, ScrollView} from "react-native";
import Background from "../components/Background";
import Logo from "../components/Logo";
import Header from "../components/Header";
import Button from "../components/Button";
// import TextInput from "../components/TextInput";
import BackButton from "../components/BackButton";
import { theme } from "../core/theme";
import {
  emailValidator,
  passwordValidator,
  nameValidator,
  usernameValidator
} from "../core/utils";
import { SettingsService } from "../api/get";
import Toast from "../components/Toast";

import { TextInput as Input, Switch } from "react-native-paper";
import { Ionicons,AntDesign,Octicons,Entypo , MaterialCommunityIcons,MaterialIcons,FontAwesome5} from "@expo/vector-icons";
import firebase from 'firebase'

const win = Dimensions.get('window');

// const RegisterScreen = ({ navigation }) => {

class RegisterScreen extends Component {

  state = {
    loading: false,
    name: { value: "" , error: "" },
    username: { value: "" , error: "" },
    email: { value: "", error: "" },
    bio: { value: "", error: "" },
    password: { value: "", error: "" },
    ghin: { value: "", error: "" },
    error: "",
    message: "",
    user: {},
    isPrivate: false
  };


  componentDidMount() { 
    this.makeRemoteRequest();
  }  

  // componentWillMount(){
  //   this.makeRemoteRequest();
  // }

  makeRemoteRequest = async () => {
    // If we are currently getting posts, then bail out..
    if (this.state.loading) {
      return;
    }      

    this.setState({ loading: true });

    // let uid = firebase.auth().currentUser.uid
    let firebase_user = firebase.auth().currentUser
    let user_ref = await firebase.firestore().collection("users").doc(firebase_user.uid).get()
    
    let user = { 
      id: user_ref.id, 
      ...user_ref.data() 
    }
    this.setState({user:user})
    this.setState({name: { value: user.name , error: "" }})
    this.setState({bio: { value: user.bio , error: "" }})
    this.setState({username: { value: user.username , error: "" }})
    this.setState({ghin: { value: user.ghin , error: "" }})
    this.setState({email: { value: firebase_user.email , error: "" }})
    this.setState({isPrivate: user.isPrivate || false})

    this.setState({ loading: false });
  };  
  

  onUpdatePressed = async () => {
    if (this.state.loading) return;

    const nameError = nameValidator(this.state.name.value);
    const emailError = emailValidator(this.state.email.value);
    const usernameError = usernameValidator(this.state.username.value);
    // const passwordError = passwordValidator(this.state.password.value);

    if (emailError || nameError || usernameError) {
      this.setState({name: {...this.state.name, error: nameError }});
      this.setState({email: {...this.state.email, error: emailError }});
      this.setState({username: {...this.state.username, error: usernameError }})
      // this.setState({password: { ...this.state.password, error: passwordError }});
      return;
    }

    this.setState({loading:true});

    const s = new SettingsService
    const response = await s.updateProfile({
      name: this.state.name.value,
      email: this.state.email.value,
      username: this.state.username.value || "",
      ghin: this.state.ghin.value || "",
      bio: this.state.bio.value || "",
      isPrivate: this.state.isPrivate
      // password: this.state.password.value
    });

    if (response.error) {
      // setError(response.error);
      this.setState({error: response.error})
    }else{
      this.setState({message: "Successfully updated profile"})
    }


    this.setState({loading:false});
   
  };  
  render(){
  // useEffect(()=>{
  //   makeRemoteRequest()

  // },[])


  // const onToggleSwitch = () => this.setState({isSwitchOn:!isSwitchOn}); 

  return (
    <ScrollView refreshControl={
      <RefreshControl
        refreshing={this.state.loading}
        onRefresh={()=>{this.makeRemoteRequest()}}
    />}>
    <View style={styles.container}>
      <View style={{flexDirection:"row",alignSelf:"flex-start",alignItems: "center", paddingTop:10,paddingBottom:10,}}>
            <Text style={{marginLeft:12,color:"grey",flexDirection:"row",marginRight:200, fontSize:15}} >Private</Text>
            
            <Switch value={this.state.isPrivate} onValueChange={(value)=>{this.setState({isPrivate:value})}} />
      </View>        
      <TextInput
        label="Name"
        returnKeyType="next"
        value={this.state.name.value}
        onChangeText={text => this.setState({name: {value: text, error: "" }})}
        error={!!this.state.name.error}
        errorText={this.state.name.error}
        
      />

      <TextInput
        label="Email"
        returnKeyType="next"
        value={this.state.email.value}
        onChangeText={text => this.setState({email: {value: text, error: "" }})}
        error={!!this.state.email.error}
        errorText={this.state.email.error}
        autoCapitalize="none"
        autoCompleteType="email"
        textContentType="emailAddress"
        keyboardType="email-address"
      />
      <TextInput
        label="Username"
        returnKeyType="next"
        autoCapitalize="none"
        value={this.state.username.value}
        onChangeText={text => this.setState({username: {value: text.toLowerCase(), error: "" }})}
        error={!!this.state.username.error}
        errorText={this.state.username.error}
        
      />      



     <TextInput
        label="Bio"
        returnKeyType="next"
        value={this.state.bio.value}
        onChangeText={text =>this.setState({bio: {value: text, error: "" }})}
        error={!!this.state.bio.error}
        errorText={this.state.bio.error}
        multiline={true}
  

      /> 
      <View style={{flexDirection:'row',maxWidth:340,paddingLeft:15,paddingRight:15}}>
      <TextInput
        label="GHIN"
        returnKeyType="next"
        value={this.state.ghin.value}
        onChangeText={text =>this.setState({ghin: {value: text, error: "" }})}
        error={!!this.state.ghin.error}
        errorText={this.state.ghin.error}

      />  
      <TouchableHighlight style={{alignItems:'center',justifyContent:'center', marginLeft:10}} onPress = {()=>{}} underlayColor = 'transparent'>
          <View style={{flexDirection:"row"}}>
            <Octicons name="link-external" size = {25} color = "grey" />
          </View>
      </TouchableHighlight> 
      </View>     
      {/* <MainButton title="VERIFY GHIN" onPress={()=>{}}/>        */}

      <Button
        loading={this.state.loading}
        mode="contained"
        onPress={()=>{this.onUpdatePressed()}}
        style={styles.button}
      >
        Save
      </Button>

      <Toast type="error" message={this.state.error} onDismiss={() => this.setState({error:""})} />
      <Toast type="message" message={this.state.message} onDismiss={() => this.setState({message:""})} />
    </View>
    </ScrollView>

  );
}};

const styles = StyleSheet.create({
  container: {
        flex: 1,
        padding: 20,
        width: "100%",
        maxWidth: 340,
        alignSelf: "center",
        alignItems: "center",
        // justifyContent: "center"
      },
 
  label: {
    color: theme.colors.secondary
  },
  button: {
    marginTop: 24
  },
  row: {
    flexDirection: "row",
    marginTop: 4
  },
  link: {
    fontWeight: "bold",
    color: theme.colors.primary
  }
});



const TextInput = ({ errorText, ...props }) => (
  <View style={tstyles.container}>
    <Input
      style={tstyles.input}
      selectionColor={theme.colors.primary}
      underlineColor="transparent"
      mode="flat"
      {...props}
    />
    {errorText ? <Text style={tstyles.error}>{errorText}</Text> : null}
  </View>
);

const tstyles = StyleSheet.create({
  container: {
    width: "100%",
    marginVertical: 8
  },
//   input: {
//     backgroundColor: theme.colors.surface
//   },
  error: {
    fontSize: 14,
    color: theme.colors.error,
    paddingHorizontal: 4,
    paddingTop: 4
  }
});

export default memo(RegisterScreen);
