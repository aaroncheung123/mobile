
//import { createSwitchNavigator } from 'react-navigation';
import React from 'react';
import Forgot from './forgot/index';
import Account from './account/index';
import Login from './login/index';
import {View, AsyncStorage, StatusBar} from 'react-native';
import {MemoryRouter, Route} from 'react-router';


export default class BaseNavigation extends React.Component {

	constructor(props)
	{
		super(props)
		this.handleLogout = this.handleLogout.bind(this);
	}


	componentDidMount() {
		AsyncStorage.getItem('customer_api_key').then((value) => {
			if (value != null){
				this.defaultRoute = '/account';
				GlobalUtil.webClientApiKey = value;
			}
			else this.defaultRoute = '/login';
			this.router.history.push(this.defaultRoute);
		});
	}

	handleLogout() {
		AsyncStorage.clear(() => {
			this.router.history.push('/login');
		});
	}

	render() {
		return (
			<MemoryRouter ref={e => this.router = e}>
    			<View>
                	<StatusBar barStyle="light-content"/>
					<Route path="/account" render={(props) => <Account {...props} onLogout={this.handleLogout}/>}/>
					<Route path="/login" component={Login}/>
					<Route path="/forgot" component={Forgot}/>
    			</View>
			</MemoryRouter>
		)
	}
}
