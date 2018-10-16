import React from 'react';
import { StyleSheet, Text, View, TextInput, Button } from 'react-native';
import ListItem from './src/components/ListItem/ListItems'

export default class App extends React.Component {
  state = {
    placeName: '',
    places: []
  };

  placeNameChangedHandler = val => {
    this.setState({
      placeName: val
    });
  };

  placeSubmitHandler = () => {
    if (this.state.placeName.trim() === '') {
      return;
    }
    this.setState(prevState => ({
        places: prevState.places.concat(prevState.placeName)
      }));
  };

  render() {
    const placesOutput = this.state.places.map((place, i) => (
      <Text key={i}>{place}</Text>
    ));
    return (
      <View style={styles.container}>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.placeInput}
            placeholder="Type here!"
            value={this.state.placeName}
            onChangeText={this.placeNameChangedHandler}
          />
        <Button title="Add" style={styles.placeButton} onPress={this.placeSubmitHandler} />
        </View>

        <View>
          {placesOutput}
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 35,
    alignItems: 'center',
    justifyContent: 'flex-start'
  },
  inputContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  placeInput: {
    width: '70%'
  },
  placeButton: {
    width: '30%'
  }

});
