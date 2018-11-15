import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import SpringPanelNotifications from './spring-panel-notifications'
import Bubble from '../bubble.js'

export default class HeaderTitle extends React.Component {

	constructor(props){
		super(props);
		this.handleNotifications = this.handleNotifications.bind(this);
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

				<Bubble number='9'/>

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
		opacity: .95,
		backgroundColor: 'rgba(0, 0, 0, 0.6)'
	},
	iconContainer:{
		position: 'absolute',
		top: 0,
		right: 0,
		padding: 15
	}
}
