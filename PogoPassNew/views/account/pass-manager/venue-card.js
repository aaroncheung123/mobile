import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const VenueCard = (props) => {
    return (
        <TouchableOpacity>
            <View style={STYLES.venueContainer}>
                <Icon name='slideshare' size= {25}/>
                <Text style={STYLES.title}>2/4 visits</Text>
            </View>
        </TouchableOpacity>
    );
}

export default VenueCard;

const STYLES = {
    venueContainer: {
        borderRadius: 20,
        backgroundColor: '#fcfcfc',
        borderWidth:2,
        borderColor:'orange',
        height: 80,
        width: 80,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: 'rgba(0,0,0, .4)', // IOS
        shadowOffset: { height: 1, width: 1 }, // IOS
        shadowOpacity: 1, // IOS
        shadowRadius: 1, //IOS
        elevation: 5, // Android
        margin: 10
    },
    title: {
        fontSize: 14,
        paddingTop: 10,
    }
}
