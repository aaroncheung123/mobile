import React from 'react';
import {View, Text, ScrollView, TouchableOpacity} from 'react-native';

export default class SpringPanelNotifications extends React.Component {

    constructor(props){
        super(props);

        this.state = {
            notifications: []
        }

        this.handleSidePanel = this.handleSidePanel.bind(this);
    }

    componentDidMount() {
        Service.User.get(user => {
            EliteAPI.CRM.Notification.search({user_id: user.id, take: 50}, (success) => {
                this.setState({notifications: success.data.models})
            })
        })
    }

    handleSidePanel(){
        this.props.onShowSidePanel(
            'Rating',
            <Text>5 star rating</Text>
        )
    }

    render() {

        let notificationElements = this.state.notifications.map((notification) => <Notification key={notification.notification_id} notification={notification} onPress={this.handleSidePanel}/>);

        return (
            <ScrollView>
                {notificationElements}
            </ScrollView>
        );
    }
}

const Notification = (props) => {
    return (
        <TouchableOpacity onPress={props.onPress}>
            <View style={STYLES.notificationCard}>
                <Text style={STYLES.title}>{props.notification.title}</Text>
                <Text>{props.notification.description}</Text>
            </View>
        </TouchableOpacity>
    );
}


const STYLES ={
    title: {
        fontSize: 18,
        fontWeight: 'bold'
    },
    notificationCard: {
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 20,
        margin: 1,
        width: 300
    }
}
