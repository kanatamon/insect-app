import React, { Component } from 'react'
import { 
	StyleSheet,
  Text,
  View,
  PixelRatio,
  TouchableOpacity,
  Image,
  Platform,
	Dimensions,
	TextInput,
	Picker,
	ScrollView,
	TouchableHighlight
} from 'react-native'
import ImagePicker from 'react-native-image-picker'

const window = Dimensions.get('window')

const styles = StyleSheet.create({
	container: {
	 	backgroundColor: '#fff',
	 	flex: 1,
	 	flexDirection: 'column'
	},
	name: {
		textAlign: 'center',
		paddingLeft: 4,
		paddingRight: 4,
		fontWeight: 'bold',
		fontSize: 18,
		minWidth: 180,
		height: 42, 
		borderColor: '#ccc', 
		borderWidth: 1
	},
	nameAndPhotoInputContainer: {
		flexDirection: 'column',
		justifyContent: 'flex-start',
		alignItems: 'center'
	},
	statusInputContainer: {
		flex: 1,
		flexDirection: 'column',
		justifyContent: 'flex-start',
		paddingLeft: 18
	},
	descriptionInputContainer: {
		flexDirection: 'row',
		justifyContent: 'center',
		marginTop: 16	
	},
	photoInputContainer: {
		backgroundColor: '#ccc',
		width: 150,
		height: 150,
		margin: 15
	},
	photoContainer: {
    borderColor: '#ccc',
    borderWidth: 1 / PixelRatio.get(),
    justifyContent: 'center',
    alignItems: 'center'
  },
  photo: {
    width: 150,
    height: 150
  },
  textInput: {
  	height: 30, 
  	fontSize: 16, 
  	marginLeft: 12, 
  	padding: 4, 
  	borderWidth: 1,  
  	borderColor: '#ccc'
  }
})

const StatusInput = ({name, handleOnChange}) => {
	return (
		<View style={{flexDirection: 'row', marginBottom: 12}}>
			<View style={{width: 160}}>
				<Text style={{fontSize: 16, textAlign: 'right', marginTop: 2}}>{name}</Text>
			</View>
			<View style={{width: 120}}>
				<TextInput 
					style={styles.textInput}
					keyboardType={'numeric'}
					onChangeText={handleOnChange} />
			</View>
		</View>		
	)
}

export default class Add extends Component {

	state = {
    imageSource: null,
    name: '',
    timeToHavest: 0,
    maxTimeToHavest: 30,
    maxTemperatureStatus: 50,
    maxLightStatus: 100,
    maxWaterStatus: 100,
		temperatureStatus: 0,
		lightStatus: 0,
		waterStatus: 0,
		secondaryText: '',
		secondaryHeight: 0,
		primaryText: '',
		primaryHeight: 0,
		path: ''
  }

  selectPhotoTapped = () => {
    const options = {
      quality: 1.0,
      maxWidth: 500,
      maxHeight: 500,
      storageOptions: {
        skipBackup: true
      }
    };

    ImagePicker.showImagePicker(options, (response) => {
      console.log('Response = ', response);

      if (response.didCancel) {
        console.log('User cancelled photo picker');
      }
      else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      }
      else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      }
      else {
        var source;

        // You can display the image using either:
        //source = {uri: 'data:image/jpeg;base64,' + response.data, isStatic: true};

        //Or:
        if (Platform.OS === 'android') {
          source = {uri: response.uri, isStatic: true};
        } else {
          source = {uri: response.uri.replace('file://', ''), isStatic: true};
        }

        this.setState({
        	imageSource: source, 
        	path: source.uri
        })

        this.handleOnInputChange(this.state)
        // this.props.onTakePhoto(source.uri)
      }
    });
  }

  handleOnInputChange = () => {
  	const data = {...this.state}
  	delete data.imageSource
  	delete data.primaryHeight
  	delete data.secondaryHeight

		this.props.onInputChange(data)
  }

  handleOnNameChange = (value) => {
  	this.setState({name: value})
  	this.handleOnInputChange()
  	// console.log('input changing...')
  }

  handleOnTimeToHavestChange = (value) => {
  	this.setState({timeToHavest: Number(value)})
  	this.handleOnInputChange()
  }

  handleOnTemperatureChange = (value) => {
  	this.setState({temperatureStatus: Number(value)})
  	this.handleOnInputChange()
  } 

  handleOnWaterStatusChange = (value) => {
  	this.setState({waterStatus: Number(value)})
  	this.handleOnInputChange()
  }

  handleOnLightStatusChange = (value) => {
  	this.setState({lightStatus: Number(value)})
  	this.handleOnInputChange()
  }

  componentDidMount() {
  	this.handleOnInputChange()
  }

	render() {

		return (
			<ScrollView>
				<View style={styles.container}>
					<View style={styles.nameAndPhotoInputContainer}>
						<View style={{marginTop: 12}}>
							<TextInput 
								style={styles.name} 
								value={this.state.name}
								onChangeText={this.handleOnNameChange}
								placeholder="ชื่อ"
								placeholderTextColor="#ccc"/>
						</View>
						
						<View style={styles.photoInputContainer}>
			        <TouchableOpacity onPress={this.selectPhotoTapped}>
			          <View style={[styles.photo, styles.photoContainer, {marginBottom: 20}]}>
			          { 
			            this.state.imageSource === null ? <Text>Select a Photo</Text> :
			            <Image style={styles.photo} source={this.state.imageSource} />
			          }
			          </View>
			        </TouchableOpacity>
			      </View>
					</View>
					
					<View style={styles.statusInputContainer, {marginTop: 16}}>	
						<StatusInput 
							name={"ระยะเวลาเก็บแมลง"}
							handleOnChange={this.handleOnTimeToHavestChange} />
						<StatusInput 
							name={"อุณหภูมิ"}
							handleOnChange={this.handleOnTemperatureChange} />
						<StatusInput 
							name={"น้ำ"}
							handleOnChange={this.handleOnWaterStatusChange} />
						<StatusInput 
							name={"แสงแดด"}
							handleOnChange={this.handleOnLightStatusChange} />
					</View> 

					<View style={styles.descriptionInputContainer}>
						<View>
							<Text style={{fontSize: 16, marginBottom: 4}}>รายละเอียดอาหาร</Text>
							<TextInput 
								style={{
									width: window.width - 32, 
									height: Math.max(80, this.state.primaryHeight), 
									borderWidth: 1, 
									borderColor: '#ccc',
									padding: 8
								}}
								multiline={true}
								onChange={(event) => {
				          this.setState({
				            primaryText: event.nativeEvent.text,
				            primaryHeight: event.nativeEvent.contentSize.height,
				          })
				          this.handleOnInputChange()
				        }}
        				value={this.state.primaryText} >
							</TextInput>
							
							<Text style={{fontSize: 16, marginTop: 16, marginBottom: 4}}>รายละเอียดการเลี้ยง</Text>
							<TextInput 
								style={{
									width: window.width - 32, 
									height: Math.max(140, this.state.secondaryHeight), 
									borderWidth: 1, 
									borderColor: '#ccc',
									padding: 8,
									marginBottom: 120
								}}
								multiline={true}
								onChange={(event) => {
				          this.setState({
				            secondaryText: event.nativeEvent.text,
				            secondaryHeight: event.nativeEvent.contentSize.height,
				          })
				          this.handleOnInputChange()
				        }}
        				value={this.state.secondaryText} >
							</TextInput>
						</View>
					</View>

				</View>
			</ScrollView>
		)
	}
}












