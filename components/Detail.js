import React, { Component } from 'react'
import { 
	Text, 
	View, 
	StyleSheet,
	Image,
	Dimensions
} from 'react-native'
import * as Progress from 'react-native-progress'

const window = Dimensions.get('window')

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

const timeToHavestStyles = StyleSheet.create({
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

const statusStyles = StyleSheet.create({
	container: {
		width: window.width,
		borderStyle: 'solid',
		borderTopWidth: 1,
		borderTopColor: '#ccc',
		marginTop: 10,
		paddingTop: 6,
		flex: 1,
		flexDirection: 'column',
		justifyContent: 'center',
	},
	item: {
		flexDirection: 'row',
		justifyContent: 'center',
		margin: 12
	},

})

class Detail extends Component {

	_renderStatusItem = (status) => {
		return (
			<View style={statusStyles.container}>
				{
					status.map((item, index) => {
						const value = item.value / item.maxValue
						return (
							<View key={index} style={statusStyles.item}>
								<Image
									style={{width: 50, height: 50}}
				          source={item.icon}
				        />
								<View style={{marginTop: 19, marginLeft: 15}}>
									<Progress.Bar
										progress={value} 
										width={200}
										height={12}
										color={'#ccc'} />
									<View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
										<Text>{`0 ${item.symbol}`}</Text>
										<Text>{`${item.maxValue} ${item.symbol}`}</Text>
									</View>
								</View>
							</View>
						)
					})
				}
			</View>
		)
	}

	_renderTimeToHavest = (progressValue, maxValue) => {
		return (
			<View style={timeToHavestStyles.container}>
				<Text style={timeToHavestStyles.title}>ระยะเวลาเก็บแมลง</Text>
				<Progress.Bar 
					style={timeToHavestStyles.progressView}
					progress={progressValue} 
					width={260}
					height={16}
					borderRadius={8}
					color={'#ccc'} /> 							
				<View style={timeToHavestStyles.progressTag}>
					<Text> 0 วัน</Text>
					<Text>{`${maxValue} วัน`}</Text>
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
		// const temperatureValue = temperatureStatus / maxTemperatureStatus
		// const lightValue = lightStatus / maxLightStatus
		// const waterValue = waterStatus / maxWaterStatus

		const status = [
			{
				symbol: '°C',
				value: temperatureStatus,
				maxValue: maxTemperatureStatus,
				icon: require('../img/thermometer.png')
			},
			{
				symbol: 'lu',
				value: lightStatus,
				maxValue: maxLightStatus,
				icon: require('../img/sun.png')
			},
			{
				symbol: '%',
				value: waterStatus,
				maxValue: maxWaterStatus,
				icon: require('../img/raindrop.png')
			}
		]

		return (
			<View style={styles.container}>
				<Text style={styles.name}>{name}</Text>
				<Image style={styles.image} source={{uri: url}} />

				{this._renderTimeToHavest(timeToHavestValue, maxTimeToHavest)}

				{this._renderStatusItem(status)}
			</View>
		)
	}
}

export default Detail
