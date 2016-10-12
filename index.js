import React, { Component } from 'react'
// import * as firebase from 'firebase'
import { 
	StyleSheet,
	Navigator,
	TouchableHighlight,
	Text,
	View
} from 'react-native'
import Main from './components/Main'
import Detail from './components/Detail'

// Initialize Firebase
// const firebaseConfig = {
//   databaseURL: "https://insectapp-fd327.firebaseio.com/",
// };
// const firebaseApp = firebase.initializeApp(firebaseConfig);

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

const renderNavigationBar = () => {
	return (
		<Navigator.NavigationBar
    	routeMapper={{
     		LeftButton: (route, navigator, index, navState) => {
			    if (route.index === 0) {
			      return null;
			    } else {
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
      	RightButton: (route, navigator, index, navState) => { },
       	Title: (route, navigator, index, navState) => { 
     			return (<Text style={styles.title}>{route.title}</Text>); 
     		}
     	}}
    	style={styles.container} />
	)
}

class App extends Component {

	_renderScene = (route, navigator, routes) => {
	  switch (route.pathname) {
	    case 'main':
	      return (
	      	<Main 
	      		onPressImage={(passProps) => {
	      			const routeData = {...routes[1], props: passProps}
	      			navigator.push(routeData)
	    			}} />
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
	  }
	}

	render() {
		const defaultPassProps = {
			name: 'Insec',
			timeToHavest: 0,
			maxTimeToHavest: 30,
			temperatureStatus: 0,
			maxTemperatureStatus: 50,
			lightStatus: 0,
			maxLightStatus: 100,
			waterStatus: 0,
			maxWaterStatus: 100,
			url: 'https://placeholdit.imgix.net/~text?txtsize=14&txt=150%C3%97150&w=150&h=150'
		}

		const routes = [
    	{title: 'Insect', pathname: 'main', index: 0, props: defaultPassProps},
    	{title: 'Detail', pathname: 'detail', index: 1, props: defaultPassProps},
		]

	  return (
	    <Navigator
	      initialRoute={routes[0]}
	      initialRouteStack={routes}
	      renderScene={(route, navigator) => 
	      	this._renderScene(route, navigator, routes)
	      }
	      navigationBar={renderNavigationBar()}
		  	style={{paddingTop: 60}}
	    />
	  )
	}
}

export default App












