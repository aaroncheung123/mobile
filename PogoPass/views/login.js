import React from 'react';
import {StyleSheet, View, TextInput, Image, Keyboard, TouchableWithoutFeedback, Text} from 'react-native';
import {KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import {Icon, Button} from 'react-native-elements'
import {Styles, IconInputStyles} from '../assets/styles/styles'
import API from '../assets/api/api'

export default class Login extends React.Component {
	constructor(props)
	{
		super(props);
		this.state = {
			email: '',
			password: '',
			errorMessage: '',
			loading: false
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
					<View
						style={Styles.overlay}>
						<KeyboardAwareScrollView
							keyboardShouldPersistTaps='always'
							>
							<View
								style={Styles.scrollView}>
								<Image style={Styles.overlayLogo} source={require('../assets/images/logos/pogopass.png')} />
								<View
									style={IconInputStyles.container}>
									<Icon
										style={IconInputStyles.icon}
										name='mail'
										color='white'/>
									<TextInput
										autoCapitalize='none'
										underlineColorAndroid='transparent'
										returnKeyType="next"
										placeholder="Email"
										placeholderTextColor="#eeeeee"
										keyboardType="email-address"
										keyboardAppearance="dark"
										style={IconInputStyles.text}
										value={this.state.email}
										onChangeText={(email) => this.setState({email: email, errorMessage: ''})}
										onSubmitEditing={() => this.passwordInput.focus()}>
									</TextInput>
								</View>
								<View style={IconInputStyles.container}>
									<Icon
										style={IconInputStyles.icon}
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
										style={IconInputStyles.text}
										value={this.state.password}
										onChangeText={(password) => this.setState({password: password, errorMessage: ''})}
										onSubmitEditing={this.login}>
									</TextInput>
								</View>
								{
									this.state.errorMessage.trim() != '' ?
									<Text style={Styles.overlayErrorText}>{this.state.errorMessage}</Text> : null
								}
								<Button
									buttonStyle={Styles.overlayButton}
									title="Login"
									color="white"
									onPress={this.login}
									loading={this.state.loading}
								/>
								<Button
									icon={{name: 'question', type: 'evilicon', size: 15, color: "white"}}
									buttonStyle={Styles.link}
									title="Forgot Password"
									color="white"
									onPress={this.goToForgot}
								/>
							</View>
						</KeyboardAwareScrollView>
					</View>
				</TouchableWithoutFeedback>

            	<Text style={{position: 'absolute', textAlign: 'center', bottom: 15, color: 'white', width: '100%'}}>V. 2.2</Text>
			</View>
		);
	}
}
