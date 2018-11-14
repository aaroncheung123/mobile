import React from 'react';
import NavigationBar from 'react-native-navbar';
import {ScrollView, Text, View} from 'react-native';
import VenueEventCard from './venue-event-card.js'

export default class Venue extends React.Component {

	constructor () {
	  super();
	}

	render() {
		return (
				<View style={STYLES.eventsContainer}>
					<ScrollView>
						<View style={STYLES.filler}>
							<VenueEventCard/>
							<VenueEventCard/>
							<VenueEventCard/>
							<VenueEventCard/>
						</View>
					</ScrollView>
				</View>
		);
	}
}


const STYLES = {
	eventsContainer: {
		justifyContent: 'flex-start',
		alignItems: 'center'
	},
	filler: {
		marginBottom: 450
	}
}
