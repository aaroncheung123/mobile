import React from 'react';
import {View, Text} from 'react-native';

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
		top: 0,
		right: 0,
		borderRadius: 50,
		backgroundColor: 'red',
		justifyContent: 'center',
		alignItems: 'center',
		zIndex: 1,
		margin: 6,
		paddingHorizontal: 3,
		paddingVertical: 1
	},
	bubbleText: {
		fontSize: 12,
		color: 'white',
		textAlign: 'center'
	}
}
