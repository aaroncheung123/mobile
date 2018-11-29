import React from 'react';
import NavigationBar from 'react-native-navbar';
import {View, Text, ScrollView, Switch, AsyncStorage} from 'react-native';
import {MemoryRouter, Route, IndexRedirect} from 'react-router';

import Venue from './venue/index.js';
import DateEvents from './date/index.js';


export default class Events extends React.Component {

	constructor () {
	  super();
		this.state = {
	 		switchValue: false,
	 		accounts: [],
	 		refreshing: false
		}
		this.toggleSwitch = this.toggleSwitch.bind(this);
		this.updatePath = this.updatePath.bind(this);
		this.handleRefresh = this.handleRefresh.bind(this);
	}

	componentDidMount() {
		this.updatePath('/venue');
		this.handleRefresh();
	}

	handleRefresh() {
		if (!this.state.refreshing) {
			this.setState({refreshing: true});
			EliteAPI.CRM.User.get({include_classes: 'account,venueserviceservice,accountservice,service,venue,accounttype'}, success => {

				let now = new Date();
				let accounts = success.data.user.accounts.filter(x => GlobalUtil.convertMysqlToDateRaw(x.expire_at) > now);
				this.setState({accounts: accounts});
				this.setState({refreshing: false});
			}, failure => {
				this.setState({refreshing: false})
				alert('Cannot Connect to Server - Unable to refresh passes');
			})
		}
	}

	toggleSwitch(value){
		if(value){
			this.updatePath('/date');
		}
		else{
			this.updatePath('/venue');
		}
		this.setState({switchValue: value})
	}

	updatePath(path) {
		this.router.history.push(path);
		this.forceUpdate();
	}

	render() {
		return (
			<View>
				{/*<View style={STYLES.toggleContainer}>
					<Text style={STYLES.toggleText}>Venue</Text>

						<Switch
							trackColor = {{false: 'white', true: 'orange'}}
							thumbColor = 'orange'
							style = {STYLES.switchStyle}
							onValueChange = {this.toggleSwitch}
							value = {this.state.switchValue}/>

					<Text style={STYLES.toggleText}>Date</Text>

				</View>*/}

				<MemoryRouter ref={e => this.router = e}>
					<View style={STYLES.routerContainer}>
						<Route path="/venue" render={(props) => <Venue {...props}
							accounts={this.state.accounts}
							refreshing={this.state.refreshing}
							onRefresh={this.handleRefresh}
							onShowSpringPanel={this.props.onShowSpringPanel}
							onShowSidePanel={this.props.onShowSidePanel}/>} />
						{/*<Route path="/date" component={Date} />*/}
					</View>
				</MemoryRouter>


			</View>
		);
	}
}


const STYLES = {
	toggleContainer: {
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
		height: 30,
		marginVertical: 40
	},
	toggleText: {
		color: 'white',
		fontSize: 18
	},
	switchStyle: {
		marginHorizontal: 10,
	}
}
