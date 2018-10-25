import React from 'react';
import {View, Text, TouchableWithoutFeedback, TextInput, TouchableHighlight} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import TopMenu from '../../../../components/account-information/top-menu';
import AddressCard from '../../../../components/account-information/address-card';

export default class Blurb extends React.Component {

	

	updatePath(path) {
		this.props.history.push(path);
	}

    render() {
        return (
            <View style={STYLES.container}>
                <TopMenu title= 'Addresses' onPress={() => this.updatePath('/account-main')}/>

								<AddressCard/>
								<AddressCard/>
								<AddressCard/>
								<AddressCard/>
								<AddressCard/>
								<AddressCard/>


            </View>
        );
    }
}

const STYLES = {
	container:{
		flex: 1
	},
}
