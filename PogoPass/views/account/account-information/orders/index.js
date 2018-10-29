import React from 'react';
import {View, Text} from 'react-native';
import TopMenu from '../../../../components/account-information/top-menu';

export default class Orders extends React.Component {

    updatePath(path) {
        this.props.history.push(path);
    }

    render() {
        return (
            <View>
                <TopMenu title= 'Orders' onPress={() => this.updatePath('/account-main')}/>
                <Text>Test 123</Text>
            </View>
        );
    }
}
