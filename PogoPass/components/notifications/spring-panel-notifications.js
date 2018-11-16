import React from 'react';
import {View, Text, ScrollView, TouchableOpacity} from 'react-native';
import Notification from './notification'

export default class SpringPanelNotifications extends React.Component {

    constructor(props){
        super(props);

        this.state = {
            notifications: []
        }
    }

    componentDidMount() {
        Service.User.get(user => {
            EliteAPI.CRM.Notification.search({user_id: user.id, take: 50}, (success) => {
                this.setState({notifications: success.data.models})
            })
        })
    }

    render() {

        let notificationElements = this.state.notifications.map((notification) => <Notification key={notification.notification_id}  onShowSidePanel={this.props.onShowSidePanel} notification={notification} onPress={this.handleSidePanel}/>);

        return (
            <ScrollView>
                {notificationElements}
            </ScrollView>
        );
    }
}
