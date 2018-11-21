import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';

export default class Notification extends React.Component {

    constructor(props){
        super(props);

        this.state = {
            notifications: []
        }
        this.handleSidePanel = this.handleSidePanel.bind(this);
    }

    handleSidePanel(){
        this.props.notification.viewed = 1;
        this.forceUpdate();
        EliteAPI.CRM.Notification.massView({notification_ids: this.props.notification.notification_id}, (success) => {
            this.props.onViewed();
        });
        this.props.onShowSidePanel(
            this.props.notification.title,
            <Text>{this.props.notification.description}</Text>
        )
    }

    render() {

        let cardStyles = STYLES.notificationCard;
        if (GlobalUtil.inputToBool(this.props.notification.viewed)) cardStyles = {...cardStyles, ...STYLES.notificationCardActive}


        return (
            <TouchableOpacity onPress={this.handleSidePanel}>
                <View style={cardStyles}>
                    <Text style={STYLES.title}>{this.props.notification.title}</Text>
                    <Text>{this.props.notification.description}</Text>
                </View>
            </TouchableOpacity>
        );
    }
}


const STYLES ={
    title: {
        fontSize: 18,
        fontWeight: 'bold'
    },
    notificationCard: {
        backgroundColor: '#ffead1',
        borderRadius: 10,
        padding: 20,
        margin: 1,
        width: 300
    },
    notificationCardActive: {
        backgroundColor: 'white',
    }
}
