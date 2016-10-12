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
				name: 'Insec',
				timeToHavest: 15,
				maxTimeToHavest: 30,
				temperatureStatus: 23,
				maxTemperatureStatus: 50,
				lightStatus: 30,
				maxLightStatus: 100,
				waterStatus: 12,
				maxWaterStatus: 100,
				url: 'https://placeholdit.imgix.net/~text?txtsize=14&txt=150%C3%97150&w=150&h=150'
			},
			{
				name: 'Insect 2',
				name: 'Insec',
				timeToHavest: 25,
				maxTimeToHavest: 30,
				temperatureStatus: 26,
				maxTemperatureStatus: 50,
				lightStatus: 64,
				maxLightStatus: 100,
				waterStatus: 64,
				maxWaterStatus: 100,
				url: 'https://placeholdit.imgix.net/~text?txtsize=14&txt=150%C3%97150&w=150&h=150'
			},
			{
				name: 'insect 3',
				name: 'Insec',
				timeToHavest: 19,
				maxTimeToHavest: 30,
				temperatureStatus: 46,
				maxTemperatureStatus: 50,
				lightStatus: 65,
				maxLightStatus: 100,
				waterStatus: 30,
				maxWaterStatus: 100,
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








