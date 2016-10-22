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
		secondaryHeight: 0,
		primaryText: '',
		secondaryText: ''
	}

	// componentDidMount() {
	// 	const { primaryText, secondaryText, url } = this.props
	// 	this.setState({
	// 		primaryText,
	// 		secondaryText
	// 	})
	// }

	render() {
		const { primaryText, secondaryText, url } = this.props
		// const { url } = this.props
		// const { primaryText, secondaryText } = this.state
		// const primaryText = 'TestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTest'
		// const secondaryText = 'TestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTest'
		// const url = 'https://placeholdit.imgix.net/~text?txtsize=14&txt=150%C3%97150&w=150&h=150'

		return (
			<ScrollView>
				<View style={styles.container}>
					<Image style={styles.image} source={{uri: url}}/>
					<View style={styles.primaryTextContainer}>
						<Text style={{ fontSize: 20 }}>รายละเอียดอาหาร</Text>
						<TextInput 
							style={{
								width: window.width - 32, 
								height: Math.max(80, this.state.primaryHeight),
								// flex: 1, 
								borderWidth: 1, 
								borderColor: '#ccc',
								marginTop: 8,
								padding: 8,
								fontSize: 16
							}}
							value={primaryText} 
							editable={false} 
							multiline={true}
							onContentSizeChange={(event) => {
								const height = event.nativeEvent.contentSize.height
			          console.log('onChange ' + primaryText, height)
			          this.setState({
			            primaryHeight: height,
			          })
			        }} />
					</View>
					<View style={styles.secondaryTextContainer}>
						<Text style={{ fontSize: 20 }}>รายละเอียดการเลี้ยง</Text>
						<TextInput 
							style={{
								width: window.width - 32, 
								height: Math.max(80, this.state.secondaryHeight), 
								borderWidth: 1, 
								borderColor: '#ccc',
								marginTop: 8,
								padding: 8,
								fontSize: 16
							}}
							value={secondaryText} 
							editable={false} 
							multiline={true}
							onContentSizeChange={(event) => {
								const height = event.nativeEvent.contentSize.height
			          this.setState({
			            secondaryHeight: height,
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
