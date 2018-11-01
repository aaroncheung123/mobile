import React from 'react';
import NavigationBar from 'react-native-navbar';
import {TouchableOpacity, Styles, PassStyles, VenueTotalStyles, ShareStyles} from '../../../assets/styles/styles';
import {Switch,View, Button, Text, AppRegistry, StyleSheet, Animated, Image, Easing, Dimensions} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

export default class Events extends React.Component {

	constructor () {
	  super();
		this.state = {
	 		switchValue: false,
		}
	}

	toggleSwitch = (value) => {
		this.setState({switchValue: value})
	}

	render() {
		return (
			<View style={STYLES.container}>

				<View>
					<Text style={STYLES.title}>
						Events
					</Text>
				</View>

				<View style={STYLES.toggleContainer}>
					<Text style={STYLES.toggleText}>Venue</Text>

						<Switch
							tintColor = 'orange'
							thumbTintColor = 'white'
							style = {STYLES.switchStyle}
							onValueChange = {this.toggleSwitch}
							value = {this.state.switchValue}/>

					<Text style={STYLES.toggleText}>Date</Text>

				</View>

				<View style={STYLES.eventsContainer}>

				</View>


			</View>
		);
	}
}


const STYLES = {
  container: {
		flex: 1
  },
	title: {
		color: 'white',
		minWidth: '100%',
		fontSize: 35,
		fontWeight: 'bold',
		textAlign: 'center',
		alignItems: 'center',
		justifyContent: 'center',
		padding: 20,
		opacity: .95,
		backgroundColor: 'rgba(0, 0, 0, 0.6)'
	},
	toggleContainer: {
		flex: 1,
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
		height: 30,
		marginVertical: 20
	},
	eventsContainer: {
		flex: 9
	},
	toggleWidgets:{
		height:30,

		margin: 15,
		borderRadius: 20,
		backgroundColor: 'orange'
	},
	toggleText: {
		color: 'white',
		fontSize: 24
	},
	switchStyle: {
		marginHorizontal: 10,
		//transform: [{ scaleX: 1.2 }, { scaleY: 1.2 }]
	}
}
