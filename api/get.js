import uuid from 'uuid';

import getUserInfo from '../utils/getUserInfo';
import shrinkImageAsync from '../utils/shrinkImageAsync';
import uploadPhoto from '../utils/uploadPhoto';

const firebase = require('firebase');
// Required for side-effects
// require('firebase/firestore');

export class LiveService {
    constructor() { this.db = firebase.firestore() }

    getLiveStreams = async ()=>{
        const lives =  []
        let lives_ref = await this.db.collection("live").limit(15).get();

        lives_ref.forEach(function(doc) {
            if (doc.exists) {
                const live = doc.data() || {};
        
                // Reduce the name
                // const user = post.user || {};
        
                // const name = user.deviceName;
                // const items = ["cleve_simiyu","reg.golfer_","ben_paul","michaeljordan"]
                // var name = items[Math.floor(Math.random() * items.length)];
                const reduced = {
                key: doc.id,
                id: doc.id,
                ...live,
                };
                lives.push(reduced);
            }
            });
        
            return lives      
    }

}


export class UploadService {
    constructor() { this.db = firebase.firestore() }

    uploadProfilePhoto = async ({ image: localUri })=>{

        const uploadPhotoAsync = async uri => {
            const path = `${collectionName}/${this.uid}/${uuid.v4()}.jpg`;
            return uploadPhoto(uri, path);
          };      

        try {
            const { uri: reducedImage, width, height } = await shrinkImageAsync(
              localUri,
            );
            let uid = firebase.auth().currentUser.uid
            const remoteUri = await uploadPhotoAsync(reducedImage);
            
              
            let user = this.db.collection("users").doc(uid)   
            await user.update({
                profile_photo: remoteUri
            });
      
      
          } catch ({ message }) {
            alert(message);
          }        
    }

    uploadStreamLink = async (url)=>{
        const user_id = firebase.auth().currentUser.uid
        const user_ref = await this.db.collection("users").doc(user_id).get()

        const user = user_ref.data()
        
        await this.db.collection("live").doc().set({
            url: url,
            user: user
        })

    }

}

export class ProfileService {
    constructor() { this.db = firebase.firestore() }

    getProfile = async (user_id) =>{
        const user_ref = await this.db.collection("users").doc(user_id).get()
        const user = user_ref.data()

        return user
    }

    getPros = async () =>{
        const users =  []
        let users_ref = await this.db.collection("users").limit(10).get();

        users_ref.forEach(function(doc) {
            if (doc.exists) {
                const user = doc.data() || {};
        
                // Reduce the name
                // const user = post.user || {};
        
                // const name = user.deviceName;
                // const items = ["cleve_simiyu","reg.golfer_","ben_paul","michaeljordan"]
                // var name = items[Math.floor(Math.random() * items.length)];
                const reduced = {
                key: doc.id,
                id: doc.id,
                ...user,
                };
                users.push(reduced);
            }
            });
        
            return users
        

    }
}


export class SettingsService{
    constructor() { this.db = firebase.firestore() }


    updateProfile = async ({name, username, email, bio, isPrivate, ghin })=>{

        try{
        const user_id = firebase.auth().currentUser.uid
        const user = this.db.collection("users").doc(user_id)

        const res = await user.update({
            name: name,
            username: username,
            bio: bio,
            isPrivate: isPrivate,
            ghin: ghin
        })

        return {}
        }
        catch (error){
            return {error:error}
        }

    }


}

export class FollowService {
    
    constructor() { this.db = firebase.firestore() }

    getFollowRequests = async () =>{
        let current_user = firebase.auth().currentUser
        let requests_ref = await this.db.collection("follow_requests").doc(current_user.uid).collection("followers").get()

        const requests = [];
        requests_ref.forEach(function(doc) {
          if (doc.exists) {
            const request = doc.data() || {};
  
            // Reduce the name
            const user = request.user || {};
            // const name = "cleve_simiyu" //user.deviceName;
            const reduced = {
              user_id: doc.id,
              ...request,
            };
            requests.push(reduced); 

        }  
        });
        return { requests };     
    }


    requestFollow = async (user_id, current_user_id) =>{
        const f_ref = this.db.collection("follow_requests").doc(user_id).collection("followers").doc(current_user_id)

        const user_ref = await this.db.collection("users").doc(current_user_id).get()
        const user = user_ref.data()

        const f = await f_ref.set({user: user})
    }

    removeFollowRequest = async (user_id, current_user_id) =>{
        const fd_ref = await this.db.collection("follow_requests").doc(user_id).collection("followers").doc(current_user_id).delete()

    }

    getIsRequested = async (user_id, current_user_id) =>{
        const f_ref = await this.db.collection("follow_requests").doc(user_id).collection("followers").doc(current_user_id).get()
        if (f_ref.exists){
            return true
        }
        return false
    }

    acceptFollowRequest = async (user_id, current_user_id) =>{
        await this.followerUser(current_user_id, user_id)

        await this.removeFollowRequest(current_user_id, user_id)
    }

