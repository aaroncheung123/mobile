import React from 'react';
import {View, Text} from 'react-native';

export default class EventPanel extends React.Component {

    constructor(props)
    {
        super(props)
        this.state = {
        }
    }

    render() {
        return (
            <View>
                <Text>Test 123</Text>
            </View>
        );
    }
}

const STYLES = {
    container: {
        backgroundColor: 'white'
    }
}
