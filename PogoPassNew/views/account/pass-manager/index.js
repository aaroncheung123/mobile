import React from 'react';
import NavigationBar from 'react-native-navbar';
import {Styles, PassStyles, VenueTotalStyles, ShareStyles} from '../../../assets/styles/styles';

import {View, Dimensions, TouchableOpacity, AsyncStorage, Text, ScrollView, Modal, TouchableHighlight, RefreshControl, Share, Animated} from 'react-native';
import Barcode from 'react-native-barcode-builder';
import {Button} from 'react-native-elements';
import SpringPanelDetails from './spring-panel-details.js';
import Icon from 'react-native-vector-icons/FontAwesome';

export default class Account extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			refreshing: true,
			accounts: [],
			referralCodeLoading: true,
			showingDetails: false
		}
    this.springValue = new Animated.Value(0);
		this.screenHeight = Dimensions.get('window').height;
		this.logout = this.logout.bind(this);
		this.loadAccounts = this.loadAccounts.bind(this);
		this.loadReferralCode = this.loadReferralCode.bind(this);
		this.share = this.share.bind(this);
	}

	componentDidMount() {
		AsyncStorage.getItem('account_keys').then((value) => {

			if (value != null) {
				value = JSON.parse(value);
				value.forEach(accountKey => {
					if (accountKey != null)
					{
						AsyncStorage.getItem('account_' + accountKey).then((account) => {
							if (account != null)
							{
								var account = JSON.parse(account);
								this.state.accounts.push(account);
								this.forceUpdate();
							}
						})
					}
				})
			}

			this.state.refreshing = false;
			this.loadAccounts();
		});

		AsyncStorage.getItem('customer_referral_code').then((value) => {
			if (value != null)
			{
				this.setState({referralCode: JSON.parse(value), referralCodeLoading: false});
			}
			this.loadReferralCode();
		})

	}

	logout() {
		AsyncStorage.removeItem('customer_api_key', () => {
			this.props.history.push('/login');
		})
	}

	share() {
		if (this.state.referralCode) {

			var message = 'Check out Pogo Pass! It gives you free access to tons of entertainment venues in your area. Click the link below to get up your membership 60% off. ' + this.state.referralCode.url_referral;
			Share.share({
				message: message,
				url: this.state.referralCode.url_referral,
				title: 'Check out Pogo Pass!'
			}, {
				dialogTitle: 'Share Pogo Pass',
			})
		}
	}

	loadReferralCode() {
		EliteAPI.CRM.User.getReferralCode({}, (success) => {
			this.setState({referralCodeLoading: false});
			this.setState({referralCode: success.data.user_code});
			AsyncStorage.setItem('customer_referral_code', JSON.stringify(success.data.user_code));
		}, (failure) => {
			console.log('fail: ',failure);
		})
	}

	loadAccounts() {
		if (!this.state.refreshing) {
			this.setState({refreshing: true});
			EliteAPI.CRM.User.get({include_classes: 'account,venueserviceservice,accountservice,service,venue,accounttype'}, success => {

				var accounts = success.data.user.accounts.sort((a, b) => {
					return this.getAccountExpiration(b) - this.getAccountExpiration(a)
				})

				this.setState({accounts: accounts});

				var accountKeys = [];
				accounts.forEach(account => {

					if (account.account_services)
					{
						account.account_services.forEach((account_service) => {
							if (account_service.service) delete account_service.service;
							if (account_service.venue_service_services) {
								account_service.venue_service_services.forEach((venue_service_service) => {

									if (venue_service_service.venue_service.venue)
									{
										delete venue_service_service.venue_service.venue.data;
										delete venue_service_service.venue_service.venue.inclusions;
										delete venue_service_service.venue_service.venue.template;
										delete venue_service_service.venue_service.venue.description;
									}
								})
							}
						})
					}
					accountKeys.push(account.account_key);
					AsyncStorage.setItem('account_' + account.account_key, JSON.stringify(account))
				});

				AsyncStorage.setItem('account_keys', JSON.stringify(accountKeys));

				this.setState({refreshing: false});

			}, failure => {
				this.setState({refreshing: false})
				alert('Cannot Connect to Server - Unable to refresh passes');
			})
		}
	}

	getAccountExpiration(account) {		// get the expiration date
		var expirationDate;
		account.account_services.map((account_service) => {
			var serviceExpires = GlobalUtil.convertMysqlToDate(account_service.valid_end);
			if (expirationDate == undefined || serviceExpires > expirationDate) expirationDate = serviceExpires
		})
		return expirationDate;
	}


	render() {
		var passViews = this.state.accounts.map((account) => <Pass key={account.account_id} onShowSpringPanel={this.props.onShowSpringPanel} account={account} onLoadAccounts={this.loadAccounts} refreshing={this.state.refreshing}/>)
		return (
			<View>
					<Text style={STYLES.headerTitle}>Pass Manager</Text>
					<ScrollView
						refreshControl={
							<RefreshControl
								refreshing={this.state.refreshing}
								onRefresh={this.loadAccounts}
							/>
						}>

						<View style={STYLES.passContainer}>
							<View style={STYLES.topButtonSection}>
								<TouchableOpacity style={STYLES.iconContainer}>
									<Icon name='plus' size={35}/>
									<Text style={STYLES.topButtonSectionText}>Purchase Pass</Text>
								</TouchableOpacity>
								<TouchableOpacity style={STYLES.iconContainer}>
									<Icon name='gift' size={35}/>
									<Text style={STYLES.topButtonSectionText}>Purchase Gift</Text>
								</TouchableOpacity>
								<TouchableOpacity style={STYLES.iconContainer} onPress={this.share}>
										<Icon name='dollar' size={35}/>
										<Text style={STYLES.topButtonSectionText}>Refer a Friend</Text>
								</TouchableOpacity>
							</View>
							{passViews}
						</View>
					</ScrollView>
			</View>
		);
	}
}

