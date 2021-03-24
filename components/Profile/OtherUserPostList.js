import React, { Component } from 'react';
import {
  View,
  ScrollView,
  Text,
  StyleSheet,
  Dimensions,
  TouchableHighlight
} from 'react-native';
import {useNavigation} from '@react-navigation/native'
import {FollowService} from '../../api/get'
import firebase from 'firebase'
import { FontAwesome} from "@expo/vector-icons";

import ImageComponent from '../common/ImageComponent';
const win = Dimensions.get('window');

class UserPostList extends Component {

    state = {
        isFollowingUser: false,
        // isPrivate: true
    }

    // componentDidMount () {
    //     this.getIsFollowing()

    //     console.log(this.state.isFollowingUser)

    // }

    // getIsFollowing = async () =>{
    //     const {navigation, posts, ...props} = this.props
    //     const {user} = props

    //     const f = new FollowService
    //     const current_user = firebase.auth().currentUser

    //     const isFollowingUser = await f.getIsFollowingUser(user.id, current_user.uid)
        
        
    //   }
    
    render() {
        const {navigation, posts, ...props} = this.props
        const {user} = props
        const isPrivate = user.isPrivate

        const f = new FollowService
        const current_user = firebase.auth().currentUser
        f.getIsFollowingUser(user.id, current_user.uid).then((value)=>{
            this.setState({isFollowingUser:value})
        },[])
        // console.log(this.state.isFollowingUser)

        const renderPosts = posts.map( (item, index) => {
        return (
            <View
            key={index}
            style={styles.postItem}
            >
            <TouchableHighlight onPress={()=>{}} //navigation.navigate("Post Details", {post:item})
            >
            <ImageComponent
                uri={item.image}//.uri
                style={styles.postImage}
            />
            </TouchableHighlight>
            </View>
        )
        })

        const posts_exists = renderPosts.length
        
        return (
        !this.state.isFollowingUser && isPrivate?

        <View style={{flex:1,alignItems:"center",justifyContent:"center"}}><FontAwesome name="lock" size={50}/><Text style={{fontSize:20}}>This user is private</Text></View>
        :
        <ScrollView style={styles.container} {...props}>
            <View style={styles.gallery}>
            {posts_exists? renderPosts: <View style={{flex:1,alignItems:"center",justifyContent:"center"}}><Text style={{fontSize:20}}>No Posts yet</Text></View>}
            </View>
        </ScrollView>
                
        
        );
    }
}

export default function(properties){
  const navigation = useNavigation()

  const {posts, ...props} = properties
  return (
    <UserPostList {...props} posts={posts} navigation={navigation}  />

  
  )
}



const galleryItemSize = (win.width / 3) - 2;
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  gallery: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    flex: 1,
  },
  postItem: {
    padding: 1,
  },
  postImage: {
    height: galleryItemSize,
    width: galleryItemSize,
    alignSelf: 'stretch',
  },
});
