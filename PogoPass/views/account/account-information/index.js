import React from 'react';
import NavigationBar from 'react-native-navbar';
import {Styles, PassStyles, VenueTotalStyles, ShareStyles} from '../../../assets/styles/styles';
import {View, AsyncStorage, Text, ScrollView, Modal, TouchableHighlight, RefreshControl, Share} from 'react-native';
import {MemoryRouter, Route, IndexRedirect} from 'react-router';
import AccountMain from './account-main/index.js';
import Profile from './profile/index.js';
import Addresses from './addresses/index.js';
import PaymentCredit from './payment-credit/index.js';
import Orders from './orders/index.js';
import Subscriptions from './subscriptions/index.js';


export default class AccountInformation extends React.Component {

	constructor(props)
  {
    super(props);
		this.state = {
			loginLink: ''
		}
		this.updatePath = this.updatePath.bind(this);
  }

	componentDidMount(){
		Service.User.get(user => {
			EliteAPI.CRM.User.getLoginToken(
			 { user_id: user.id },
			 success => {
				 console.log(success);
				 this.setState({
					 loginLink: "http://www.pogopass.com/login/auto?one_time_login_token=" + success.data.user_login_token.token
				 }, () => {
			 			this.updatePath('/account-main');
				 })
			 },
			 failure => {
				 console.log(failure);
			 }
		 );
		})

	}

	updatePath(path) {
		this.router.history.push(path);
		this.forceUpdate();
	}

	render() {
		if (GlobalUtil.isEmpty(this.state.loginLink)) return null;

		return (

			<MemoryRouter ref={e => this.router = e}>
				<View style={STYLES.routerContainer}>
					<Route path="/account-main" render={(props) => <AccountMain {...props} onLogout={this.props.onLogout} /> } />
					<Route path="/profile" render={(props) => <Profile {...props} loginLink={this.state.loginLink}/>} />
					<Route path="/addresses" render={(props) => <Addresses {...props} loginLink={this.state.loginLink} onShowSidePanel={this.props.onShowSidePanel} /> } />
					<Route path="/payment" render={(props) => <PaymentCredit {...props} loginLink={this.state.loginLink} onShowSidePanel={this.props.onShowSidePanel} /> } />
					<Route path="/orders" render={(props) => <Orders {...props} loginLink={this.state.loginLink}/>}/>
					<Route path="/subscriptions" render={(props) => <Subscriptions {...props} loginLink={this.state.loginLink}/>}/>
				</View>
			</MemoryRouter>

		);
	}
}

const STYLES = {
	routerContainer: {
		flex:1,
		width:'100%',
	}
}
