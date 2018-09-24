import React from 'react';
import {StyleSheet, Text, View, ImageBackground, TextInput, AsyncStorage, StatusBar} from 'react-native';
import {MemoryRouter, Route, Redirect} from "react-router-dom";
import {Constants, LinearGradient} from 'expo';

import Login from './views/login'

import '../EliteWorksLibrary/global-util'

export default class App extends React.Component {


  componentDidMount() {
    AsyncStorage.getItem('workspaces').then((value) => {
      if (value != null) this.defaultRoute = '/account';
      else this.defaultRoute = '/login';
      this.router.history.push(this.defaultRoute);
    });
  }

  render() {
    return (
      <MemoryRouter ref={(e) => this.router = e}>
        <View style={STYLES.container} >
          <StatusBar barStyle="light-content"/>
            <LinearGradient
              colors={['rgb(36,36,36)', 'rgb(66,66,66)', 'rgb(122,122,122)']}
              style={STYLES.gradient}
            >
              <Route path="/login" component={Login} />
            </LinearGradient>
        </View>
      </MemoryRouter>
    );
  }
}

const STYLES = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%'
  },
  gradient: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center'
  }
});