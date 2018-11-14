import React from 'react';
import {View, Text, TouchableOpacity, ScrollView} from 'react-native';
import TopMenu from '../top-menu';
import SubscriptionCard from './subscription-card';

export default class Subscriptions extends React.Component {

    updatePath(path) {
        this.props.history.push(path);
    }

    render() {
        return (
            <View>
                <TopMenu title= 'Subscriptions' onPress={() => this.updatePath('/account-main')}/>
                <ScrollView>
                    <View style={STYLES.filler}>
                        <SubscriptionCard/>
                        <SubscriptionCard/>
                        <SubscriptionCard/>
                    </View>
                </ScrollView>



            </View>
        );
    }
}

const STYLES = {
    filler: {
        marginBottom: 150
    }
}
