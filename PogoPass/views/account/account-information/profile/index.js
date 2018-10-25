import React from 'react';
import {View, Text, TouchableWithoutFeedback, TextInput, TouchableHighlight} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

export default class Profile extends React.Component {

	constructor(props)
	{
		super(props);
		this.state = {
			user: undefined
		}
		this.updatePath = this.updatePath.bind(this);
		this.handlePersonalInformationSubmit = this.handlePersonalInformationSubmit.bind(this);
	}

	componentDidMount() {
		Service.User.get((user) => {

			console.log(user);
			this.setState({user: user});
		})
	}
	updatePath(path) {
	    this.props.history.push(path);
	}

	handleTextChange(property, value) {
		let user = this.state.user;
		user[property] = value;
		this.setState({user: user});
	}

	handlePersonalInformationSubmit() {
		this.state.user.save((success) => {
				console.log(success);
				alert('saved');
		})
	}

    render() {
				if (!this.state.user) return null;
        return (
					<View style={STYLES.wholeContainer}>
						<View style={STYLES.topMenu}>
							<TouchableWithoutFeedback onPress={() => this.updatePath('/account-main')}>
									 <Icon name='arrow-left' size= {25} color='white'/>
							</TouchableWithoutFeedback>

							<Text style={STYLES.textStyle}>Profile</Text>

						</View>

						<View style={STYLES.bottomSectionTitle}>
							<Text style={STYLES.bottomSectionHeader}> Personal Information </Text>
						</View>

						<View style={STYLES.bottomSection}>

							<Text style={STYLES.bottomTextStyle}>First Name</Text>
							<TextInput
							 style={STYLES.textInputStyle}
							 underlineColorAndroid = "transparent"
               placeholder = "First Name"
               placeholderTextColor = "black"
               autoCapitalize = "none"
							 value={this.state.user.first_name}
               onChangeText = {(value) => this.handleTextChange('first_name', value)}/>

							<Text style={STYLES.bottomTextStyle}>Last Name</Text>
								<TextInput
								 style={STYLES.textInputStyle}
								 underlineColorAndroid = "transparent"
	               placeholder = "Last Name"
	               placeholderTextColor = "black"
	               autoCapitalize = "none"
								 value={this.state.user.last_name}
	               onChangeText = {(value) => this.handleTextChange('last_name', value)}/>

							<Text style={STYLES.bottomTextStyle}>Email</Text>
								<TextInput
								 style={STYLES.textInputStyle}
								 underlineColorAndroid = "transparent"
	               placeholder = "Email"
	               placeholderTextColor = "black"
	               autoCapitalize = "none"
								 value={this.state.user.email}
	               onChangeText = {(value) => this.handleTextChange('email', value)}/>

							<Text style={STYLES.bottomTextStyle}>Phone</Text>
								<TextInput
								 style={STYLES.textInputStyle}
								 underlineColorAndroid = "transparent"
	               placeholder = "123-123-1234"
	               placeholderTextColor = "black"
	               autoCapitalize = "none"
								 value={this.state.user.phone}
	               onChangeText = {(value) => this.handleTextChange('phone', value)}/>

							 <TouchableHighlight style = {STYLES.buttonContainer} onPress={this.handlePersonalInformationSubmit}>
				            <Text style = {STYLES.buttonStyle}>
				               Save
				            </Text>
	         			</TouchableHighlight>
						</View>



						<View style={STYLES.bottomSectionTitle}>
							<Text style={STYLES.bottomSectionHeader}> Password </Text>
						</View>

						<View style={STYLES.bottomSection}>

							<Text style={STYLES.bottomTextStyle}>Current Password</Text>
							<TextInput
							 style={STYLES.textInputStyle}
							 underlineColorAndroid = "transparent"
               autoCapitalize = "none"
               onChangeText = {this.handleEmail}/>

						 <Text style={STYLES.bottomTextStyle}>New Password</Text>
								<TextInput
								 style={STYLES.textInputStyle}
								 underlineColorAndroid = "transparent"
	               autoCapitalize = "none"
	               onChangeText = {this.handleEmail}/>

							 <Text style={STYLES.bottomTextStyle}>Confirm New Password</Text>
								<TextInput
								 style={STYLES.textInputStyle}
								 underlineColorAndroid = "transparent"
	               autoCapitalize = "none"
	               onChangeText = {this.handleEmail}/>

								 <TouchableHighlight style = {STYLES.buttonContainer}>
		 								 <Text style = {STYLES.buttonStyle}>
		 										Set Password
		 								 </Text>
		 						 </TouchableHighlight>
						</View>



					</View>


        );
    }
}

const STYLES = {
	wholeContainer:{
		flex: 1
	},
	buttonStyle:{
		color: 'white',
		backgroundColor: 'orange',
		fontSize: 16,
		paddingTop: 10,
		paddingBottom: 10,
		paddingLeft: 25,
		paddingRight: 25,
		borderRadius: 5
	},
	buttonContainer:{
		paddingTop: 30,
		paddingBottom: 30,
		flexDirection:'row',
		justifyContent:'flex-end'
	},
	topMenu: {
		flexDirection: 'row',
		justifyContent: 'flex-start',
		alignItems: 'center',
		width:'100%',
		backgroundColor: 'orange',
		padding: 17,
	},
	bottomSection: {
		opacity: .90,
		backgroundColor: '#E5E5E5',
		width:'100%',
		paddingLeft: 30,
		paddingRight: 30
	},
	bottomSectionTitle: {
		backgroundColor:'#c9c9c9',
		width:'100%',
		opacity:.95
	},
	bottomSectionHeader: {
		fontSize: 20,
		padding: 30
	},
	textStyle: {
		fontSize: 20,
		color: 'white',
		paddingLeft: 20
	},
	bottomTextStyle: {
		fontSize: 16,
		paddingTop: 20,
	},
	textInputStyle: {
		height: 40,
		paddingLeft: 20,
		borderWidth: 1,
		borderRadius: 5
	}
}
