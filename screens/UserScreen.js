import React, {useState,useEffect,Component} from 'react'
import { StyleSheet, Text, View,Image, Button,RefreshControl, ScrollView } from 'react-native'
import UserProfile from '../components/Profile/OtherUserProfile';
import UserPostList from '../components/Profile/OtherUserPostList';
import Fire from "../Fire";
import firebase from "firebase";
import {getProfile, getNewProfile, getUserPosts} from '../api/get'
// Required for side-effects
require('firebase/firestore');

// const  getImage = async () => {
//     var image  = await require("https://media.gettyimages.com/photos/relaxation-time-coffee-imaes-picture-id689376652");
//     return image
// }

class ProfileScreen extends Component {

    state = {
      loading: false,
      posts: [],
      data: {},
      user: {}
    };

    componentDidMount() { 
      this.makeRemoteRequest();
    }  

    makeRemoteRequest = async () => {
      const {navigation} = this.props
      let {user_id} = this.props.route.params
      let current_user_id = firebase.auth().currentUser.uid
      // If we are currently getting posts, then bail out..
      if (this.state.loading) {
        return;
      }      

      this.setState({ loading: true });

      // The data prop will be an array of posts, the cursor will be used for pagination.
      const { data } = await getUserPosts(user_id);
      
      this.setState({ 
        data: data ,
        posts: Object.values(data).sort((a, b) => a.timestamp < b.timestamp)
      })

      
      
      if (user_id === current_user_id){
        navigation.navigate("Profile")
      }
      
      let user_ref = await firebase.firestore().collection("users").doc(user_id).get()
      let user = { 
        id: user_ref.id, 
        ...user_ref.data() 
      }
      this.setState({user:user})

      this.setState({ loading: false });
    };    
    _onRefresh = () => this.makeRemoteRequest();

    
    render() {
        // if (!this.props.user) return null;
    
        // const userPosts = this.props.feed.filter( item => item.authorId === this.props.user.id)
        
    
        return (
          <ScrollView 
            refreshControl={
              <RefreshControl
                refreshing={this.state.loading}
                onRefresh={this._onRefresh}
              />
            }  
          >
          <View style={styles.container}>
    
            <UserProfile
              posts = {this.state.posts}
              user = {this.state.user}
            // //   navigation={this.props.navigation}
              // {...this.props}
            />
            {!this.state.posts?<Text>No posts yet</Text>:
            <UserPostList
            
              posts = {this.state.posts}
              user = {this.state.user}
            />}
    
          </View>
          </ScrollView>
        );
      }
    }
        
const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: 'white',
  },
});
export default ProfileScreen

