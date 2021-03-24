// import React, { Component } from 'react';
// import {
//   View,
//   ScrollView,
//   Text,
//   StyleSheet,
//   Dimensions,
//   TouchableHighlight
// } from 'react-native';
// import {useNavigation} from '@react-navigation/native'
// import ImageComponent from '../common/ImageComponent';
// const win = Dimensions.get('window');

// class UserPostList extends Component {
//   render() {
//     const {navigation, posts, ...props} = this.props
//     // const posts = ['https://static01.nyt.com/images/2020/06/08/sports/03golf-scores1-print/merlin_171799737_d4207498-3d66-4c82-837e-2c3a5ffed5b4-mobileMasterAt3x.jpg','https://andaluciagolf.com/images/Actual2020/usga.jpg','https://media.bizj.us/view/img/11629034/dsc00902*1200xx6000-3381-0-411.jpg','https://contents.mediadecathlon.com/p1708826/k$f4a92ceafca83c04e8f1db5359b718e3/golf-kit-7-clubs-adult-100-righty-size-2.jpg?&f=400x400',]
//     // console.log(posts.length)
//     const renderPosts = posts.map( (item, index) => {
//       return (
//         <View
//           key={index}
//           style={styles.postItem}
//         >
//         <TouchableHighlight onPress={()=>navigation.navigate("Post Details", {post:item})}>
//           <ImageComponent
//             uri={item.image}//.uri
//             style={styles.postImage}
//           />
//         </TouchableHighlight>
//         </View>
//       )
//     })

//     return (
//       <ScrollView style={styles.container} {...props}>
//         <View style={styles.gallery}>
//           {renderPosts}
//         </View>
//       </ScrollView>
//     );
//   }
// }

// export default function(properties){
//   const navigation = useNavigation()

//   const {posts, ...props} = properties
//   return (
//     <UserPostList {...props} posts={posts} navigation={navigation}  />

  
//   )
// }



// const galleryItemSize = (win.width / 3) - 2;
// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//   },
//   gallery: {
//     flexDirection: 'row',
//     flexWrap: 'wrap',
//     flex: 1,
//   },
//   postItem: {
//     padding: 1,
//   },
//   postImage: {
//     height: galleryItemSize,
//     width: galleryItemSize,
//     alignSelf: 'stretch',
//   },
// });



// function Auth() {

//   if (!firebase.apps.length){
//     firebase.initializeApp(FIREBASE_CONFIG);
//   }
  
//   const [user, setUser] = useState(null)
//   useEffect(()=>{
//     init()
//   },[])
  
//   const init = async ()=>{
//     firebase.auth().onAuthStateChanged(user => {
//       if (user) {
//       // User is logged in
//       setUser(user)
//       } else {
//       // User is not logged in
  
//       }
//     });    
//   }
//   return (user?<AuthScreen/>:<Navigator.MainDrawer/>)
// }
































































































































































// // import React from 'react'
// // import { View, Text } from 'react-native'
// // import { Video } from 'expo-av';
// // const LiveScreen = ({navigation}) => {

      

// //     return (
// //         <View>
// //             <Video
// //             source={{ uri: 'http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4' }}
// //             rate={1.0}
// //             volume={1.0}
// //             isMuted={false}
// //             resizeMode="cover"
// //             shouldPlay
// //             isLooping
// //             style={{ width: 300, height: 300 }}
// //             />            
// //         </View>
// //     )
// // }



// // import React from 'react';
// // import { Video } from 'expo-av';
// // import { Platform, StatusBar, StyleSheet, View, Text, TouchableHighlight,ScrollView } from 'react-native';
// // import {Card} from 'react-native-elements'
// // export default class App extends React.Component {
// //   state = {
// //     useNativeControls: true,
// //     toggleOnInstance: false,
// //     shouldPlay: false,
// //   };

// //   handleVideoRef = ref => {
// //     this.videoInstance = ref;
// //   };

// //   handleLoadStart = () => console.log('Loading...');
// //   handleLoaded = params => console.log('Video loaded:', params);
// //   handleProgress = params => console.log('Video status change:', params);
// //   handleError = error => console.error(error);

