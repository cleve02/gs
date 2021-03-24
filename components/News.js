import React from 'react';
import {View, Text, Image, StyleSheet, ActivityIndicator} from 'react-native';

const News = (props) => {
	return(
		<View style={ styles.newsItem }>
			{ props.data.image ? <Image
				style={ styles.newsImage }
				source={{ uri: props.data.profile_photo }}
				PlaceholderContent={<ActivityIndicator />}
			></Image> : <Text></Text> }
			<View style={ styles.newsContent }>
				<Text style={ styles.newsTitle }>{ props.data.bio }</Text>
				<Text style={ styles.newsAuthor }>{ props.data.bio }</Text>
			</View>
		</View>
	)
}

const styles = StyleSheet.create({
	newsItem: {
		borderBottomWidth: 1,
		borderBottomColor: '#ccc',
		padding: 10,
		display: "flex",
		flexDirection: "row",
	},
	newsImage: {
		width: 75,
		height: 75,
		marginRight: 10,
	},
	newsContent:{
		flex: 1
	},
	newsTitle: {
		fontSize: 14,
		fontWeight: 'bold',
		marginBottom: 5,
	}
 });

 export default News;