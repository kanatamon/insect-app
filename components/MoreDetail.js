import React, { Component } from 'react'
import { 
	Text, 
	View,
	Image,
	StyleSheet,
	Dimensions
} from 'react-native'

const window = Dimensions.get('window')

const styles = {
	body: StyleSheet.create({
		container: {
			backgroundColor: '#fff',
			height: window.height,
			flexDirection: 'column',
      justifyContent: 'flex-start',		
		},
		mainText: {
			width: window.width - 36,
			minHeight: 240,
			borderColor: '#ccc',
	    borderWidth: 1,
	    borderRadius: 6,
	    padding: 12,
	    marginLeft: 18,
	    marginRight: 18,
	    marginTop: 18,
		}
	}),
	top: StyleSheet.create({
		container: {
		 	flexDirection: 'row',
	    justifyContent: 'space-between',
	    marginLeft: 18,
	    marginRight: 18,
	    marginTop: 24,
	    height: 120
		},
		image: {
			width: 120,
			height: 120,
		},
		text: {
			width: 200,
			height: 120,
			borderColor: '#ccc',
	    borderWidth: 1,
	    borderRadius: 6,
	    padding: 12
		}
	})
}

class MoreDetail extends Component {
	render() {
		const { primaryText, secondaryText, url } = this.props
		// const primaryText = 'TestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTest'
		// const secondaryText = 'TestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTest'
		// const url = 'https://placeholdit.imgix.net/~text?txtsize=14&txt=150%C3%97150&w=150&h=150'

		return (
			<View style={styles.body.container}>

				<View style={styles.top.container}>
					<Image style={styles.top.image} source={{uri: url}}/>
					<Text style={styles.top.text}>{secondaryText}</Text>
				</View>
				
				<Text style={styles.body.mainText}>{primaryText}</Text>	
				
			</View>
		);
	}
}

export default MoreDetail
