import React from 'react';
import { StyleSheet, Text, View, ImageBackground, TextInput, AsyncStorage, StatusBar, WebView, Platform } from 'react-native';

import Login from './views/login';
import Forgot from './views/forgot';
import Account from './views/account';
import {Styles} from './assets/styles/styles'
import BaseNavigation from './views/index';
import { MemoryRouter, Route, Redirect } from "react-router-dom";

import '../EliteWorksLibrary/global-util'


import { Permissions, Notifications } from 'expo';

const PUSH_ENDPOINT = 'https://your-server.com/users/push-token';






async function registerForPushNotificationsAsync() {
	

	const { status: existingStatus } = await Permissions.getAsync(
		Permissions.NOTIFICATIONS
	);


	let finalStatus = existingStatus;

	// only ask if permissions have not already been determined, because
	// iOS won't necessarily prompt the user a second time.
	if (existingStatus !== 'granted') {

		console.log('not granted');
		// Android remote notification permissions are granted during the app
		// install, so this will only ask on iOS
		const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
		finalStatus = status;
	}

	// Stop here if the user did not grant permissions
	if (finalStatus !== 'granted') {
		cnsolee.log('not granted')
		return;
	}

	// Get the token that uniquely identifies this device
	let token = await Notifications.getExpoPushTokenAsync();

	Platform.OS;
	Service.User.get(user => {
		EliteAPI.CRM.Device.add({
			name: Expo.Constants.deviceName,
			user_id: user.id,
			push_token: token,
			os: Platform.OS
		});
	})
}





export default class App extends React.Component {

	constructor(props) {
		super(props)
		GlobalUtil.webClientKey = '0000000676';
	}


	componentDidMount() {
		registerForPushNotificationsAsync()


		Notifications.addListener(this.handleNotification)
	}

	handleNotification(notification, removeCallback) {
		console.log(notification);
		console.log(removeCallback);
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
