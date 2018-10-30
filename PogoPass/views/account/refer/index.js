import React from 'react';
import NavigationBar from 'react-native-navbar';
import {Styles, PassStyles, VenueTotalStyles, ShareStyles} from '../../../assets/styles/styles';
import {View, Button, Text, AppRegistry, StyleSheet, Animated, Image, Easing} from 'react-native';


export default class Refer extends React.Component {

	constructor () {
	  super()
	  this.animatedValue = new Animated.Value(0)
	}

	componentDidMount () {
	  this.animate()
	}
	animate () {
	  //this.animatedValue.setValue(0)
	  Animated.timing(
	    this.animatedValue,
	    {
	      toValue: 1,
	      duration: 300,
	      easing: Easing.linear
	    }
	  ).start(() => this.animate())
	}

	render() {
		const height = this.animatedValue.interpolate({
			inputRange: [0, 1],
			outputRange: [0, 400]
		})

	  return (
			<View style={STYLES.container}>

				<Animated.View style={{
					height,
					position: 'absolute',
			  	bottom:0,
					flex: 1,
					width: '100%',
					backgroundColor: '#cccccc',
					borderRadius: 20,
					opacity: .95}} />


	    </View>
	  )
	}
}


const STYLES = {
  container: {
    flex: 1,
		width: '100%'
  },
	slidePanel: {
		height: 30,
		width: 40
	}
}

// <Animated.View style={{
// 		height: 100,
// 		width: 100,
// 		flex: 1,
// 		justifyContent: 'flex-end',
// 		alignItems: 'flex-end'}} />
