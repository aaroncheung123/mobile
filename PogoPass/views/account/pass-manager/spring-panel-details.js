import React from 'react';
import {View, Text, ScrollView, TouchableOpacity, Dimensions} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import VenueCard from './venue-card.js';

export default class SpringPanelDetails extends React.Component {

    render() {

    	let expirationDate = GlobalUtil.convertMysqlToDate(this.props.account.expire_at).formatDate('n/d/Y');

		let now = new Date();



		let venueServices = {}
		this.props.account.account_services.forEach((account_service) => {
			account_service.venue_service_services.forEach((venue_service_service) => {
				venueServices[venue_service_service.venue_service_id] = venue_service_service.venue_service;
			})
		})

		// create totals array
		let venueServiceAvailable = {};
		this.props.account.account_services.forEach((account_service) => {

			let serviceExpires = GlobalUtil.convertMysqlToDateRaw(account_service.valid_end);
			if (serviceExpires < now) return;

			Object.keys(account_service.per_venue_service).forEach((venue_service_id) => {
				if (venueServiceAvailable[venue_service_id] == undefined) {
					venueServiceAvailable[venue_service_id] = {
						venue_service: venueServices[venue_service_id],
						limit_week: 0,
						limit_month: 0,
						limit_lifetime: 0,
						usage_week: 0,
						usage_month: 0,
						usage_lifetime: 0
					}
				}

				let usage_object = account_service.per_venue_service[venue_service_id];

				venueServiceAvailable[venue_service_id].limit_week += (usage_object.limit_week == null) ? Infinity : Number(usage_object.limit_week);
				venueServiceAvailable[venue_service_id].limit_month += (usage_object.limit_month == null) ? Infinity : Number(usage_object.limit_month);
				venueServiceAvailable[venue_service_id].limit_lifetime += (usage_object.limit_lifetime == null) ? Infinity : Number(usage_object.limit_lifetime);
				venueServiceAvailable[venue_service_id].usage_week += Number(usage_object.usage_week);
				venueServiceAvailable[venue_service_id].usage_month += Number(usage_object.usage_month);
				venueServiceAvailable[venue_service_id].usage_lifetime += Number(usage_object.usage_lifetime);
			})
		})

		let venueCards = Object.keys(venueServiceAvailable).map((venue_service_id) => {
			let venueServiceIndividual = venueServiceAvailable[venue_service_id];

			let title = venueServiceIndividual.venue_service.venue.name + ' ' + venueServiceIndividual.venue_service.name;
			let inclusions = GlobalUtil.htmlTextStripper(venueServiceIndividual.venue_service.inclusions);
			let usage = venueServiceIndividual.usage_lifetime + '/' + (venueServiceIndividual.limit_lifetime == Infinity ? '∞' : venueServiceIndividual.limit_lifetime);
			if (venueServiceIndividual.limit_month != Infinity) usage = venueServiceIndividual.usage_month + '/' + venueServiceIndividual.limit_month;
			if (venueServiceIndividual.limit_week != Infinity) usage = venueServiceIndividual.usage_week + '/' + venueServiceIndividual.limit_week;

			return <VenueCard key={venue_service_id} title={title} usage={usage} inclusions={inclusions}/>
		})


        return (

			<View>
				<View style={STYLES.overallDetailContainer}>
			        <View style={STYLES.outerDetailsContainer}>
			            <View style={STYLES.detailsContainer}>
			                <Text style={STYLES.detailsText}>Full Name:</Text>
			            </View>

			            <View style={STYLES.detailsContainer}>
			                <Text style={STYLES.detailsText}>{this.props.account.full_name}</Text>
			            </View>
			        </View>
			        {
			        	this.props.account.account_type ?
				        <View style={STYLES.outerDetailsContainer}>
				            <View style={STYLES.detailsContainer}>
				                <Text style={STYLES.detailsText}>Pass Type:</Text>
				            </View>

				            <View style={STYLES.detailsContainer}>
				                <Text style={STYLES.detailsText}>{this.props.account.account_type.name}</Text>
				            </View>
				        </View> : null
				    }


			        <View style={STYLES.outerDetailsContainer}>
			            <View style={STYLES.detailsContainer}>
			                <Text style={STYLES.detailsText}>Expiration Date:</Text>
			            </View>

			            <View style={STYLES.detailsContainer}>
			                <Text style={STYLES.detailsText}>{expirationDate}</Text>
			            </View>
			        </View>
			        {/*
			        <TouchableOpacity style={STYLES.renewButton}>
			                <Icon name='refresh' size= {20} style={STYLES.iconRenew}/>
			                <Text style={STYLES.detailsText}>Renew</Text>
			        </TouchableOpacity>
			       */}
			    </View>



		    	<Text style={STYLES.venueTitleText}>Venues</Text>
			    <View style={STYLES.venueContainer}>
			      {venueCards}
			    </View>

			</View>

        );
    }
}

const STYLES = {
	overallDetailContainer: {
		justifyContent: 'center',
		alignItems: 'center',
		marginBottom: 20,
    width: Dimensions.get('window').width - 50
	},
	outerDetailsContainer: {
		flex: 1,
		flexDirection: 'row',
		marginHorizontal: 20,
		marginVertical: 10
	},
	detailsContainer: {
		flex: 1
	},
	detailsText: {
		color: 'white',
		fontSize: 14
	},
	renewButton: {
		flexDirection: 'row',
		paddingVertical: 15,
		paddingHorizontal: 30,
		backgroundColor: 'orange',
		justifyContent: 'center',
		alignItems: 'center',
		borderRadius: 10,
		margin: 20
	},
	iconRenew: {
		color: 'white',
		marginRight: 15
	},
	venueContainer: {
		flexDirection: 'row',
		flexWrap: 'wrap',
		justifyContent: 'center',
		alignItems: 'center',
		marginBottom: 100
	},
	venueTitleText: {
		alignSelf: 'center',
		textAlign: 'center',
		width: '40%',
		fontSize: 18,
		marginBottom: 20,
		marginTop: 10,
		paddingBottom: 20,
		borderBottomWidth: 2,
		borderColor: 'white',
		color: 'white'
	},
}
