import React from 'react';
import {View, Text, ScrollView} from 'react-native';
import TopMenu from '../../../../components/account-information/top-menu';
import OrderCard from '../../../../components/account-information/order-card';

export default class Orders extends React.Component {

    updatePath(path) {
        this.props.history.push(path);
    }

    render() {
        return (
            <View>
                <TopMenu title= 'Orders' onPress={() => this.updatePath('/account-main')}/>
                <ScrollView>
                    <OrderCard/>
                    <OrderCard/>
                    <OrderCard/>
                </ScrollView>

            </View>
        );
    }
}
