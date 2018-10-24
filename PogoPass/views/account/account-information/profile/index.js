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
									 <Icon name='chevron-left' size= {20}/>
							</TouchableWithoutFeedback>

							<Text style={STYLES.textStyle}>Profile</Text>

						</View>

						<View style={STYLES.bottomSection}>
							<Text style={STYLES.bottomTextStyle}>First Name</Text>
							<TextInput
							 style={STYLES.textInputStyle}
               placeholder = "First Name"
               placeholderTextColor = "#9a73ef"
               autoCapitalize = "none"
               onChangeText = {this.handleEmail}/>

							<Text style={STYLES.bottomTextStyle}>Last Name</Text>
							<Text style={STYLES.bottomTextStyle}>Email</Text>
							<Text style={STYLES.bottomTextStyle}>Phone</Text>
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
	},
	textStyle: {
		fontSize: 20,
		color: 'white',
		fontWeight: 'bold',
		paddingLeft: 60
	},
	bottomTextStyle: {
		fontSize: 16,
		padding: 30
	},
	textInputStyle: {
		width:'60%',
		underlineColor: "black",
		padding: 30
	}
}