const STYLES = {
	passContainer: {
		alignItems: 'center',
		justifyContent: 'center',
		marginBottom: 200
	},
	iconContainer:{
		backgroundColor: '#E5E5E5',
		borderRadius: 20,
		padding: 15,
		marginVertical: 30,
		justifyContent: 'center',
		alignItems:'center',
		width: 100,
		opacity: .9
	},
	topButtonSection:{
		flexDirection: 'row',
		justifyContent:'space-evenly',
		alignItems:'center',
		width: '100%'
	},
	topButtonSectionText: {
		textAlign: 'center'
	},
	headerTitle: {
		width: '100%',
		textAlign: 'center',
		color: 'white',
		fontWeight:'bold',
		fontSize: 25,
		padding: 10,
		backgroundColor: 'rgba(0, 0, 0, 0.6)'
	}
}




class Pass extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			modalVisible: false
		}
		this.onPressDetails = this.onPressDetails.bind(this);
	}

	onPressDetails(){
		this.props.onShowSpringPanel(
			'Details',
			<SpringPanelDetails/>
		)
	}

	render() {
		var expiration = GlobalUtil.convertMysqlToDateRaw(this.props.account.expire_at).formatDate('n/d/Y');
		var city = this.props.account.account_type ? this.props.account.account_type.name : '';

		// get the expiration date
		var expirationDate;
		this.props.account.account_services.map((account_service) => {
			var serviceExpires = GlobalUtil.convertMysqlToDate(account_service.valid_end);
			if (expirationDate == undefined || serviceExpires > expirationDate) expirationDate = serviceExpires
		})

		var expirationText;
		var now = new Date();
		var expired = true;
		if (expirationDate != undefined)
		{
			if (GlobalUtil.convertMysqlToDateRaw(GlobalUtil.convertDateToMysql(expirationDate)) < now){
				expirationText = <Text style={PassStyles.textExpirationInvalid}>Expired: {expirationDate.formatDate('n/d/Y')}</Text>
			}
			else {
				expired = false;
				expirationText = <Text style={PassStyles.textExpirationValid}>Expires: {expirationDate.formatDate('n/d/Y')}</Text>
			}
		}


		var venueServices = {}
		this.props.account.account_services.forEach((account_service) => {
			account_service.venue_service_services.forEach((venue_service_service) => {
				venueServices[venue_service_service.venue_service_id] = venue_service_service.venue_service;
			})
		})

		// create totals array
		var venueServiceAvailable = {};
		this.props.account.account_services.forEach((account_service) => {
			var serviceExpires = GlobalUtil.convertMysqlToDateRaw(account_service.valid_end);
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

				var usage_object = account_service.per_venue_service[venue_service_id];

				venueServiceAvailable[venue_service_id].limit_week += (usage_object.limit_week == null) ? Infinity : Number(usage_object.limit_week);
				venueServiceAvailable[venue_service_id].limit_month += (usage_object.limit_month == null) ? Infinity : Number(usage_object.limit_month);
				venueServiceAvailable[venue_service_id].limit_lifetime += (usage_object.limit_lifetime == null) ? Infinity : Number(usage_object.limit_lifetime);
				venueServiceAvailable[venue_service_id].usage_week += Number(usage_object.usage_week);
				venueServiceAvailable[venue_service_id].usage_month += Number(usage_object.usage_month);
				venueServiceAvailable[venue_service_id].usage_lifetime += Number(usage_object.usage_lifetime);
			})
		})

			var venueTotals = Object.keys(venueServiceAvailable).map((venue_service_id) => {
			var venueServiceIndividual = venueServiceAvailable[venue_service_id];

			var title = venueServiceIndividual.venue_service.venue.name + ' ' + venueServiceIndividual.venue_service.name + ' - ' + GlobalUtil.htmlTextStripper(venueServiceIndividual.venue_service.inclusions);
			var usage = venueServiceIndividual.usage_lifetime + '/' + (venueServiceIndividual.limit_lifetime == Infinity ? '∞' : venueServiceIndividual.limit_lifetime);
			if (venueServiceIndividual.limit_month != Infinity) usage = venueServiceIndividual.usage_month + '/' + venueServiceIndividual.limit_month;
			if (venueServiceIndividual.limit_week != Infinity) usage = venueServiceIndividual.usage_week + '/' + venueServiceIndividual.limit_week;

			return <VenueTotal key={venue_service_id} title={title} usage={usage} />
		})

		return (
			<View style={PassStyles.container}>
				<View style={PassStyles.innerContainer}>
					<View style={PassStyles.leftContainer}>
						<Text style={PassStyles.textName}> {this.props.account.full_name} </Text>
						{
							city != '' ?
							<Text style={PassStyles.textCity}>
								{city}
							</Text> : null
						}

						<Text style={PassStyles.textCity}>Expiration: {expiration}</Text>
					</View>
					<View style={PassStyles.rightContainer}>
						<TouchableOpacity style={PassStyles.detailButton} onPress={this.onPressDetails}>
							<Text>
								Details
							</Text>
						</TouchableOpacity>
					</View>
				</View>



				<View style={PassStyles.whiteSubBackground}>
					<View>
						<Barcode width={1.75} value={this.props.account.account_key} format="CODE128" />
					</View>
					<Text style={PassStyles.textBarcode}>
						{this.props.account.account_key}
					</Text>
				</View>


				<Modal
					animationType="slide"
					transparent={true}
					visible={this.state.modalVisible}
					onRequestClose={() => this.setState({modelVisible: false})}>
					<View>
					<View style={PassStyles.modalContainer}>
						<View style={PassStyles.modalTextContainer}>
							<Text style={PassStyles.modalTextName}>
								{this.props.account.full_name}
							</Text>
						</View>
						<View style={PassStyles.modalScrollView}>
							<ScrollView
								refreshControl={
									<RefreshControl
										refreshing={this.props.refreshing}
										onRefresh={this.props.onLoadAccounts}
									/>
								}>
								{venueTotals}
							</ScrollView>
						</View>
						<View style={PassStyles.modalButtonContainer}>
							<Button
								buttonStyle={PassStyles.modalButton}
								title="Close"
								color="black"
								onPress={() => this.setState({modalVisible: false})}
							/>
						</View>
					</View>
					</View>
				</Modal>
			</View>
		)
	}
}

const VenueTotal = (props) => {
	return (
		<View style={VenueTotalStyles.container}>
			<View style={VenueTotalStyles.textVenueNameContainer}>
				<Text style={VenueTotalStyles.textVenueName}>
					{props.title}
				</Text>
			</View>
			<View style={VenueTotalStyles.textLimitsContainers}>
				<Text style={VenueTotalStyles.textLimits}>
					{props.usage}
				</Text>
			</View>
		</View>
	)
}
