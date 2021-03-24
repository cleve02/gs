import React, {useState,useEffect,Component} from 'react'
import { StyleSheet, Text, View,Image, Button,RefreshControl, ScrollView } from 'react-native'
import UserProfile from '../components/Profile/UserProfile';
import UserPostList from '../components/Profile/UserPostList';
import Fire from "../Fire";
import firebase from "firebase";
import {getProfile, getNewProfile, getProfilePosts} from '../api/get'
import Toast from "../components/Toast";
import { useFocusEffect } from '@react-navigation/native';
// Required for side-effects
require('firebase/firestore');

// const  getImage = async () => {
//     var image  = await require("https://media.gettyimages.com/photos/relaxation-time-coffee-imaes-picture-id689376652");
//     return image
// }

const ProfileScreen =()=> {

    // state = {
    //   loading: false,
    //   posts: [],
    //   data: {},
    //   user: {},
    //   message: ""
    // };

    const [loading, setLoading] = useState(false)
    const [data, setData] = useState({})
    const [posts, setPosts] = useState([])
    const [user, setUser] = useState({})
    const [message, setMessage] = useState("")

    useEffect(()=>{
      makeRemoteRequest()
      // setLoading(false)
      
    },[]) 



    const makeRemoteRequest = async () => {
      // If we are currently getting posts, then bail out..
      if (loading) {
        return;
      }      

      setLoading(true)

      // The data prop will be an array of posts, the cursor will be used for pagination.
      const { data } = await getProfilePosts();
      
      // this.setState({ 
      //   data: data ,
      //   posts: Object.values(data).sort((a, b) => a.timestamp < b.timestamp)
      // })
      setData(data)
      setPosts(Object.values(data).sort((a, b) => a.timestamp < b.timestamp))


      let uid = firebase.auth().currentUser.uid
      let user_ref = await firebase.firestore().collection("users").doc(uid).get()
      
      let user = { 
        id: user_ref.id, 
        ...user_ref.data() 
      }
      setUser(user)

      // const { message } = this.props.route.params || ""
      // setMessage(message)      

      setLoading(false)
    };    
    // const _onRefresh = () => makeRemoteRequest();

    useFocusEffect(React.useCallback(() => {
      

      makeRemoteRequest();
    }, [message])
    );   


      return (
        <ScrollView refreshControl={
          <RefreshControl
            refreshing={loading}
            onRefresh={()=>{makeRemoteRequest()}}
        />}>
        <View style={styles.container}>
  
          <UserProfile
            posts={posts}
            user = {user}
          // //   navigation={this.props.navigation}
            // {...this.props}
          />
          {!posts?<Text>No posts yet</Text>:
          <UserPostList
            // refreshControl={
            //   <RefreshControl
            //     refreshing={this.state.loading}
            //     onRefresh={this._onRefresh}
            //   />
            // }              
            posts={posts}
          />}
        <Toast type="message" message={message} onDismiss={() => setMessage("")} />
        </View>
        

        </ScrollView>
        );
      
    }
        
const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: 'white',
  },
});
export default ProfileScreen

