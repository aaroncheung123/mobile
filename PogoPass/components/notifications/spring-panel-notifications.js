import React from 'react';
import {View, Text, ScrollView, TouchableOpacity} from 'react-native';

export default class SpringPanelNotifications extends React.Component {

    constructor(props){
        super(props);
        this.handleNotifications = this.handleNotifications.bind(this);
    }

    handleNotifications(){
        console.log("handleNotifications");
    }

    render() {
        return (
            <ScrollView>
                <TouchableOpacity onPress={this.handleNotifications}>
                    <Notification/>
                </TouchableOpacity>

            </ScrollView>
        );
    }
}

const Notification = (props) => {
    return (
        <View style={STYLES.notificationCard}>
            <Text style={STYLES.title}>How was Enchanted Island?</Text>
            <Text>Please help us out by leaving us a rating and some feedback.</Text>
        </View>
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
