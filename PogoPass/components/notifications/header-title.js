import React from 'react';
import {View, Text, TouchableOpacity, Platform} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import SpringPanelNotifications from './spring-panel-notifications'
import NotificationBubble from '../bubble.js'
import { Constants } from 'expo';


export default class HeaderTitle extends React.Component {

	constructor(props){
		super(props);
		this.handleNotifications = this.handleNotifications.bind(this);
		this.state = {
			notificationCount: 0
		}
	}

	componentDidMount() {
		Service.User.get(user => {
			EliteAPI.CRM.Notification.report({user_id: user.id, viewed: 0, methods: 'COUNT'}, (success) => {
				if (success.data.report.ALL) this.setState({notificationCount: success.data.report.ALL.COUNT})
			})
		})
	}

	handleNotifications(){
		this.props.onShowSpringPanel(
			'Notifications',
			<SpringPanelNotifications onShowSidePanel={this.props.onShowSidePanel}/>
		)
	}

		render() {
			return (
				<View>
					<Text style={STYLES.headerTitle}>
						{this.props.title}
					</Text>

					{this.state.notificationCount > 0 ? <NotificationBubble number={this.state.notificationCount}/> : null}

					<TouchableOpacity
						style={STYLES.iconContainer}
						onPress={this.handleNotifications}>



						<Icon
							name='bell'
							type='font-awesome'
							color='white'
							size={25}
						/>
					</TouchableOpacity>

				</View>
			);
		}
}

const STYLES = {
	headerTitle: {
		color: 'white',
		minWidth: '100%',
		fontSize: 25,
		fontWeight: 'bold',
		textAlign: 'center',
		alignItems: 'center',
		justifyContent: 'center',
		padding: 10,
		paddingTop: Platform.OS === 'ios' ? Constants.statusBarHeight + 5 : 10,
		opacity: Platform.OS === 'ios' ? 1 : .95,
		backgroundColor: Platform.OS === 'ios' ? 'rgba(0, 0, 0, 1)' : 'rgba(0, 0, 0, 0.6)'
	},
	iconContainer:{
		position: 'absolute',
		top: 0,
		right: 0,
		padding: 15,
		paddingTop: Platform.OS === 'ios' ? Constants.statusBarHeight + 7 : 15,
	}
}
