import React from 'react';
import {View, Text, TouchableWithoutFeedback, TextInput} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

export default class Profile extends React.Component {

	constructor(props)
	{
	super(props);
		this.updatePath = this.updatePath.bind(this);
	}
	updatePath(path) {
	    this.props.history.push(path);
	}

    render() {
        return (
					<View style={STYLES.wholeContainer}>
						<View style={STYLES.topMenu}>
							<TouchableWithoutFeedback onPress={() => this.updatePath('/account-main')}>
									 <Icon name='arrow-left' size= {25}/>
							</TouchableWithoutFeedback>

							<Text style={STYLES.textStyle}>Profile</Text>

						</View>

						<View style={STYLES.bottomSectionTitle}>
							<Text> Hello </Text>
						</View>

						<View style={STYLES.bottomSection}>

							<Text style={STYLES.bottomTextStyle}>First Name</Text>
							<TextInput
							 style={STYLES.textInputStyle}
							 underlineColorAndroid = "transparent"
               placeholder = "John"
               placeholderTextColor = "black"
               autoCapitalize = "none"
               onChangeText = {this.handleEmail}/>

							<Text style={STYLES.bottomTextStyle}>Last Name</Text>
								<TextInput
								 style={STYLES.textInputStyle}
								 underlineColorAndroid = "transparent"
	               placeholder = "Doe"
	               placeholderTextColor = "black"
	               autoCapitalize = "none"
	               onChangeText = {this.handleEmail}/>

							<Text style={STYLES.bottomTextStyle}>Email</Text>
								<TextInput
								 style={STYLES.textInputStyle}
								 underlineColorAndroid = "transparent"
	               placeholder = "johndoe@gmail.com"
	               placeholderTextColor = "black"
	               autoCapitalize = "none"
	               onChangeText = {this.handleEmail}/>

							<Text style={STYLES.bottomTextStyle}>Phone</Text>
								<TextInput
								 style={STYLES.textInputStyle}
								 underlineColorAndroid = "transparent"
	               placeholder = "123-123-1234"
	               placeholderTextColor = "black"
	               autoCapitalize = "none"
	               onChangeText = {this.handleEmail}/>
						</View>

					</View>


        );
    }
}

const STYLES = {
	wholeContainer:{
		flex: 1
	},
	topMenu: {
		flexDirection: 'row',
		justifyContent: 'flex-start',
		alignItems: 'center',
		width:'100%',
		backgroundColor: 'orange',
		opacity: .85,
		padding: 17,
	},
	bottomSection: {
		opacity: .9,
		backgroundColor: '#E5E5E5',
		width:'100%',
		paddingLeft: 30,
		paddingRight: 30,
		paddingBottom: 60
	},
	bottomSectionTitle: {
		backgroundColor:'#c9c9c9',
		width:'100%',
		height:'10%',
		opacity:.9
	},
	textStyle: {
		fontSize: 20,
		color: 'white',
		fontWeight: 'bold',
		paddingLeft: 60
	},
	bottomTextStyle: {
		fontSize: 16,
		paddingTop: 20,
		paddingBottom: 10
	},
	textInputStyle: {
		height: 40,
		paddingLeft: 20,
		borderWidth: 1,
		borderRadius: 5
	}
}