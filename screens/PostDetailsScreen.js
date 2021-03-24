import React from 'react'
import { View, Text,ScrollView } from 'react-native'
import Item from '../components/Home/Item'
const PostDetailsScreen = ({route}) => {
    const {post} = route.params
    return (
        <View>
            <ScrollView>
            <Item {...post} />
            </ScrollView>
        </View>
    )
}

export default PostDetailsScreen
