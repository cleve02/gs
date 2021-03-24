import React, { Component, useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ActionSheetIOS,
  ActivityIndicator
} from 'react-native';

import ImageComponent from '../common/ImageComponent';
import {useNavigation} from '@react-navigation/native'
import {FollowService} from '../../api/get'
import firebase from 'firebase'
import { FlatList } from 'react-native-gesture-handler';
// const firebase = require('firebase');


const UserProfile = (props) => {
  // const [firstPost, setFirstPost] = useState({})
  const {posts, user} = props;

  const navigation = useNavigation()
  // const deviceId = posts.length ? posts[0].user.deviceId : null
  const [follower_count, setFollowerCount] = useState(0)
  const [following_count, setFollowingCount] = useState(0)
  const [isFollowingUser, setIsFollowingUser] = useState(false)
  const [isRequested, setIsRequested] = useState(false)
//   const [loading, setLoading] = useState(true)
  useEffect(()=>{
    // setLoading(true)
    getFollowersFollowing()
    getIsFollowing()
    getIsRequested()
    // setLoading(false)

    
    
  },[user])
  const f = new FollowService
  const current_user = firebase.auth().currentUser
  const isPrivate = user.isPrivate

  const getIsRequested = async ()=>{
    const isRequested = await f.getIsRequested(user.id, current_user.uid)
    setIsRequested(isRequested)

  }

  // const followers_count = f.getFollowers(user.id)
  const getFollowersFollowing = async ()=>{
    const followers = await f.getFollowers(user.id)
    const following = await f.getFollowing(user.id)
    setFollowerCount(followers)
    setFollowingCount(following)


  }

  const getIsFollowing = async () =>{

    const isFollowingUser = await f.getIsFollowingUser(user.id, current_user.uid)
    setIsFollowingUser(isFollowingUser)

  }

  const followUser = async () =>{
    //   setFollowerCount(follower_count+1)

    //   setLoading(true)
      await f.followerUser(user.id, current_user.uid)
      await getIsFollowing()

      await getFollowersFollowing()
      // getFollowing()
    //   setLoading(false)
  }
 
  const unfollowUser = async () =>{
    // setFollowerCount(follower_count-1)
    // setLoading(true)
    
    await f.unfollowUser(user.id, current_user.uid)
    await getIsFollowing()

    await getFollowersFollowing()
    // getFollowing()    
    // setLoading(false)

  }

  const toggleRequest = async () =>{
    isRequested? f.removeFollowRequest(user.id, current_user.uid) : f.requestFollow(user.id, current_user.uid)
    setIsRequested(!isRequested)
  }

  const renderStatistics = ['posts', 'followers', 'following'].map( (item, index) => {
    // var randomnumber = Math.floor(Math.random() * (3000 - 10 + 1)) + 10;
    return (
      <View
        style={styles.column}
        key={index}
      >
        <Text style={styles.number}>
          {item === "posts"?posts.length: item === "followers"?follower_count : following_count}
        </Text>

        <Text style={styles.label}>
          {item}
        </Text>
      </View>
    )
  })  
  return (
    
    <View style={styles.container}>
    {/* <ActivityIndicator color="black" animating={loading}/> */}

    <View style={styles.row}>

      <View style={styles.avatarView}>
        <ImageComponent
          style={styles.avatar}
          uri={user.profile_photo?user.profile_photo:"data:image/png;base64,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"}
          // uri={firstPost.image}
        />
      </View>

      <View style={styles.profileRow}>

        <View style={styles.statistics}>

          {renderStatistics}

        </View>


        {isFollowingUser?
        <View style={styles.editProfileView}>
          <TouchableOpacity
            style={styles.editBtn}
            onPress={()=>{unfollowUser()}}
          >
            <Text style={styles.editBtnText}>Following</Text>
          </TouchableOpacity>
        </View>
        :
        <View style={styles.editProfileView}>
          <TouchableOpacity
            style={{...styles.editBtn, backgroundColor: "#3f729b"}}
            onPress={()=>{isPrivate? toggleRequest() : followUser()}}
          >
            {isRequested?<Text style={{...styles.editBtnText, color:"white"}}>Requested</Text> : <Text style={{...styles.editBtnText, color:"white"}}>Follow</Text>}
          </TouchableOpacity>
        </View>        

        }

      </View>

    </View>

    <View style={styles.row2nd}>
      <Text style={styles.userName}>
        {user.name || "No name set"}
      </Text>
      <Text style={styles.userName}>
        GHIN-{user.ghin || "####"}
      </Text>      
      <Text style={styles.userDetails}>
      {user.bio?user.bio:"No bio set"}    
      </Text>
    </View>

  </View>
  )
}

export default UserProfile



const styles = StyleSheet.create({
  container: {
    flex: 0,
    padding: 10,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: "white",
  },
  row: {
    flex: 0,
    flexDirection: 'row',
    marginBottom: 20,
  },
  row2nd: {
    flex: 0,
    marginBottom: 20,
  },
  avatarView: {
    flex: 0,
    marginRight: 20,
  },
  profileRow: {
    flex: 1,
  },
  statistics: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 10,
  },
  column: {
    alignItems: 'center',
  },
  number: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  label: {
    color: 'black',
    fontSize: 14,
  },
  editProfileView: {

  },
  editBtn: {
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: 'black',
    padding: 5,
    borderRadius: 5,
    alignItems: 'center',
    
  },
  editBtnText: {
    fontSize: 16,
    fontWeight: 'bold',
    
  },
  userName: {
    fontWeight: 'bold',
    fontSize: 18,
  },
  userDetails: {
    fontSize: 18,
  },
  avatar: {
    height: 100,
    width: 100,
    borderRadius: 50,
    marginBottom: 10,
  },  
});
