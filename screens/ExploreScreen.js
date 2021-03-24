import React, {useState,useEffect,Component} from 'react'
import { StyleSheet, Text, View,Image, Button, RefreshControl } from 'react-native'
import UserPostList from '../components/Profile/UserPostList';
import Fire from "../Fire";
import firebase from "firebase";


class ExploreScreen extends Component {

    state = {
      loading: false,
      posts: [],
      data: {}
    };

    componentDidMount() {
      // Check if we are signed in...
      if (Fire.shared.uid) {
        // If we are, then we can get the first 5 posts
        this.makeRemoteRequest();
      } else {
        // If we aren't then we should just start observing changes. This will be called when the user signs in
        firebase.auth().onAuthStateChanged(user => {
          if (user) {
            this.makeRemoteRequest();
          }
        });
      }
    }  
    makeRemoteRequest = async () => {
      // If we are currently getting posts, then bail out..
      if (this.state.loading) {
        return;
      }      

      this.setState({ loading: true });

      // The data prop will be an array of posts, the cursor will be used for pagination.
      const { data } = await Fire.shared.getProfile();

      this.setState({ 
        data: data ,
        posts: Object.values(data).sort((a, b) => a.timestamp < b.timestamp)
      })
      // Finish loading, this will stop the refreshing animation.
      this.setState({ loading: false });
    };  

    _onRefresh = () => this.makeRemoteRequest();
    
    render() {  
        return (
          <View style={styles.container}>
            <UserPostList
              refreshControl={
                <RefreshControl
                  refreshing={this.state.loading}
                  onRefresh={this._onRefresh}
                />
              }              
              posts={this.state.posts}
            />
    
          </View>
        );
      }
    }
    
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
});
export default ExploreScreen

