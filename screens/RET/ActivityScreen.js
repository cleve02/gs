import React from 'react'
import { View, Text, StyleSheet,FlatList,Image,TouchableHighlight } from 'react-native'
// import {ListItem} from 'react-native-elements'
const profileImageSize = 36;
const padding = 12;

const ActivityScreen = () => {
      const list = [
            {key:'1', img:'https://media.bizj.us/view/img/11629034/dsc00902*1200xx6000-3381-0-411.jpg', nome:'Bonieky Lacerda', msg:'Quando sai novas aulas?'},
            {key:'2', img:'https://specials-images.forbesimg.com/imageserve/485187122/960x0.jpg?cropX1=1053&cropX2=4912&cropY1=458&cropY2=3030', nome:'José Medeiros', msg:'Opa, tudo bem? Opa, tudo bem? Opa, tudo bem? Opa, tudo bem? Opa, tudo bem? Opa, tudo bem?'},
            {key:'3', img:'https://www.telegraph.co.uk/content/dam/health-fitness/2020/04/29/TELEMMGLPICT000229450087_trans_NvBQzQNjv4Bq900leoZVuq6ru6F43OqP_jlaTMTxUhlzF8Rkw038U-A.jpeg', nome:'Mãe', msg:'Filho, etc e tal..'},
            {key:'4', img:'https://ichef.bbci.co.uk/news/410/cpsprodpb/4466/production/_107901571_mediaitem107898548.jpg', nome:'Augusto Santos', msg:'Oi'},
            {key:'5', img:'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQNgMEcYWjlPgIl0vUlsMEXUTqEcsMeGm_OiA&usqp=CAU', nome:'Aline Gonçalves', msg:'Xau'},
            {key:'6', img:'https://www.nation.co.ke/resource/image/334310/landscape_ratio16x9/400/225/fc2b7517f7b83a35d6890c0e29b2057/PM/dn-golf-arusha-1005fs-jpg.jpg', nome:'Paulo Duarte', msg:'Ok'}
        ]

    return (
      <View style={styles.container}>
        <FlatList
            data={list} 
            renderItem={({item})=> <ListItem data={item} />}
        />
      </View>
    )
}




const ListItem = ({data}) =>{
  function click(){}
  var items = ["commented on your post: really vivid picture. Nice surroundings", "liked your post", "messaged you", "mentioned you in a comment: really vivid picture"]
  var msg = items[Math.floor(Math.random() * items.length)];
  return(

    <TouchableHighlight onPress={click} underlayColor="#CCCCCC">
      <View style={styles.item}>
        <Image source={{ uri: data.img }} style={styles.imagem} />
        <View style={styles.info}>
          <Text  style={styles.msg}>
            <Text style={styles.nome}>
              {data.nome}{" "} 
            </Text>            
              {msg}
          </Text>
        </View>
      </View>
    </TouchableHighlight>    

  )
}





















const styles = StyleSheet.create({
  container:{
      flex:1,
      // marginTop:(Platform.OS=='android') ? 80 : 0
  },
  item: {
    height: 60,
    marginLeft: 10,
    marginRight: 10,
    borderBottomWidth: 1,
    borderColor: '#CCCCCC',
    flex: 1,
    flexDirection: 'row',
  },
  imagem: {
    width: 40,
    height: 40,
    marginTop: 10,
    borderRadius: 20,
  },
  info: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    marginLeft: 10,
  },
  nome: {
    fontSize: 15,
    fontWeight: 'bold',
    
  },  
});
export default ActivityScreen
