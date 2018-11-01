import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const VenueEventCard = (props) => {
    return (
        <TouchableOpacity>
            <View style={STYLES.venueContainer}>
                <View style={STYLES.leftVenueContainer}>
                    <Icon name='slideshare' size= {45}/>
                </View>
                <View style={STYLES.rightVenueContainer}>
                    <Text style={STYLES.textStyle}>Enchanted Island</Text>
                </View>
            </View>
        </TouchableOpacity>
    );
}

export default VenueEventCard;

const STYLES = {
    venueContainer: {
        flexDirection: 'row',
        height: 120,
        width: 300,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: 'rgba(0,0,0, .4)', // IOS
        shadowOffset: { height: 1, width: 1 }, // IOS
        shadowOpacity: 1, // IOS
        shadowRadius: 1, //IOS
        elevation: 5, // Android
        margin: 10,
        opacity: .9
    },
    leftVenueContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fcfcfc',
        height: '100%',
        borderTopLeftRadius: 10,
        borderBottomLeftRadius: 10,
    },
    rightVenueContainer: {
        flex: 2,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#e0e0e0',
        height: '100%',
        borderTopRightRadius: 10,
        borderBottomRightRadius: 10
    },
    textStyle: {
        fontSize: 14
    }
}
