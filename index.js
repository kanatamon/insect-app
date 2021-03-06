import React, { Component } from 'react'
import * as firebase from 'firebase'
import { 
	StyleSheet,
	Navigator,
	TouchableHighlight,
	Text,
	View,
	Platform
} from 'react-native'
import RNFetchBlob from 'react-native-fetch-blob'
import Main from './components/Main'
import Detail from './components/Detail'
import MoreDetail from './components/MoreDetail'
import Add from './components/Add'
// import PhotoInput from './components/PhotoInput'

const fs = RNFetchBlob.fs
const Blob = RNFetchBlob.polyfill.Blob

window.XMLHttpRequest = RNFetchBlob.polyfill.XMLHttpRequest
window.Blob = Blob

const dirs = RNFetchBlob.fs.dirs
const prefix = ((Platform.OS === 'android') ? 'file://' : '')
const newImageName = `image-from-react-native-${Platform.OS}-${new Date()}.png`

// Initialize Firebase
const firebaseConfig = {
  databaseURL: "https://test-db-62fc0.firebaseio.com/",
  storageBucket: "gs://test-db-62fc0.appspot.com",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

const styles = StyleSheet.create({
	title: {
		color:'#fff',
    textAlign:'center',
    fontWeight:'bold',
    flex: 1,
    marginTop: 6,
    fontSize: 16
	},
	textBtn: {
		color: '#fff', 
		fontSize: 24,
		marginLeft: 6,
	},
  container: {
		backgroundColor:'#81c04d',
		height: 60
  },
  backBtn: {
  	width: 50,
  	height: 50
  }
})

const NavigationBar = ({AddRoute, MoreDetailRoute, onSendPress}) => {
	return (
		<Navigator.NavigationBar
    	routeMapper={{
     		LeftButton: (route, navigator, index, navState) => {
			    if (route.pathname !== 'main') {
			      return (
			        <TouchableHighlight 
			        	style={styles.backBtn}
			        	underlayColor="rgba(0,0,0,0)"
			        	onPress={() => navigator.pop()}
		        	>
			          <Text style={styles.textBtn}>{'<'}</Text>
			        </TouchableHighlight>
			      );
			    }
				},
      	RightButton: (route, navigator, index, navState) => { 
      		
      		switch(route.pathname) {
      			case 'main':
      				return (
			      		<TouchableHighlight 
				        	style={styles.backBtn}
				        	underlayColor="rgba(0,0,0,0)"
				        	onPress={() => navigator.push(AddRoute)}
		        		>
				          <Text style={styles.textBtn}>+</Text>
				        </TouchableHighlight>
		      		)
	      		case 'detail':
	      			let dataRoute = {
	      				...MoreDetailRoute, 
	      				title: route.props.name,
	      				props: route.props
	      			}
	      			return (
				    		<TouchableHighlight 
				        	style={styles.backBtn}
				        	underlayColor="rgba(0,0,0,0)"
				        	onPress={() => navigator.push(dataRoute)}
		        		>
				          <Text style={styles.textBtn}>?</Text>
				        </TouchableHighlight>
			    		)
		    		case 'add':
	      			return (
				    		<TouchableHighlight 
				        	style={styles.backBtn}
				        	underlayColor="rgba(0,0,0,0)"
				        	onPress={() => {
				        		onSendPress()
				        		navigator.pop()
				        	}}
		        		>
				          <Text style={styles.textBtn, {marginTop: 6, fontSize: 16, color: '#fff'}}>send</Text>
				        </TouchableHighlight>
			    		)
      		}
      	},
       	Title: (route, navigator, index, navState) => { 
       		return (<Text style={styles.title}>{route.title}</Text>)
     		}
     	}}
    	style={styles.container} />
	)
}

class App extends Component {

	state = {
		insects: [],
		insectInput: {}
	}

	constructor(props) {
	  super(props)
		this.itemsRef = firebaseApp.database().ref()
		this.storageRef = firebase.storage().ref()
	}

	listenForItems(itemsRef) {
    itemsRef.on('value', (snap) => {
    	
    	// get children as an array
      var items = [];
      snap.forEach((child) => {
        items.push(child.val());
      });

      this.setState({ insects: items })
    })
  }

  addInsect = () => {
    // this.itemsRef.push(this.state.insectInput)
    // console.log('add an insect', this.state.insectInput)
    const { path } = this.state.insectInput

    this.uploadImage(path, newImageName, (downloadURL) => {
    	const data = {
    		...this.state.insectInput,
    		url: downloadURL
    	}
    	delete data.path
    	this.itemsRef.push(data)
    })
  }

  // loadTestFile = () => {
  // 	RNFetchBlob
		//   .config({ fileCache : true, appendExt : 'png' })
		//   .fetch('GET', 'https://avatars0.githubusercontent.com/u/5063785?v=3&s=460')
		//   .then((resp) => {
		//     testFile = resp.path()
		//     // console.log('image path', testFile)
		//     this.setState({
		//     	testFile:  testFile
		//     })
		//     this.uploadImage(testFile, testImageName)
	 //    })
  // }

  uploadImage = (imageFile, imageName, callback) => {
  	let rnfbURI = RNFetchBlob.wrap(imageFile)
	  // create Blob from file path
	  Blob
	    .build(rnfbURI, { type : 'image/png;'})
	    .then((blob) => {
	      // upload image using Firebase SDK
	      firebase.storage()
	        .ref()
	        .child(imageName)
	        .put(blob, { contentType : 'image/png' })
	        .then((snapshot) => {
	        	const downloadURL = snapshot.a.downloadURLs[0]
	        	callback(downloadURL)
	          blob.close()
	        })
	    })
  }

  handleOnInsectInputChange = (data) => {
  	this.setState({ insectInput: data })
  	console.log('add an insect', this.state.insectInput)
  }

  componentDidMount() {
    this.listenForItems(this.itemsRef)
    // this.loadTestFile()
  }

  handleOnPressImage = (routeToGO, navigator, passProps) => {
  	const routeData = {...routeToGO, props: passProps}
    navigator.push(routeData)
  }

	_renderScene = (route, navigator, routes) => {
	  switch (route.pathname) {
	    case 'main':
	      return (
	      	<Main 
						onPressImage={(passProps) => {this.handleOnPressImage(routes[1], navigator, passProps)}} 
						insects={this.state.insects} />
	  		)
	    case 'detail':
	      return (
	      	<Detail 
	      		name={route.props.name} 
	      		timeToHavest={route.props.timeToHavest} 
	      		maxTimeToHavest={route.props.maxTimeToHavest} 
	      		
	      		temperatureStatus={route.props.temperatureStatus} 
	      		maxTemperatureStatus={route.props.maxTemperatureStatus} 
	      		
	      		lightStatus={route.props.lightStatus} 
	      		maxLightStatus={route.props.maxLightStatus} 
	      		
	      		waterStatus={route.props.waterStatus} 
	      		maxWaterStatus={route.props.maxWaterStatus} 
	      		
	      		url={route.props.url} />
	    	)
    	case 'add':
    		return (
    			<Add 
    				onInputChange={this.handleOnInsectInputChange} 
    				onTakePhoto={(imageFile) => {
    					this.uploadImage(imageFile, testImageName) 
    				}} />
  			)
			case 'moredetail':
				return (
					<MoreDetail
						name={route.props.name} 
	      		timeToHavest={route.props.timeToHavest} 
	      		maxTimeToHavest={route.props.maxTimeToHavest} 
	      		
	      		temperatureStatus={route.props.temperatureStatus} 
	      		maxTemperatureStatus={route.props.maxTemperatureStatus} 
	      		
	      		lightStatus={route.props.lightStatus} 
	      		maxLightStatus={route.props.maxLightStatus} 
	      		
	      		waterStatus={route.props.waterStatus} 
	      		maxWaterStatus={route.props.maxWaterStatus} 
	      		
	      		url={route.props.url} 
	      		primaryText={route.props.primaryText}
	      		secondaryText={route.props.secondaryText} />
				)
	  }
	}

	render() {
	
		const routes = [
    	{title: 'Insect', pathname: 'main', index: 0, props: { }},
    	{title: 'Detail', pathname: 'detail', index: 1, props: { }},
    	{title: 'Add', pathname: 'add', index: 2, props: { }},
    	{title: 'MoreDetail', pathname: 'moredetail', index: 3, props: { }}
		]

	  return (
	    <Navigator
	      initialRoute={routes[0]}
	      initialRouteStack={routes}
	      renderScene={(route, navigator) => 
	      	this._renderScene(route, navigator, routes)
	      }
	      navigationBar={NavigationBar({
	      	AddRoute: routes[2],
	      	MoreDetailRoute: routes[3],
	      	onSendPress: this.addInsect
	      })}
		  	style={{paddingTop: 60}}
	    />
	  )
	}
}

export default App












