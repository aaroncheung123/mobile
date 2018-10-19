import React from 'react';
import {View, Text} from 'react-native';

export default class Blurb extends React.Component {

    render() {
        return (
            <View>
                <View style={STYLES.container}>
                    <Text>Test 123</Text>
                </View>
            </View>
        );
    }
}



const STYLES = {
  container: {
    flex: 1,
    width: '100%',
		backgroundColor: 'black'
  }
}
