import React, { Component } from 'react'
import { 
	Text, 
	View,
	Image,
	StyleSheet,
	Dimensions,
	ScrollView,
	TextInput
} from 'react-native'

const window = Dimensions.get('window')

const styles = StyleSheet.create({
	container: {
		backgroundColor: '#fff',
		flexDirection: 'column',
	  justifyContent: 'flex-start',
	  alignItems: 'center'		
	},
	primaryTextContainer: {
		marginLeft: 18,
    marginRight: 18,
    marginTop: 28,
	},
	primaryText: {
		width: window.width - 36,
		borderColor: '#000',
    borderWidth: 1,
    padding: 12,
    marginTop: 6,
    fontSize: 14
	},
	secondaryTextContainer: {
		marginLeft: 18,
    marginRight: 18,
    marginTop: 18,
    marginBottom: 120
	},
	secondaryText: {
		width: window.width - 36,
		height: 120,
		borderColor: '#ccc',
    borderWidth: 1,
    padding: 12,
    marginTop: 6,
	},
	image: {
		marginTop: 40,
		width: 150,
		height: 150,
	}
})

class MoreDetail extends Component {

	state = {
		primaryHeight: 0,
		secondaryHeight: 0
	}

	render() {
		const { primaryText, secondaryText, url } = this.props
		// const primaryText = 'TestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTest'
		// const secondaryText = 'TestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTest'
		// const url = 'https://placeholdit.imgix.net/~text?txtsize=14&txt=150%C3%97150&w=150&h=150'

		return (
			<ScrollView>
				<View style={styles.container}>
					<Image style={styles.image} source={{uri: url}}/>
					<View style={styles.primaryTextContainer}>
						<Text>รายละเอียดอาหาร</Text>
						<TextInput 
							style={{
								width: window.width - 32, 
								height: Math.max(80, this.state.primaryHeight), 
								borderWidth: 1, 
								borderColor: '#ccc',
								marginTop: 8,
								padding: 8
							}}
							value={primaryText} 
							editable={false} 
							multiline={true}
							onChange={(event) => {
			          this.setState({
			            primaryHeight: event.nativeEvent.contentSize.height,
			          })
			        }} />
					</View>
					<View style={styles.secondaryTextContainer}>
						<Text>รายละเอียดการเลี้ยง</Text>
						<TextInput 
							style={{
								width: window.width - 32, 
								height: Math.max(80, this.state.secondaryHeight), 
								borderWidth: 1, 
								borderColor: '#ccc',
								marginTop: 8,
								padding: 8
							}}
							value={secondaryText} 
							editable={false} 
							multiline={true}
							onChange={(event) => {
			          this.setState({
			            secondaryHeight: event.nativeEvent.contentSize.height,
			          })
			        }} />
					</View>
				</View>
			</ScrollView>
		);
	}
}

export default MoreDetail

// {primaryText}
