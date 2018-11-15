import React from 'react';
import NavigationBar from 'react-native-navbar';
import {Styles, PassStyles, VenueTotalStyles, ShareStyles} from '../../../../assets/styles/styles';
import {View, AsyncStorage, Text, ScrollView, Modal, TouchableHighlight, RefreshControl, Share} from 'react-native';
import InfoTab from './info-tab';


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
				<ScrollView style={STYLES.infoTabContainer}>
					<View style={STYLES.rowContainer}>
						<InfoTab onPress={() => this.updatePath('/profile')} icon='user' name='Profile'/>
						<InfoTab onPress={() => this.updatePath('/addresses')} icon='truck' name='Addresses'/>
						<InfoTab onPress={() => this.updatePath('/payment')} icon='credit-card' name='Payment / Credit'/>
						<InfoTab onPress={() => this.updatePath('/orders')} icon='calendar' name='Orders'/>
						<InfoTab onPress={() => this.updatePath('/subscriptions')} icon='refresh' name='Subscriptions'/>
						<InfoTab onPress={this.props.onLogout} icon='sign-out' name='Sign out'/>
					</View>
				</ScrollView>
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
	infoTabContainer: {
		width:'100%'
	},
	rowContainer: {
		flexDirection: 'row',
		justifyContent: 'center',
		flexWrap: 'wrap',
		marginTop: 25
	}
}
