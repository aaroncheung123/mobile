import React from 'react';
import {View, Text} from 'react-native';

export default class Blurb extends React.Component {
  render() {
    return (
        <View style={STYLES.blurbContainer}>
            <Text>Test 123</Text>
        </View>

    );
  }
}



const STYLES = {
  container: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor:'white',
  },
  blurbContainer: {
    flexDirection: 'column',
    flex: 1,
    width: '70%',
    height: 50,
    backgroundColor:'white',
    borderRadius: 10
  }
}
