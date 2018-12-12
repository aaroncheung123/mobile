
import React from 'react';

import {Modal, View, TextInput, StyleSheet, Image, TouchableWithoutFeedback, Keyboard, Text, AsyncStorage} from 'react-native';
import {Icon, Button} from 'react-native-elements'
import {Constants} from 'expo';
import {EliteWorksOrange, AccountContentGrey, AccountMenuGrey} from '../../assets/styles/constants';
import {KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

export default class LoginModal extends React.Component {
	constructor(props) {
		super(props)

		this.state = {
			applicationKey: '0000000676',
			email: 'kyle.paulson@eliteworks.com',
			password: 'eliteworks1',
			errorMessage: '',
			loading: false
		}

		this.login = this.login.bind(this);
	}

	login()
	{

		if (this.state.applicationKey.trim() == '' || this.state.email.trim() == '' || this.state.password.trim() == '')
		{
			this.setState({errorMessage: 'Invalid Email or Password'})
			return;
		}

		let previousWebClientKey = GlobalUtil.webClientKey;
		let previousWebClientApiKey = GlobalUtil.webClientApiKey;

		GlobalUtil.webClientKey = this.state.applicationKey.trim();
		GlobalUtil.webClientApiKey = undefined;

		this.setState({loading: true})
		if (!this.state.loading) {
			EliteAPI.CRM.User.login({username: this.state.email.trim(), password: this.state.password.trim()}, (success) => {

				AsyncStorage.getItem('workspaces').then((value) => {
					let workspaces = {}
					if (!GlobalUtil.isEmpty(value)) workspaces = JSON.parse(value);

					GlobalUtil.webClientApiKey = success.data.user_key.key;
					Service.Config.refresh(() => {
						Service.Config.get('COMPANY_NAME', (companyName) => {
							workspaces[GlobalUtil.webClientKey] = {
								companyName: companyName,
								apiKey: success.data.user_key.key
							}
							AsyncStorage.setItem('workspaces', JSON.stringify(workspaces), () => {
								AsyncStorage.setItem('workspaceSelected', GlobalUtil.webClientKey, () => {
									this.props.onUpdate();
									this.props.onClose();
									this.setState({loading: false})
								});
							});	
						}, '')

					});

				});
	
			}, (failure) => {
				GlobalUtil.webClientKey = previousWebClientKey;
				GlobalUtil.webClientApiKey = previousWebClientApiKey;
				this.setState({loading: false, errorMessage: failure.error_message})
			})
		}
	}

	render() {
		return (
			<Modal
				animationType="slide"
				transparent={true}
				visible={this.props.visible}
				onRequestClose={this.props.onClose}>
				<View style={STYLES.overlay}>
					<View style={MODAL_STYLES.modalContainer}>
						<TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false} style={{maxWidth: '100%'}}>
							<KeyboardAwareScrollView
								keyboardShouldPersistTaps='always' 
								>
								<View style={STYLES.scrollView}>
									<Image style={STYLES.overlayLogo} source={require('../../assets/images/branding/logo.png')} />
									<View 
										style={ICON_INPUT_STYLES.container}>
										<Icon 
											style={ICON_INPUT_STYLES.icon} 
											name='key' 
											type='entypo'
											color='#222222'/>
										<TextInput 
											autoCapitalize='none'
											underlineColorAndroid='transparent'
											returnKeyType="next"
											placeholder="App Key / Domain" 
											placeholderTextColor="#dddddd" 
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
											color='#222222'/>
										<TextInput 
											autoCapitalize='none'
											underlineColorAndroid='transparent'
											ref={(e) => this.emailInput = e}
											returnKeyType="next"
											placeholder="Email" 
											placeholderTextColor="#dddddd" 
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
											color='#222222'/>
										<TextInput 
											autoCapitalize='none'
											underlineColorAndroid='transparent'
											ref={(e) => this.passwordInput = e}
											returnKeyType="send"
											keyboardAppearance="dark"
											placeholder="Password"
											secureTextEntry={true} 
											placeholderTextColor="#dddddd" 
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
										color="#222222"
										onPress={this.login}
										loading={this.state.loading}
									/>
									<Button
										buttonStyle={STYLES.link}
										title="Cancel"
										color="#222222"
										onPress={this.props.onClose}
									/>
								</View>
							</KeyboardAwareScrollView>
						</TouchableWithoutFeedback>
					</View>
				</View>
			</Modal>
		)
	}
}



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
	overlay: {
		flex: 1,
		width: '100%',
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: 'rgba(0, 0, 0, 0.4)',
		alignItems: 'center',
		justifyContent: 'center',
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
		minWidth: '100%'
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



export const ICON_INPUT_STYLES = StyleSheet.create({
	text: {
		height: 25, 
		width: '80%',
		lineHeight: 25,
		color: '#222222',
		fontWeight: "400",
		fontSize: 18,
		marginLeft: 10

	}, 
	container:  {
		width: '80%',
		maxWidth: 350,
		borderStyle: 'solid',
		borderBottomColor: '#dddddd',
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

const MODAL_STYLES = {

	modalContainer: {
		maxWidth: '90%',
		height: '90%',
		backgroundColor: '#ffffff',
		borderRadius: 20,
		alignItems: 'center',
		justifyContent: 'center',
		position: 'relative',
	},
	modalTextContainer: {
		borderBottomColor: EliteWorksOrange,
		borderStyle: 'solid',
		borderBottomWidth: 2,
		width: '100%',
		padding: 10,
		top: 0,
		position: 'absolute'
	},
	modalTextName: {
		color: EliteWorksOrange,
		fontSize: 30,
		textAlign: 'center'
	},
	modalButtonContainer: {
		borderTopColor: EliteWorksOrange,
		borderStyle: 'solid',
		borderTopWidth: 2,
		width: '100%',
		paddingBottom: 20,
		position: 'absolute',
		justifyContent: 'center',
		alignItems: 'center',
		bottom: 0
	},
	modalButton: {
		height: 50,
		borderColor: EliteWorksOrange,
		borderWidth: 2,
		borderStyle: 'solid',
		borderRadius: 15,
		marginTop: 20,
		backgroundColor: 'transparent',
		width: 220,
		maxWidth: 220
	},
	modalScrollView: {
		width: '100%',
		marginTop: 40,
		marginBottom: 80,
		flex: 1

	}
}