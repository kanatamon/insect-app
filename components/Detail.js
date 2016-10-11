import React, { Component } from 'react'
import { 
	Text, 
	View, 
	StyleSheet,
	Image,
	ProgressViewIOS 
} from 'react-native'

const styles = StyleSheet.create({
	name: {
		textAlign: 'center',
		padding: 12,
		fontWeight: 'bold',
		fontSize: 18
	},
	container: {
	 	flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center'
	},
	image: {
		backgroundColor: '#ccc',
		width: 150,
		height: 150,
		padding: 6,
		margin: 15
	},
	progressView: {
	 marginTop: 10,
	 marginRight: 10,
	 marginLeft: 10,
	 width: 200 
	},
	lifeTime: {
		flexDirection: 'row'
	}
})

class Detail extends Component {
	
	render() {
		const { 
			name, 
			time, 
			temperature, 
			humanity,
			url 
		} = this.props

		return (
			<View style={styles.container}>
				<Text style={styles.name}>{name}</Text>
				<Image style={styles.image} source={{uri: url}} />

				<Text>ระยะเวลาเก็บแมลง</Text>
				<View style={styles.lifeTime}>
					<Text> 0 วัน</Text>
					<ProgressViewIOS 
						progressTintColor='green'
						style={styles.progressView} 
						progress={time/30} />
					<Text>26 วัน </Text>
				</View>
				<ProgressViewIOS 
						progressTintColor='yellow'
						style={styles.progressView} 
						progress={temperature/50} />
				<ProgressViewIOS 
						progressTintColor='yellow'
						style={styles.progressView} 
						progress={humanity/100} />
			</View>
		)
	}
}

export default Detail
