import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import '../EliteWorksLibrary/global-util'

export default class App extends React.Component {

  componentDidMount() {
    let structure = new EliteAPI.Models.CRM.User();
    console.log(structure);
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>Open up App.js to start working on your app!</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
