import React from 'react';
import {View, Text, TouchableOpacity, ScrollView} from 'react-native';
import TopMenu from '../../../../components/account-information/top-menu';
import SubscriptionCard from '../../../../components/account-information/subscription-card';

export default class Subscriptions extends React.Component {

    updatePath(path) {
        this.props.history.push(path);
    }

    render() {
        return (
            <View>
                <TopMenu title= 'Subscriptions' onPress={() => this.updatePath('/account-main')}/>
                <ScrollView>
                    <SubscriptionCard/>
                    <SubscriptionCard/>
                    <View style={STYLES.transparentFiller}>
                    </View>
                </ScrollView>



            </View>
        );
    }
}

const STYLES = {
    transparentFiller: {
        flex: 1,
        height: 250,
    }
}
