import React, { Component } from 'react'
import { 
	StyleSheet,
	Navigator,
	TouchableHighlight,
	Text,
	View
} from 'react-native'
import Main from './components/Main'
import Detail from './components/Detail'

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

const renderScene = (route, navigator, routes) => {
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
      		time={route.props.time} 
      		temperature={route.props.temperature} 
      		humanity={route.props.humanity} 
      		url={route.props.url} />
    	)
  }
}
//<Detail name={route.props.name} time={route.props.time} temperature={route.props.temperature} humanity={route.props.humanity} />

const App = () => {
	const defaultPassProps = {
		name: 'Insec',
		time: 0,
		temperature: 0,
		humanity: 0
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
      	renderScene(route, navigator, routes)
      }
      navigationBar={renderNavigationBar()}
	  	style={{paddingTop: 60}}
    />
  )
}

export default App











