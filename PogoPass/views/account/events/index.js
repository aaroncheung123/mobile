import React from 'react';
import NavigationBar from 'react-native-navbar';
import {Styles, PassStyles, VenueTotalStyles, ShareStyles} from '../../../assets/styles/styles';
import {View, Button, Text, AppRegistry, StyleSheet, Animated, Image, Easing, Dimensions} from 'react-native';

export default class Events extends React.Component {

	constructor () {
	  super()
	  this.springValue = new Animated.Value(0)
	}

	spring () {
	  this.springValue.setValue(0)
	  Animated.spring(
	    this.springValue,
	    {
	      toValue: 450,
	      friction: 6
	    }
	  ).start()
	}

	render() {
		return (
			<View style={STYLES.container1}>
			  <Text onPress={this.spring.bind(this)}>
					TEST BUTTON
				</Text>


				<Animated.View style={[STYLES.springContainer, {height: this.springValue}]}>
	      	<Text style={STYLES.innerSpringContainer}>Hello World</Text>
	      </Animated.View>
			</View>
		);
	}
}


const STYLES = {
  container1: {
		flex: 1,
		bottom: 0
  },
	springContainer: {
		flex: 1,
		position: 'absolute',
		bottom: 0,
		width: '100%',
		backgroundColor: '#cccccc',
		opacity: .95,
		borderRadius: 30,
		justifyContent: 'center',
		alignItems: 'center'
	},
	innerSpringContainer: {
		flex: 1
	}
}
