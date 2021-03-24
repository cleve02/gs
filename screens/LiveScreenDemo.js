import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
} from 'react-native';
import { TextInput, Button } from "react-native-paper";
import {UploadService} from '../api/get'
import {urlValidator} from '../core/utils'
import Toast from "../components/Toast";

export default class LikesScreen extends Component {

    state = {
        url: "",
        error: "",
        message: "",
        loading: false
    }

    
    onUpdatePressed = async ()=>{
      const u = new UploadService
      const { navigation } = this.props

      if (this.state.loading) return;

      const urlError = urlValidator(this.state.url)
  
      if (urlError) {
        this.setState({error: urlError});

        return;
      }
  
      this.setState({loading:true});   
      await u.uploadStreamLink(this.state.url)

      this.setState({loading: false})   

      navigation.navigate("Live", { message: "Uploading your link ..." })

        
        // this.setState({message: "Your url has been submitted for review", url: ""})
        
    }


  render() {
    return (
      <View style={styles.container}>
        <View style={styles.inputContainer}>
        <View style={styles.input}>
        <TextInput

        placeholder= "Input a valid stream url"
        label="Enter Url"
        returnKeyType="next"
        value={this.state.url}
        onChangeText={text => this.setState({url: text})}
        error={!!this.state.error}
        errorText={this.state.error}
        
      />
      <Button
        loading={this.state.loading}
        mode="contained"
        onPress={()=>{this.onUpdatePressed()}}
        style={styles.button}
      >
        Submit
      </Button>      
      </View>
      </View>
      
      <Toast type="error" message={this.state.error} onDismiss={() => this.setState({error:""})} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    width: "100%",
    maxWidth: 340,
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center"

  },
  input: {

  },
  inputContainer: {
    width: "100%",
    marginVertical: 8
  },
  button: {
    marginTop: 24
  },

});
