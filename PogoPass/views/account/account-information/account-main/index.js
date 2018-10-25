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
  }

	updatePath(path) {
		this.props.history.push(path);
	}

	render() {
		return (
			<View style={STYLES.totalContainer}>
				<View style={STYLES.titleContainer}>
					<Text style={STYLES.title}>
						Account Information
					</Text>
				</View>
				<InfoTab onPress={() => this.updatePath('/profile')} icon='user' name='Profile'/>
				<InfoTab onPress={() => this.updatePath('/addresses')} icon='truck' name='Addresses'/>
				<InfoTab onPress={() => this.updatePath('/payment')} icon='credit-card' name='Payment / Credit'/>
				<InfoTab onPress={() => this.updatePath('/orders')} icon='calendar' name='Orders'/>
				<InfoTab onPress={() => this.updatePath('/subscriptions')} icon='refresh' name='Subscriptions'/>
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
		paddingTop: 60,
		paddingBottom: 60,
		width:'100%',
		fontSize: 24
	},
	titleContainer: {
		backgroundColor: '#faa31a',
		width:'100%',
		opacity: .95
	}
}
