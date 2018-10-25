import React from 'react';
import {View, Text, TouchableWithoutFeedback, TextInput, TouchableHighlight} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import TopMenu from '../../../../components/account-information/top-menu';

export default class Blurb extends React.Component {

	updatePath(path) {
		this.props.history.push(path);
	}

    render() {
        return (
            <View style={STYLES.wholeContainer}>
                <TopMenu title= 'Addresses' onPress={() => this.updatePath('/account-main')}/>
            </View>
        );
    }
}

const STYLES = {
	wholeContainer:{
		flex: 1
	},
}
