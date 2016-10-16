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
	Picker
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
		borderWidth: 1,
		borderRadius: 12
	},
	centerInputContainer: {
		flexDirection: 'column',
		justifyContent: 'flex-start',
		alignItems: 'center'
	},
	leftInputContainer: {
		flex: 1,
		flexDirection: 'column',
		justifyContent: 'flex-start',
		paddingLeft: 18
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
  	borderRadius: 6, 
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
		temperatureStatus: 0,
		lightStatus: 0,
		waterStatus: 0,
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
          avatarSource: source
        });
      }
    });
  }

  handleOnNameChange = (value) => {
  	this.setState({name: value})
  }

  handleOnTimeToHavestChange = (value) => {
  	this.setState({timeToHavest: value})
  }

  handleOnTemperatureChange = (value) => {
  	this.setState({temperatureStatus: value})
  } 

  handleOnWaterStatusChange = (value) => {
  	this.setState({waterStatus: value})
  }

  handleOnLightStatusChange = (value) => {
  	this.setState({lightStatus: value})
  }

	render() {

		return (
			<View style={styles.container}>
				<View style={styles.centerInputContainer}>
					<View style={{marginTop: 12}}>
						<TextInput 
							style={styles.name} 
							value={this.state.name}
							onChangeText={this.handleOnNameChange}
							placeholder="Name"
							placeholderTextColor="#ccc"/>
					</View>
					
					<View style={styles.photoInputContainer}>
		        <TouchableOpacity onPress={this.selectPhotoTapped}>
		          <View style={[styles.photo, styles.photoContainer, {marginBottom: 20}]}>
		          { 
		            this.state.imageSource === null ? <Text>Select a Photo</Text> :
		            <Image style={stylse.photo} source={this.state.imageSource} />
		          }
		          </View>
		        </TouchableOpacity>
		      </View>
				</View>
				
				<View style={styles.leftInputContainer}>	
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
				
			</View>
		)
	}
}

