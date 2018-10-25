import React from 'react';
import {View, Text, TouchableWithoutFeedback, TextInput, TouchableHighlight} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

export default class Blurb extends React.Component {

	updatePath(path) {
		this.props.history.push(path);
	}

    render() {
        return (
            <View style={STYLES.wholeContainer}>
                <View style={STYLES.topMenu}>
                    <TouchableWithoutFeedback onPress={() => this.updatePath('/account-main')}>
                             <Icon name='arrow-left' size= {25} color='white'/>
                    </TouchableWithoutFeedback>

                    <Text style={STYLES.textStyle}>Addresses</Text>

                </View>
            </View>
        );
    }
}

const STYLES = {
	wholeContainer:{
		flex: 1
	},
	topMenu: {
		flexDirection: 'row',
		justifyContent: 'flex-start',
		alignItems: 'center',
		width:'100%',
		backgroundColor: 'orange',
		padding: 17,
	},
	textStyle: {
		fontSize: 20,
		color: 'white',
		paddingLeft: 20
	},
}
