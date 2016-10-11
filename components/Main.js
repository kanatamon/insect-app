import React, { Component } from 'react'
import { 
	StyleSheet, 
	View, 
	Text, 
	Image,
	TouchableHighlight,
	ScrollView 
} from 'react-native';

const styles = StyleSheet.create({
  row: {
		flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'stretch',
  },
  catalogue: {
	  flex: 1,
	  flexDirection: 'column',
	  justifyContent: 'space-between',
	  padding: 25
	},
	image: {
		width: 150,
		height: 150,
		backgroundColor: '#D0D0D0'
	},
	lifeTimeLabel: {
		
	}
})

const Img = ({url, onPressImage}) => (
	<TouchableHighlight 
		style={{marginBottom: 25}} 
		onPress={onPressImage} >
    <Image
	    style={styles.image}
	    source={{uri: url }} />
  </TouchableHighlight>
)

class Main extends Component {

	state = {
		insects: [
			{
				name: 'insect 1',
				time: 12,
				temperature: 25,
				humanity: 30,
				url: 'https://placeholdit.imgix.net/~text?txtsize=14&txt=150%C3%97150&w=150&h=150'
			},
			{
				name: 'insect 2',
				time: 16,
				temperature: 25,
				humanity: 30,
				url: 'https://placeholdit.imgix.net/~text?txtsize=14&txt=150%C3%97150&w=150&h=150'
			},
			{
				name: 'insect 3',
				time: 2,
				temperature: 25,
				humanity: 30,
				url: 'https://placeholdit.imgix.net/~text?txtsize=14&txt=150%C3%97150&w=150&h=150'
			}
		]
	}

	handleOnPressImage = (data) => {
		const { onPressImage } = this.props
		onPressImage(data)
	}

	render() {
		const { insects } = this.state

		return (
			<ScrollView> 
	      <View style={styles.catalogue}>
	      	{
	      		insects.map((item, index, arr) => {
	      			if(index % 2 === 0) {
	      				const isLast = index + 1 >= arr.length
	      				if(isLast) {
	      					return (
			      				<View key={index} style={styles.row}>
											<Img 
												url={arr[index].url} 
												onPressImage={() => 
													this.handleOnPressImage(arr[index])
												} />
										</View>
      						)
	      				} else {
	      					return (
			      				<View key={index} style={styles.row}>
				      				<Img 
												url={arr[index].url} 
												onPressImage={() => 
													this.handleOnPressImage(arr[index])
												} />
											<Img 
												url={arr[index + 1].url} 
												onPressImage={() => 
													this.handleOnPressImage(arr[index + 1])
												} />
										</View>
      						)
	      				}
	      			}
	      		})	
	      	}
  			</View>
      </ScrollView>
		);
	}
}

export default Main








