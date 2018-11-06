import React from 'react';
import {StyleSheet, View, ScrollView} from 'react-native';
import DealCard from '../../components/deal-card.js'

export default class Dashboard extends React.Component {

    render() {
        return (
            <View>
                <ScrollView>
                    <DealCard/>
                </ScrollView>

            </View>
        )
    }

}
