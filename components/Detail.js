import React, { Component } from 'react'
import { 
	Text, 
	View, 
	StyleSheet,
	Image,
	Dimensions
} from 'react-native'
import * as Progress from 'react-native-progress'

const window = Dimensions.get('window');

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
    alignItems: 'center',
    backgroundColor: '#fff'
	},
	image: {
		backgroundColor: '#ccc',
		width: 150,
		height: 150,
		padding: 6,
		margin: 15
	},
	lifeTime: {
		flexDirection: 'row'
	}
})

const havestTime = StyleSheet.create({
	container: {

	},
	title: {
		textAlign: 'center'
	},
	progressTag: {
		flexDirection: 'row',
		justifyContent: 'space-between'
	},
	progressView: {
		marginTop: 10,
		marginBottom: 5
	}
})

const status = StyleSheet.create({
	container: {
		width: window.width,
		borderStyle: 'solid',
		borderTopWidth: 1,
		borderTopColor: '#ccc',
		marginTop: 10,
		paddingTop: 6,
		flex: 1,
		flexDirection: 'column',
		justifyContent: 'center'
	},
	item: {
		flexDirection: 'row',
		justifyContent: 'center',
		margin: 12
	},

})

class Detail extends Component {

	renderStatusItem = (value, key) => {
		return (
			<View key={key} style={status.item}>
				{/*<View style={{width: 50, height: 50, backgroundColor: '#ccc'}} />*/}
				<Image
					style={{width: 50, height: 50}}
          source={require('../img/favicon.png')}
        />
				<View>
					<Progress.Bar
						style={{marginTop: 19, marginLeft: 15}} 
						progress={value} 
						width={200}
						height={12}
						color={'#ccc'} />
				</View>
			</View>
		)
	}

	renderHavestTime = (value) => {
		return (
			<View style={havestTime.container}>
				<Text style={havestTime.title}>ระยะเวลาเก็บแมลง</Text>
				<Progress.Bar 
					style={havestTime.progressView}
					progress={value} 
					width={260}
					height={16}
					borderRadius={8}
					color={'#ccc'} /> 							
				<View style={havestTime.progressTag}>
					<Text> 0 วัน</Text>
					<Text> 30 วัน</Text>
				</View>
			</View>
		)
	}
	
	render() {
		const { 
			name, 
			timeToHavest, maxTimeToHavest, 
			temperatureStatus, maxTemperatureStatus,
			lightStatus, maxLightStatus, 
			waterStatus, maxWaterStatus,
			url 
		} = this.props

		const timeToHavestValue = timeToHavest / maxTimeToHavest
		const temperatureValue = temperatureStatus / maxTemperatureStatus
		const lightValue = lightStatus / maxLightStatus
		const waterValue = waterStatus / maxWaterStatus

		const statusValues = [temperatureValue, lightValue, waterValue]

		return (
			<View style={styles.container}>
				<Text style={styles.name}>{name}</Text>
				<Image style={styles.image} source={{uri: url}} />

				{this.renderHavestTime(timeToHavestValue)}

				<View style={status.container}>
					{statusValues.map((value, index) => this.renderStatusItem(value, index))}
				</View>
			</View>
		)
	}
}

export default Detail
