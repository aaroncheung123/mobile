import React from 'react';
import NavigationBar from 'react-native-navbar';
import {Styles, PassStyles, VenueTotalStyles, ShareStyles} from '../../../assets/styles/styles';

import {View, Dimensions, WebView, TouchableOpacity, AsyncStorage, Text, ScrollView, Modal, TouchableHighlight, RefreshControl, Share, Animated, Platform} from 'react-native';
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
			showingDetails: false,
			loginLink: ''
		}
    this.springValue = new Animated.Value(0);
		this.screenHeight = Dimensions.get('window').height;
		this.logout = this.logout.bind(this);
		this.loadAccounts = this.loadAccounts.bind(this);
		this.loadReferralCode = this.loadReferralCode.bind(this);
		this.share = this.share.bind(this);
		this.handlePurchasePass = this.handlePurchasePass.bind(this);
		this.handlePurchaseGift = this.handlePurchaseGift.bind(this);
	}

	componentDidMount() {
		AsyncStorage.getItem('account_keys').then((value) => {

			if (value != null) {
				value = JSON.parse(value);
				value.forEach(accountKey => {
					if (accountKey != null)
					{
						AsyncStorage.getItem('account_' + accountKey).then((account) => {

							if (!GlobalUtil.isEmpty(account))
							{
								let accountDecoded = JSON.parse(account);
								this.state.accounts.push(accountDecoded);
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

		Service.User.get(user => {
			EliteAPI.CRM.User.getLoginToken(
			 { user_id: user.id },
			 success => {
				 this.setState({
					 loginLink: "http://www.pogopass.com/login/auto?one_time_login_token=" + success.data.user_login_token.token
				 })
			 },
			 failure => {
				 console.log(failure);
			 }
		 );
		})

	}

	logout() {
		AsyncStorage.removeItem('customer_api_key', () => {
			this.props.history.push('/login');
		})
	}

	share() {
		if (this.state.referralCode) {

			let message = 'Check out Pogo Pass! It gives you free access to tons of entertainment venues in your area. Click the link below to get your pass for only $39.95 through my referral. ' + this.state.referralCode.url_referral;
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

				let accounts = success.data.user.accounts.sort((a, b) => {
					return this.getAccountExpiration(b) - this.getAccountExpiration(a)
				})

				this.setState({accounts: accounts});

				let accountKeys = [];
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
		let expirationDate;
		account.account_services.map((account_service) => {
			let serviceExpires = GlobalUtil.convertMysqlToDate(account_service.valid_end);
			if (expirationDate == undefined || serviceExpires > expirationDate) expirationDate = serviceExpires
		})
		return expirationDate;
	}

	handlePurchasePass(){
		this.props.onShowSidePanel(
			'Purchase Pass',
			<View style={STYLES.webViewContainer}>
				<WebView
					source = {{ uri: this.state.loginLink + '&url=https://www.pogopass.com/category/new-passes' }}
				/>
			</View>
		)
	}


	handlePurchaseGift(){
		this.props.onShowSidePanel(
			'Purchase Gift',
			<View style={STYLES.webViewContainer}>
				<WebView
					source = {{ uri: this.state.loginLink + '&url=https://www.pogopass.com/category/gift' }}
				/>
			</View>
		)
	}


	render() {
		let passViews = this.state.accounts.map((account) => <Pass key={account.account_id} onShowSpringPanel={this.props.onShowSpringPanel} account={account} onLoadAccounts={this.loadAccounts} refreshing={this.state.refreshing}/>)
		return (
			<View>
					<ScrollView
						refreshControl={
							<RefreshControl
								refreshing={this.state.refreshing}
								onRefresh={this.loadAccounts}
							/>
						}>

						<View style={STYLES.passContainer}>
							<View style={STYLES.topButtonSection}>
								<TouchableOpacity
									onPress={this.handlePurchasePass}
									style={STYLES.iconContainer}>
									<Icon name='plus' size={35}/>
									<Text style={STYLES.topButtonSectionText}>Purchase Pass</Text>
								</TouchableOpacity>
								<TouchableOpacity
									onPress={this.handlePurchaseGift}
									style={STYLES.iconContainer}>
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
	webViewContainer:{
		height: '100%',
		width: Dimensions.get('window').width - ((Platform.OS === 'ios') ? 100 : 0),
		marginBottom: 200,
	},
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
		//flex: 1,
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
			<SpringPanelDetails account={this.props.account}/>
		)
	}


	render() {
		let expiration = GlobalUtil.convertMysqlToDateRaw(this.props.account.expire_at).formatDate('n/d/Y');
		let city = this.props.account.account_type ? this.props.account.account_type.name : '';

		// get the expiration date
		let expirationDate;
		this.props.account.account_services.map((account_service) => {
			let serviceExpires = GlobalUtil.convertMysqlToDate(account_service.valid_end);
			if (expirationDate == undefined || serviceExpires > expirationDate) expirationDate = serviceExpires
		})

		let expirationText;
		let now = new Date();
		let expired = true;
		if (expirationDate != undefined)
		{
			if (GlobalUtil.convertMysqlToDateRaw(GlobalUtil.convertDateToMysql(expirationDate)) < now){
				expirationText = <Text style={PassStyles.textCity}>Expired: {expirationDate.formatDate('n/d/Y')}</Text>
			}
			else {
				expired = false;
				expirationText = <Text style={PassStyles.textCity}>Valid Until: {expirationDate.formatDate('n/d/Y')}</Text>
			}
		}



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

						{expirationText}
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
