import React from 'react';
import {View, Text} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

export default class DateEventCard extends React.Component {
    render(){
        return(
            <View style={STYLES.dateContainer}>
                <View style={STYLES.leftDateContainer}>
                    <Text style={STYLES.textStyle}>Enchanted Island</Text>
                </View>
                <View style={STYLES.rightDateContainer}>
                    <Text style={STYLES.textStyle1}>Halloween Fright Night</Text>
                    <Text style={STYLES.textStyle1}>12:00PM-2:00PM </Text>
                </View>
            </View>
        );
    }
}

const STYLES = {
    dateContainer: {
        flexDirection: 'row',
        height: 80,
        width: 300,
        justifyContent: 'center',
        alignItems: 'center',
        margin: 10,
        opacity: .9,
        marginTop: 5
    },
    leftDateContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fcfcfc',
        height: '100%',
        borderTopLeftRadius: 10,
        borderBottomLeftRadius: 10,
    },
    rightDateContainer: {
        flex: 2,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#e0e0e0',
        height: '100%',
        borderTopRightRadius: 10,
        borderBottomRightRadius: 10
    },
    textStyle: {
        fontSize: 14,
        fontWeight: 'bold',
        textAlign: 'center'
    },
    textStyle1: {
        fontSize: 12,
        textAlign: 'center'
    },
    filler: {
        marginBotton: 300
    }
}
