import React from 'react';
import NavigationBar from 'react-native-navbar';
import {Styles, PassStyles, VenueTotalStyles, ShareStyles} from '../../../assets/styles/styles';
import {View, AsyncStorage, Text, ScrollView, Modal, TouchableHighlight, RefreshControl, Share} from 'react-native';
import {MemoryRouter, Route, IndexRedirect} from 'react-router';
import InfoTab from '../../../components/account-information/info-tab.js';
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
		this.updatePath = this.updatePath.bind(this);
  }

	componentDidMount() {
		this.updatePath('/account-main');
	}

	updatePath(path) {
		this.router.history.push(path);
		this.forceUpdate();
	}

	render() {
		return (

			<MemoryRouter ref={e => this.router = e}>
				<View style={STYLES.routerContainer}>
					<Route path="/account-main" component={AccountMain} />
					<Route path="/profile" component={Profile} />
					<Route path="/addresses" component={Addresses} />
					<Route path="/payment" component={PaymentCredit} />
					<Route path="/orders" component={Orders} />
					<Route path="/subscriptions" component={Subscriptions} />
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
