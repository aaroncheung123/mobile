import React from 'react';
import NavigationBar from 'react-native-navbar';
import {Styles, PassStyles, VenueTotalStyles, ShareStyles} from '../../../assets/styles/styles';
import {View, Button, Text, AppRegistry, StyleSheet, Animated, Image, Easing, Dimensions} from 'react-native';

const { height, width } = Dimensions.get("window");

export default class Events extends React.Component {

	constructor () {
	  super()
	  this.springValue = new Animated.Value(0.1)
	}

	spring () {
	  this.springValue.setValue(0.1)
	  Animated.spring(
	    this.springValue,
	    {
	      toValue: 40,
	      friction: 6
	    }
	  ).start()
	}

	render() {
		return (
			<View style={STYLES.container}>
			  <Text
			    style={{marginBottom: 100}}
			    onPress={this.spring.bind(this)}>Spring</Text>
					<Animated.View
		        style={{
							position: 'absolute',
					  	bottom:0,
							transform: [{scale: this.springValue}],
		          width: '100%',
		          backgroundColor: '#cccccc',
							opacity: .95}}>
		        <Text style={{color: 'white'}}>Hello World</Text>
		      </Animated.View>

			</View>
		);
	}
}


const STYLES = {
  container: {
    flex: 1,
		height: 608,
		width: '100%'
  }
}

// <Animated.Image
// 	style={{ width: 227, height: 200, transform: [{scale: this.springValue}] }}
// 	source={{uri: 'https://s3.amazonaws.com/media-p.slid.es/uploads/alexanderfarennikov/images/1198519/reactjs.png'}}/>
