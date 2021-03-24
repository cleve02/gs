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
import ImageComponent from '../common/ImageComponent';
const win = Dimensions.get('window');

class UserPostList extends Component {
  render() {
    const {navigation, posts, ...props} = this.props
    // const posts = ['https://static01.nyt.com/images/2020/06/08/sports/03golf-scores1-print/merlin_171799737_d4207498-3d66-4c82-837e-2c3a5ffed5b4-mobileMasterAt3x.jpg','https://andaluciagolf.com/images/Actual2020/usga.jpg','https://media.bizj.us/view/img/11629034/dsc00902*1200xx6000-3381-0-411.jpg','https://contents.mediadecathlon.com/p1708826/k$f4a92ceafca83c04e8f1db5359b718e3/golf-kit-7-clubs-adult-100-righty-size-2.jpg?&f=400x400',]
    // console.log(posts.length)
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
