import { Constants } from "expo";
import React, { Component } from "react";
import { StyleSheet, Text, View } from "react-native";
import * as Permissions from "expo-permissions";
import * as ImagePicker from "expo-image-picker";
import getPermission from "../utils/getPermission";
import {Button} from 'react-native-elements'
import {UploadService} from '../api/get'
const options = {
  allowsEditing: true
};

export default class PickImageScreen extends Component {
  state = {};

  _selectPhoto = async () => {
    const status = await getPermission(Permissions.CAMERA_ROLL);
    if (status) {
      const result = await ImagePicker.launchImageLibraryAsync(options);
      if (!result.cancelled) {
        // this.props.navigation.navigate("NewPost", { image: result.uri });

        this.props.navigation.navigate('Profile', {message: "Success. Uploading image"});

        const u = new UploadService
        u.uploadProfilePhoto({image: result.uri})        
      }
    }
  };

  _takePhoto = async () => {
    const status = await getPermission(Permissions.CAMERA);
    if (status) {
      const result = await ImagePicker.launchCameraAsync(options);
      if (!result.cancelled) {
        // this.props.navigation.navigate("NewPost", { image: result.uri });

        this.props.navigation.navigate('Profile', {message: "Success. Uploading image"});

        const u = new UploadService
        u.uploadProfilePhoto({image: result.uri})
        // u.post({ text: text.trim(), image });        
      }
    }
  };

  render() {
    return (
      <View style={styles.container}>
        <Button
          buttonStyle={{borderRadius: 10,  marginLeft: 15, marginRight: 15, marginBottom: 10,}}
          title='Select Photo' 
          onPress={this._selectPhoto}
          />

        <Button
          buttonStyle={{borderRadius: 10, marginLeft: 15, marginRight: 15, marginBottom: 0,}}
          title='Take Photo' 
          onPress={this._takePhoto}
          />        
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  text: {
    padding: 24,
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center"
  }
});
