import React from 'react';
import NavigationBar from 'react-native-navbar';
import {ScrollView, Text, View} from 'react-native';
import VenueEventCard from './venue-event-card.js'

export default class Venue extends React.Component {

	constructor (props) {
	  super(props);

	  this.state = {
	  	venues: []
	  }

	  this.accountLength = props.accounts.length
	}

	componentDidMount() {
		this.loadVenues();
	}

	componentDidUpdate(prevProps, nextState) {
		if (this.accountLength != this.props.accounts.length) {
			this.accountLength = this.props.accounts.length;
			this.loadVenues();
		}
	}


	loadVenues() {

		if (this.venueApi) this.venueApi.abort();

		let serviceApis = [];
		let now = new Date();

		this.props.accounts.forEach(account => {
			account.account_services.forEach(account_service => {
				if (GlobalUtil.convertMysqlToDateRaw(account_service.valid_start) < now && GlobalUtil.convertMysqlToDateRaw(account_service.valid_end) > now)
				{
					serviceApis.push(account_service.service_id);
				}
			})
		})
		serviceApis = serviceApis.filter((v, i, a) => a.indexOf(v) === i); 

		EliteAPI.EVN.Venue.search({visible: 1, service_ids: serviceApis.join(','), take: 1000, include_classes: 'sitefile,event,availability,timeblock'}, (success) => {
			console.log(success.data.venues.length, 'test');
			let venues = success.data.venues.filter(venue => {
				if (venue.events && 
					venue.events.length > 0 && 
					venue.events.filter(x => GlobalUtil.convertMysqlToDateRaw(x.start) > now).length > 0) return true
				else return false
			})

			this.setState({venues: venues});
		}, f => console.log(f)) 
	}


	render() {

		let venueCards = this.state.venues.map(venue => <VenueEventCard key={venue.venue_id} venue={venue} accounts={this.props.accounts}/> )

		return (
			<View style={STYLES.eventsContainer}>
				<ScrollView>
					<View style={STYLES.filler}>
						{venueCards}
					</View>
				</ScrollView>
			</View>
		);
	}
}


const STYLES = {
	eventsContainer: {
		justifyContent: 'flex-start',
		alignItems: 'center',
        marginTop: 20
	},
	filler: {
		marginBottom: 450
	}
}
