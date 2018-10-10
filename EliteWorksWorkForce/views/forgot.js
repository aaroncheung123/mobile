import React from 'react';
import {StyleSheet, View, TextInput, Image, Keyboard, TouchableWithoutFeedback, Text} from 'react-native';
import {KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import {Icon, Button} from 'react-native-elements'
import {Constants} from 'expo';
//import API from '../assets/api/api'

import {EliteWorksOrange} from '../assets/styles/constants';

export default class Login extends React.Component {
	constructor(props)
	{
		super(props);
		this.state = {
			email: '',
			password: '',
			errorMessage: ''
		}
		this.login = this.login.bind(this);
		this.goToForgot = this.goToForgot.bind(this);
	}

	login() {		
		if (this.state.email.trim() == '' || this.state.password.trim() == '')
		{
			this.setState({errorMessage: 'Invalid Email or Password'})
			return;
		}

		this.setState({loading: true})
		if (!this.state.loading) {
			API.Login({username: this.state.email, password: this.state.password}, (success) => {
				this.props.history.push('/account');
			}, (failure) => {
				this.setState({loading: false, errorMessage: failure.error_message})
			})
		}
	}

	goToForgot() {
		this.props.history.push('/forgot');
	}

	render() {
		return (
			<View>
				<TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
					<KeyboardAwareScrollView
						keyboardShouldPersistTaps='always' 
						>
						<View 
							style={STYLES.scrollView}>
							<Image style={STYLES.overlayLogo} source={require('../assets/images/branding/logo.png')} />
							<View 
								style={ICON_INPUT_STYLES.container}>
								<Icon 
									style={ICON_INPUT_STYLES.icon} 
									name='key' 
									type='entypo'
									color='white'/>
								<TextInput 
									autoCapitalize='none'
									underlineColorAndroid='transparent'
									returnKeyType="next"
									placeholder="App Key / Domain" 
									placeholderTextColor="#eeeeee" 
									keyboardAppearance="dark"
									style={ICON_INPUT_STYLES.text} 
									value={this.state.applicationKey} 
									onChangeText={(applicationKey) => this.setState({applicationKey: applicationKey, errorMessage: ''})}
									onSubmitEditing={() => this.emailInput.focus()}>
								</TextInput>
							</View>
							<View 
								style={ICON_INPUT_STYLES.container}>
								<Icon 
									style={ICON_INPUT_STYLES.icon} 
									name='mail' 
									color='white'/>
								<TextInput 
									autoCapitalize='none'
									underlineColorAndroid='transparent'
									ref={(e) => this.emailInput = e}
									returnKeyType="next"
									placeholder="Email" 
									placeholderTextColor="#eeeeee" 
									keyboardType="email-address" 
									keyboardAppearance="dark"
									style={ICON_INPUT_STYLES.text} 
									value={this.state.email} 
									onChangeText={(email) => this.setState({email: email, errorMessage: ''})}
									onSubmitEditing={() => this.passwordInput.focus()}>
								</TextInput>
							</View>
							<View style={ICON_INPUT_STYLES.container}>
								<Icon 
									style={ICON_INPUT_STYLES.icon} 
									name='lock' 
									color='white'/>
								<TextInput 
									autoCapitalize='none'
									underlineColorAndroid='transparent'
									ref={(e) => this.passwordInput = e}
									returnKeyType="send"
									keyboardAppearance="dark"
									placeholder="Password"
									secureTextEntry={true} 
									placeholderTextColor="#eeeeee" 
									style={ICON_INPUT_STYLES.text} 
									value={this.state.password} 
									onChangeText={(password) => this.setState({password: password, errorMessage: ''})}
									onSubmitEditing={this.login}>
								</TextInput>
							</View>
							{
								this.state.errorMessage.trim() != '' ?
								<Text style={STYLES.overlayErrorText}>{this.state.errorMessage}</Text> : null
							}
							<Button
								buttonStyle={STYLES.overlayButton}
								title="Login"
								color="white"
								onPress={this.login}
								loading={this.state.loading}
							/>
							<Button
								icon={{name: 'question', type: 'evilicon', size: 15, color: "white"}}
								buttonStyle={STYLES.link}
								title="Forgot Password"
								color="white"
								onPress={this.goToForgot}
							/>
						</View>
					</KeyboardAwareScrollView>
				</TouchableWithoutFeedback>
          
            	<Text style={{position: 'absolute', textAlign: 'center', bottom: 15, color: 'white', width: '100%'}}>V. 1.0</Text>
			</View>
		);
	}
}

export const ICON_INPUT_STYLES = StyleSheet.create({
	text: {
		height: 25, 
		width: '80%',
		lineHeight: 25,
		color: 'white',
		fontWeight: "400",
		fontSize: 18,
		marginLeft: 10

	}, 
	container:  {
		width: '80%',
		maxWidth: 350,
		borderStyle: 'solid',
		borderBottomColor: 'white',
		borderBottomWidth: 2,
		flex: 1, 
		alignItems: 'center',
		flexDirection: 'row',
		height: 50,
		maxHeight: 50
	},
	icon: {
		width: 20
	}
}); 

export const STYLES = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
		marginTop: Constants.statusBarHeight,
		height: '100%'
	},
	iconInputIcon: {
		width: 30
	},
	backgroundImage: {
		width: '100%',
		height: '100%',
		alignItems: 'center',
	},
	overlayLogo: {
		marginBottom: 70,
		height: 46,
		width: 300
	},
	overlayButton: {
		height: 50,
		borderColor: EliteWorksOrange,
		borderWidth: 2,
		borderStyle: 'solid',
		borderRadius: 15,
		marginTop: 30,
		backgroundColor: 'transparent',
		width: 350,
		maxWidth: 350
	},
	scrollView: {
		flex: 1,
		width: '100%',
		alignItems: 'center',
		justifyContent: 'center',
		paddingTop: 100
	},
	link: {
		marginTop: 20,
		backgroundColor: 'transparent',
	},
	overlayErrorText: {
		color: 'red',
		marginTop: 10,
		fontSize: 20
	},
	overlaySuccessText: {
		color: EliteWorksOrange,
		marginTop: 10,
		fontSize: 20
	}
});