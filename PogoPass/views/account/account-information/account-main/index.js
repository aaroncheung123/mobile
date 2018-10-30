import React from 'react';
import NavigationBar from 'react-native-navbar';
import {Styles, PassStyles, VenueTotalStyles, ShareStyles} from '../../../../assets/styles/styles';
import {View, AsyncStorage, Text, ScrollView, Modal, TouchableHighlight, RefreshControl, Share} from 'react-native';
import InfoTab from '../../../../components/account-information/info-tab';


export default class AccountInformation extends React.Component {

	constructor(props)
  {
    super(props);
		this.updatePath = this.updatePath.bind(this);
		this.signOut = this.signOut.bind(this);
  }

	updatePath(path) {
		this.props.history.push(path);
	}
	signOut() {
		AsyncStorage.clear();
	}

	render() {
		return (
			<View style={STYLES.totalContainer}>
				<View style={STYLES.titleContainer}>
					<Text style={STYLES.title}>
						Account Info
					</Text>
				</View>

				<View style={STYLES.infoTabContainer}>
					<InfoTab onPress={() => this.updatePath('/profile')} icon='user' name='Profile'/>
					<InfoTab onPress={() => this.updatePath('/addresses')} icon='truck' name='Addresses'/>
					<InfoTab onPress={() => this.updatePath('/payment')} icon='credit-card' name='Payment / Credit'/>
					<InfoTab onPress={() => this.updatePath('/orders')} icon='calendar' name='Orders'/>
					<InfoTab onPress={() => this.updatePath('/subscriptions')} icon='refresh' name='Subscriptions'/>
					<InfoTab onPress={() => this.signOut()} icon='sign-out' name='Sign out'/>
				</View>


			</View>
		);
	}
}

const STYLES = {
	totalContainer: {
    justifyContent: 'flex-start',
    alignItems: 'center',
		flex: 1,
		width:'100%'
	},
	title: {
		textAlign: 'center',
		color: 'white',
		fontSize: 35,
		fontWeight: 'bold',
		width:'100%'
	},
	titleContainer: {
		width:'100%',
		opacity: .95,
		paddingVertical: 25,
		backgroundColor: 'rgba(0, 0, 0, 0.6)'
	},
	infoTabContainer: {
		width:'90%',
		borderWidth: 5,
		borderRadius: 20,
		padding: 10,
		borderColor: 'orange'
	}
}