    followerUser = async (user_id, current_user_id) =>{

        try{

        
        const f_ref = this.db.collection("users").doc(current_user_id).collection("following").doc(user_id)
        const f = await f_ref.set({state: 1})

        const fd_ref = this.db.collection("users").doc(user_id).collection("followers").doc(current_user_id)
        const fd = await fd_ref.set({state: 1})

        return 0
    } catch ({ message }) {
        alert(message);
    }

    }


    unfollowUser = async (user_id, current_user_id) =>{
        
        const f_ref = await this.db.collection("users").doc(current_user_id).collection("following").doc(user_id).delete()
        const fd_ref = await this.db.collection("users").doc(user_id).collection("followers").doc(current_user_id).delete()

        return 0
    }
    
    getFollowers = async (user_id) => {
        const followers_ref = await this.db.collection("users").doc(user_id).collection("followers").get()
        const followers = followers_ref.size

        return followers
    }
    getFollowing = async (user_id) => {
        const following_ref = await this.db.collection("users").doc(user_id).collection("following").get()
        const following = following_ref.size

        return following
    }

    getIsFollowingUser = async (user_id, current_user_id) =>{
        const f_ref = await this.db.collection("users").doc(current_user_id).collection("following").doc(user_id).get()
        if (f_ref.exists){
            return true
        }
        return false

    }




    get db() {
        return firebase.firestore();
      }      
    
    }    

export class FeelingsService {

    
    likePost = async (post_id, user_id) => {
        // Used to build the follower count
        const l_ref = this.db.collection("feelings").doc(post_id).collection("likes").doc(user_id)
        const l = await l_ref.set({ state : 1 })
        
        // this.db.doc(`feelings/${post_id}`).update()
        return 0

    }

    removeLike = async (post_id, user_id) =>{
        const l_ref = await this.db.collection("feelings").doc(post_id).collection("likes").doc(user_id).delete()

    }

    getLikes = async (post_id)=>{
        const l_ref = await this.db.collection("feelings").doc(post_id).collection("likes").get()
        const likes = l_ref.size
        // console.log(likes)
        return {likes}
    }

    getLiked = async (post_id, user_id) =>{
        const l_ref =await this.db.collection("feelings").doc(post_id).collection("likes").doc(user_id).get()

        if (l_ref.exists){
            return true
        }
        return false

    }

    get db() {
        return firebase.firestore();
      }    
    
}    

const collectionName = 'posts'; 

// Download Data
getPaged = async ({ size, start }) => {
let ref = collection("posts").orderBy('timestamp', 'desc').limit(size);
try {
    if (start) {
    ref = ref.startAfter(start);
    }

    const querySnapshot = await ref.get();
    const data = [];
    querySnapshot.forEach(function(doc) {
    if (doc.exists) {
        const post = doc.data() || {};

        // Reduce the name
        const user = post.user || {};

        // const name = user.deviceName;
        const items = ["cleve_simiyu","reg.golfer_","ben_paul","michaeljordan"]
        var name = items[Math.floor(Math.random() * items.length)];
        const reduced = {
        key: doc.id,
        name: (name || 'Secret Duck').trim(),
        ...post,
        };
        data.push(reduced);
    }
    });

    const lastVisible = querySnapshot.docs[querySnapshot.docs.length - 1];
    return { data, cursor: lastVisible };
} catch ({ message }) {
    alert(message);
}
};

export const getProfile = async () => {
        
    let ref = firebase.firestore().collection("posts").orderBy('timestamp', 'desc').limit(10);
    


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
        console.log(message);
        alert(message)
    }
};

export const getProfilePosts = async () => {
    try {
        // let rootRef = firebase.firestore()
        // let postsRef = firebase.firestore().collection("posts")
        // let usersRef = firebase.firestore().collection("users")
        
        let uid = firebase.auth().currentUser.uid
        
        let user_posts = await firebase.firestore().collection("users").doc(uid).collection("posts").get()
        const data = [];
        user_posts.forEach(function(doc) {
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
        console.log(message);
        alert(message)
    }

}


export const getUserPosts = async (user_id) => {
    try {
        // let rootRef = firebase.firestore()
        // let postsRef = firebase.firestore().collection("posts")
        // let usersRef = firebase.firestore().collection("users")
        
        // let uid = firebase.auth().currentUser.uid
        
        let user_posts = await firebase.firestore().collection("users").doc(user_id).collection("posts").get()
        const data = [];
        user_posts.forEach(function(doc) {
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
        console.log(message);
        alert(message)
    }

}
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

    const remoteUri = await this.uploadPhotoAsync(reducedImage);
    this.collection.add({
    text,
    user_id: this.uid,
    timestamp: this.timestamp,
    imageWidth: width,
    imageHeight: height,
    image: remoteUri,
    user: getUserInfo(),
    likes: 0,
    });
} catch ({ message }) {
    alert(message);
}
};

// Helpers
function collection({name}) {
return firebase.firestore().collection(name);
}

function uid() {
return (firebase.auth().currentUser || {}).uid;
}
function timestamp() {
return Date.now();
}



