import uuid from 'uuid';

import getUserInfo from './utils/getUserInfo';
import shrinkImageAsync from './utils/shrinkImageAsync';
import uploadPhoto from './utils/uploadPhoto';
import {ProfileService} from './api/get'

const firebase = require('firebase');
// Required for side-effects
require('firebase/firestore');

const collectionName = 'posts'; // 'snack-SJucFknGX'

class Fire {

  // Download Data
  getPaged = async ({ size, start }) => {
    let ref = this.collection.orderBy('timestamp', 'desc').limit(size);

    
    try {
      if (start) {
        ref = ref.startAfter(start);
      }

      const querySnapshot = await ref.get();
      const data = [];
      querySnapshot.forEach(async (doc) => {
          const post = doc.data() || {};

          // Reduce the name
          const user_id = post.user_id || {};
        
          // const items = ["cleve_simiyu","reg.golfer_","ben_paul","michaeljordan"]
          // var name = items[Math.floor(Math.random() * items.length)];      
          // const name = "user.name"
          var user_info = post.user_info || {}
          var user = user_info.user || {}
          var name = user.name
          const reduced = {
            key: doc.id,
            id: doc.id,
            name: (name || 'Golfer').trim(),
            user: user,
            ...post,
          };
          data.push(reduced); 
      });     


      // console.log(data)
      const lastVisible = querySnapshot.docs[querySnapshot.docs.length - 1];
      return { data, cursor: lastVisible };
    } catch ({ message }) {
      alert(message);
    }
  };

  getProfile = async () => {
    let ref = this.collection.orderBy('timestamp', 'desc').limit(10);
    try {

      const querySnapshot = await ref.get();
      const data = [];
      querySnapshot.forEach(function(doc) {
        if (doc.exists) {
          const post = doc.data() || {};

          // Reduce the name
          const user = post.user || {};
          const items = ["cleve_simiyu","reg.golfer_","ben_paul","michaeljordan"]
          var name = items[Math.floor(Math.random() * items.length)];
          // const name = "cleve_simiyu" //user.deviceName;
          const reduced = {
            key: doc.id,
            name: (name || 'Secret Duck').trim(),
            ...post,
          };
          data.push(reduced);
        }
      });

      return { data };
    } catch ({ message }) {
      alert(message);
    }
  };
  // Upload Data
  uploadPhotoAsync = async uri => {
    const path = `${collectionName}/${this.uid}/${uuid.v4()}.jpg`;
    return uploadPhoto(uri, path);
  };

  post = async ({ text, image: localUri }) => {
    try {
      const { uri: reducedImage, width, height } = await shrinkImageAsync(
        localUri,
      );
      let uid = firebase.auth().currentUser.uid
      let user_ref = await firebase.firestore().collection("users").doc(uid).get()
      let user = user_ref.data()
      const remoteUri = await this.uploadPhotoAsync(reducedImage);
      const post = {
        text,
        user_id: this.uid,
        timestamp: this.timestamp,
        imageWidth: width,
        imageHeight: height,
        image: remoteUri,
        user_info: {user, ...getUserInfo()},
        // likes: 0,
      }

      let user_posts_coll = firebase.firestore().collection("users").doc(uid).collection("posts")   
      let user_post_ref = await user_posts_coll.add(post);      

      if (user.isPrivate){
        firebase.firestore().collection("private_posts").doc(uid).collection("posts").doc(user_post_ref.id).set(post)
      }else{
        this.collection.doc(user_post_ref.id).set(post);
      }
      
      
        



    } catch ({ message }) {
      alert(message);
    }
  };

  // Helpers
  get collection() {
    return firebase.firestore().collection(collectionName);
  }

  get uid() {
    return (firebase.auth().currentUser || {}).uid;
  }
  get timestamp() {
    return Date.now();
  }
}

Fire.shared = new Fire();
export default Fire;
