import React from 'react';
import {View, Text, ScrollView, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import VenueCard from './venue-card.js';

export default class SpringPanelDetails extends React.Component {

    render() {

    	let expirationDate = GlobalUtil.convertMysqlToDate(this.props.account.expire_at).formatDate('n/d/Y');


    	console.log(this.props.account);

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
			        <VenueCard/>
			        <VenueCard/>
			        <VenueCard/>
			        <VenueCard/>
			        <VenueCard/>
			        <VenueCard/>
			        <VenueCard/>
			        <VenueCard/>
			        <VenueCard/>
			        <VenueCard/>
			        <VenueCard/>
			        <VenueCard/>
			    </View>

			</View>

        );
    }
}

const STYLES = {
	overallDetailContainer: {
		justifyContent: 'center',
		alignItems: 'center',
		marginBottom: 20
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
