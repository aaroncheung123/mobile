import React from 'react';
import NavigationBar from 'react-native-navbar';
import {View, Text, ScrollView, Switch} from 'react-native';
import {MemoryRouter, Route, IndexRedirect} from 'react-router';

import Venue from './venue/index.js';
import Date from './date/index.js';


export default class Events extends React.Component {

	constructor () {
	  super();
		this.state = {
	 		switchValue: false,
		}
		this.toggleSwitch = this.toggleSwitch.bind(this);
		this.updatePath = this.updatePath.bind(this);
	}

	componentDidMount() {
		this.updatePath('/venue');
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
				<View style={STYLES.toggleContainer}>
					<Text style={STYLES.toggleText}>Venue</Text>

						<Switch
							trackColor = {{false: 'white', true: 'orange'}}
							thumbColor = 'orange'
							style = {STYLES.switchStyle}
							onValueChange = {this.toggleSwitch}
							value = {this.state.switchValue}/>

					<Text style={STYLES.toggleText}>Date</Text>

				</View>

				<MemoryRouter ref={e => this.router = e}>
					<View style={STYLES.routerContainer}>
						<Route path="/venue" component={Venue} />
						<Route path="/date" component={Date} />
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