// //   toggleOnInstance = async () => {
// //     if (this.videoInstance) {
// //       if (this.state.shouldPlay) {
// //         await this.videoInstance.pauseAsync();
// //         this.setState({ shouldPlay: false });
// //       } else {
// //         await this.videoInstance.playAsync();
// //         this.setState({ shouldPlay: true });
// //       }
// //     }
// //   };

// //   toggleShouldPlay = () => this.setState({ shouldPlay: !this.state.shouldPlay });

// //   renderPlayPauseButton = () =>
// //     !this.state.useNativeControls ? (
// //       <TouchableHighlight
// //         style={styles.button}
// //         underlayColor="rgba(0,0,0,0.5)"
// //         onPress={this.state.toggleOnInstance ? this.toggleOnInstance : this.toggleShouldPlay}>
// //         <Text style={styles.buttonText}>{this.state.shouldPlay ? '⏸' : '▶️'}</Text>
// //       </TouchableHighlight>
// //     ) : null;

// //   render() {
 
// //     const STREAM = 'http://35.198.201.12:8000/live/webcam/index.m3u8'
// //     const MP4 = 'http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4'
// //     return (
// //       <Card>
// //       <View style={styles.container}>
          
// //         {Platform.OS === 'ios' && <StatusBar barStyle="default" />}
// //         {Platform.OS === 'android' && <View style={styles.statusBarUnderlay} />}
// //         <Video
// //           resizeMode="contain"
// //           style={styles.video}
// //           ref={this.handleVideoRef}
// //           onLoad={this.handleLoaded}
// //           onError={this.handleError}
// //           shouldPlay={this.state.shouldPlay}
// //           onLoadStart={this.handleLoadStart}
// //           onPlaybackStatusUpdate={this.handleProgress}
// //           useNativeControls={this.state.useNativeControls}
// //           source={{ uri: MP4}}
// //         />
// //         <View style={styles.buttonContainer} pointerEvents="box-none">
// //           {this.renderPlayPauseButton()}
// //         </View>
// //         <Video
// //           resizeMode="contain"
// //           style={styles.video}
// //           ref={this.handleVideoRef}
// //           onLoad={this.handleLoaded}
// //           onError={this.handleError}
// //           shouldPlay={this.state.shouldPlay}
// //           onLoadStart={this.handleLoadStart}
// //           onPlaybackStatusUpdate={this.handleProgress}
// //           useNativeControls={this.state.useNativeControls}
// //           source={{ uri: MP4}}
// //         />
// //         <View style={styles.buttonContainer} pointerEvents="box-none">
// //           {this.renderPlayPauseButton()}
// //         </View>        
// //         <Video
// //           resizeMode="contain"
// //           style={styles.video}
// //           ref={this.handleVideoRef}
// //           onLoad={this.handleLoaded}
// //           onError={this.handleError}
// //           shouldPlay={this.state.shouldPlay}
// //           onLoadStart={this.handleLoadStart}
// //           onPlaybackStatusUpdate={this.handleProgress}
// //           useNativeControls={this.state.useNativeControls}
// //           source={{ uri: MP4}}
// //         />
// //         <View style={styles.buttonContainer} pointerEvents="box-none">
// //           {this.renderPlayPauseButton()}
// //         </View> 
// //         </Card>         
       
// //       </View>
      
// //     );
// //   }
// // }

// // const styles = StyleSheet.create({
// //   container: {
// //     flex: 1,
// //     backgroundColor: 'white',
// //     height:5
// //   },
// //   statusBarUnderlay: {
// //     height: 24,
// //     backgroundColor: 'white',
// //   },
// //   video: {
// //     flex: 1,
// //     alignSelf: 'stretch',
// //     marginBottom:15
// //   },
// //   buttonContainer: {
// //     position: 'absolute',
// //     height: 100,
// //     left: 0,
// //     right: 0,
// //     bottom: 0,
// //     justifyContent: 'center',
// //     alignItems: 'center',
// //   },
// //   button: {
// //     width: 100,
// //     height: 100,
// //     justifyContent: 'center',
// //     alignItems: 'center',
// //   },
// //   buttonText: {
// //     fontSize: 80,
// //   },
// // });


