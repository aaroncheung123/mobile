import React from 'react';
import {View, Text} from 'react-native';

const UpcomingEventCard = (props) => {
    return (
        <View style={STYLES.container}>
            <View style={STYLES.leftContainer}>
                <Text style={STYLES.title}>Oct 31</Text>
            </View>
            <View style={STYLES.rightContainer}>
                <Text style={STYLES.title1}>Halloween Fright Fest -7:00pm</Text>
            </View>

        </View>
    );
}

export default UpcomingEventCard;

const STYLES = {
    container: {
        flex: 1,
        flexDirection: 'row',
        borderTopWidth: 20,
        borderColor: 'orange',
        margin: 5
    },
    leftContainer: {
        flex: 1,
        justifyContent: 'center',
        borderLeftWidth: 2,
        borderBottomWidth: 2,
        borderTopWidth: 2,
        borderColor: '#bfbfbf',
        padding: 10
    },
    rightContainer: {
        flex: 2,
        justifyContent: 'center',
        borderWidth: 2,
        borderColor: '#bfbfbf',
        padding: 10
    },
    title: {
        fontSize: 14,
        textAlign: 'center'
    },
    title1: {
        fontSize: 14,
        textAlign: 'left'
    }
}
