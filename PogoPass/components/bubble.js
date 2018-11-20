import React from 'react';
import {View, Text, Platform} from 'react-native';

import {Constants} from 'expo';

export default class Bubble extends React.Component {

    render() {
        return (
            <View style={STYLES.bubbleContainer}>
                <Text style={STYLES.bubbleText}>{this.props.number}</Text>
            </View>
        );
    }
}


const STYLES = {
	bubbleContainer: {
		position: 'absolute',
        top: Platform.OS === 'ios' ? Constants.statusBarHeight - 3 : 0,
		right: 5,
		borderRadius: 50,
		backgroundColor: 'red',
		justifyContent: 'center',
		alignItems: 'center',
		zIndex: 1,
		margin: 6,
		paddingHorizontal: 3,
		paddingVertical: 1,
		minWidth: 17
	},
	bubbleText: {
		fontSize: 12,
		color: 'white',
		textAlign: 'center'
	}
}
