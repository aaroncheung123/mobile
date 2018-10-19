import React from 'react';
import { StyleSheet, Text, View, ImageBackground, TextInput, AsyncStorage, StatusBar} from 'react-native';
import Login from './views/login';
import Forgot from './views/forgot';
import Account from './views/account';
import {Styles} from './assets/styles/styles'
import { MemoryRouter, Route, Redirect } from "react-router-dom";
import './EliteWorksLibrary/global-util'
import BaseNavigation from './views/index';


export default class App extends React.Component {

	constructor(props) {
		super(props)
		GlobalUtil.webClientKey = '0000000676';
	}

	render() {
		return (
			<View style={Styles.container} >
				<StatusBar barStyle="dark-content"/>
				<ImageBackground
				source={require('./assets/images/backgrounds/rollercoaster_background.jpg')}
				style={Styles.backgroundImage}>
					<BaseNavigation/>
				</ImageBackground>
			</View>

		);
	}
}



 