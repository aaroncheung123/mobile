import React from 'react';
import { StyleSheet, Text, View, ImageBackground, TextInput, AsyncStorage, StatusBar} from 'react-native';
import Login from './views/login';
import Forgot from './views/forgot';
import Account from './views/account';
import {Styles} from './assets/styles/styles'
import { MemoryRouter, Route, Redirect } from "react-router-dom";
import AppNavigator from './views/appnavigator';

import '../EliteWorksLibrary/global-util'


export default class App extends React.Component {

  componentDidMount() {
    AsyncStorage.getItem('customer_api_key').then((value) => {
      if (value != null){
        this.defaultRoute = '/account';
      }
      else{
        this.defaultRoute = '/login';
      }
      this.router.history.push(this.defaultRoute);
    });

  }

  render() {
    return (
        <View style={Styles.container} >

          <StatusBar barStyle="dark-content"/>

          <ImageBackground
            source={require('./assets/images/backgrounds/rollercoaster_background.jpg')}
            style={Styles.backgroundImage}>
          </ImageBackground>
        </View>
        <AppNavigator/>

    );
  }
}
