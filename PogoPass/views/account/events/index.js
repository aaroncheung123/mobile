import React from 'react';
import NavigationBar from 'react-native-navbar';
import {TouchableOpacity, Styles, PassStyles, VenueTotalStyles, ShareStyles} from '../../../assets/styles/styles';
import {ScrollView, Switch,View, Button, Text, AppRegistry, StyleSheet, Animated, Image, Easing, Dimensions} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import VenueEventCard from '../../../components/events/venue-event-card.js'

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
					<ScrollView>
						<VenueEventCard/>
						<VenueEventCard/>
						<VenueEventCard/>
						<VenueEventCard/>
						<View style={STYLES.transparentFiller}></View>
					</ScrollView>

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
		fontSize: 25,
		fontWeight: 'bold',
		textAlign: 'center',
		alignItems: 'center',
		justifyContent: 'center',
		padding: 10,
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
		flex: 9,
		justifyContent: 'flex-start',
		alignItems: 'center'
	},
	toggleWidgets:{
		height:30,

		margin: 15,
		borderRadius: 20,
		backgroundColor: 'orange'
	},
	toggleText: {
		color: 'white',
		fontSize: 18
	},
	switchStyle: {
		marginHorizontal: 10,
	},
	transparentFiller: {
			height: 250,
	}
}
