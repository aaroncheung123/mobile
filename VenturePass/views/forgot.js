import React from 'react';
import {StyleSheet, View, TextInput, Image, Keyboard, TouchableWithoutFeedback, Text} from 'react-native';
import {KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import {Icon, Button} from 'react-native-elements'
import {Styles, IconInputStyles} from '../assets/styles/styles'
import API from '../assets/api/api'

export default class Forgot extends React.Component {
	constructor(props)
	{
		super(props);
		this.state = {
			email: '',
			password: '',
			message: '',
			success: false
		}
		this.forgot = this.forgot.bind(this);
		this.backToLogin = this.backToLogin.bind(this);
	}

	forgot() {


		if (this.state.email.trim() == '')
		{
			this.setState({message: 'Invalid Email', success: false});
			return;
		}

		this.setState({loading: true})
		if (!this.state.loading) {
			API.ForgotPassword({email: this.state.email}, (success) => {
				this.setState({loading: false, message: 'Sent Password Reset Email', success: true})
			}, (failure) => {
				this.setState({loading: false, message: failure.error_message, success: false})
			})
		}
	}

	backToLogin() {
		this.props.history.push('/login');
	}

	render() {

		var messageStyles = this.state.success ? Styles.overlaySuccessText : Styles.overlayErrorText;
		return (
			<View style={Styles.overlay}>
				<TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
					<View>
						<KeyboardAwareScrollView>
							<View 
								style={Styles.scrollView}>
								<Image style={Styles.overlayLogo} source={require('../assets/images/branding/logo.png')} />
								<View 
									style={IconInputStyles.container}>
									<Icon 
										style={IconInputStyles.icon} 
										name='mail' 
										color='white'/>
									<TextInput 
										autoCapitalize='none'
										underlineColorAndroid='transparent'
										returnKeyType="send"
										placeholder="Email" 
										placeholderTextColor="#eeeeee" 
										keyboardType="email-address" 
										keyboardAppearance="dark"
										style={IconInputStyles.text} 
										value={this.state.email} 
										onChangeText={(email) => this.setState({email: email, message: ''})}
										onSubmitEditing={this.forgot}>
									</TextInput>
								</View>
								{
									this.state.message.trim() != '' ?
									<Text style={messageStyles}>{this.state.message}</Text> : null
								}
								<Button
									buttonStyle={Styles.overlayButton}
									title="Send Password Reset"
									color="white"
									onPress={this.forgot}
									loading={this.state.loading}
								/>
								<Button
									icon={{name: 'back', type: 'entypo', size: 15, color: "white"}}
									buttonStyle={Styles.link}
									title="Back to Login"
									color="white"
									onPress={this.backToLogin}
								/>
							</View>
						</KeyboardAwareScrollView>
					</View>
				</TouchableWithoutFeedback>
            	<Text style={{position: 'absolute', textAlign: 'center', bottom: 15, color: 'white', width: '100%'}}>V. 1.0</Text>
			</View>
		);
	}
}
