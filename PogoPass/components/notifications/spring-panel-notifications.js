import React from 'react';
import {View, Text, ScrollView, TouchableOpacity} from 'react-native';
import Notification from './notification'

import { Permissions, Notifications } from 'expo';
export default class SpringPanelNotifications extends React.Component {

    constructor(props){
        super(props);

        this.state = {
            notifications: []
        }
        this.handleNotificationSearch = this.handleNotificationSearch.bind(this);
        this.handleNotification = this.handleNotification.bind(this);
    }

    componentDidMount() {
        Notifications.addListener(this.handleNotification)
        this.handleNotificationSearch();
    }

    handleNotificationSearch() {

        Service.User.get(user => {
            EliteAPI.CRM.Notification.search({user_id: user.id, take: 50}, (success) => {
                this.setState({notifications: success.data.models})
            })
        })
    }

    handleNotification(notification, removeCallback) {
        this.handleNotificationSearch
    }


    render() {

        let notificationElements = this.state.notifications.map((notification) => <Notification onViewed={this.props.onViewed} key={notification.notification_id}  onShowSidePanel={this.props.onShowSidePanel} notification={notification} onPress={this.handleSidePanel}/>);

        return (
            <ScrollView style={STYLES.container}>
                {notificationElements}
            </ScrollView>
        );
    }
}

const STYLES = {
    container: {
        //marginBottom: 75
    }
}
