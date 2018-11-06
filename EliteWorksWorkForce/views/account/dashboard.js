import React from 'react';
import {StyleSheet, View, TextInput, Image, Keyboard, TouchableWithoutFeedback, Text, Animated, TouchableHighlight} from 'react-native';
import DealCard from '../../components/deal-card.js'

export default class Dashboard extends React.Component {

    render() {
        return (
            <View>
                <DealCard/>
            </View>
        )
    }

}
