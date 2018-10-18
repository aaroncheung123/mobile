import React from 'react';
import {StyleSheet, View, TextInput, Image, Keyboard, TouchableWithoutFeedback, Text, AsyncStorage} from 'react-native';
import {KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import {Icon, Button} from 'react-native-elements'
import {Styles, IconInputStyles} from '../../assets/styles/styles'

export default class Login extends React.Component {
	constructor(props)
	{
		super(props);
		this.state = {
			email: 'kyle.paulson@eliteworks.com',
			password: 'eliteworks1',
			errorMessage: '',
			loading: false
		}
		this.login = this.login.bind(this);
	}

	login() {
		if (this.state.email.trim() == '' || this.state.password.trim() == '')
		{
			this.setState({errorMessage: 'Invalid Email or Password'})
			return;
		}

		this.setState({loading: true})
		if (!this.state.loading) {

			EliteAPI.CRM.User.login({username: this.state.email, password: this.state.password}, success => {
				AsyncStorage.setItem('customer_api_key', success.data.user_key.key);
				GlobalUtil.webClientApiKey = success.data.user_key.key;
				this.props.navigation.navigate('Account')
			}, (failure) => {
				this.setState({loading: false, errorMessage: failure.error_message})
			})
		}
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
								<Image style={Styles.overlayLogo} source={require('../../assets/images/logos/login_logo.png')} />
								<View
									style={IconInputStyles.container}>
									<Icon
										style={IconInputStyles.icon}
										name='mail'
  										type='favicon'
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
										type='favicon'
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
									title="Forgot your password?"
									icon={{name: 'question', type: 'evilicon', size: 15, color: "white"}}
									buttonStyle={Styles.link}
									color="white"
									onPress={() => this.props.navigation.navigate('Forgot')}
								/>
							</View>
						</KeyboardAwareScrollView>
					</View>
				</TouchableWithoutFeedback>

            	<Text style={{position: 'absolute', textAlign: 'center', bottom: 15, color: 'white', width: '100%'}}>V. 2.5</Text>
			</View>
		);
	}
}
