
//import { createSwitchNavigator } from 'react-navigation';
import React from 'react';
import Forgot from './forgot/index';
import Account from './account/index';
import Login from './login/index';
import {View, AsyncStorage} from 'react-native';
import {MemoryRouter, Route} from 'react-router';


export default class BaseNavigation extends React.Component {

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

	render() {
		return (
			<MemoryRouter ref={e => this.router = e}>
				<View>
					<Route path="/account" component={Account}/>
					<Route path="/login" component={Login}/>
					<Route path="/forgot" component={Forgot}/>
				</View>
			</MemoryRouter>
		)
	}
}

/*
const AppNavigator = createSwitchNavigator({

	Login: {
		screen: Login,
		navigationOptions: {
		    header: null,
		}
	},
	Forgot: {
		screen: Forgot,
		navigationOptions: {
		    header: null,
		}
	},
	Account: {
		screen: Account,
		navigationOptions: {
		    header: null,
		}
	},
});

export default AppNavigator;

*/
