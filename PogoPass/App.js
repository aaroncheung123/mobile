import React from 'react';
import { StyleSheet, Text, View, ImageBackground, TextInput, AsyncStorage, StatusBar} from 'react-native';
import Login from './views/login';
import Forgot from './views/forgot';
import Account from './views/account';
import {Styles} from './assets/styles/styles'
import { MemoryRouter, Route, Redirect } from "react-router-dom";
import './EliteWorksLibrary/global-util'
import AppNavigator from './views/appnavigator';


export default class App extends React.Component {

  constructor(props) {
    super(props)
    GlobalUtil.webClientKey = '0000000676';
  }

  componentDidMount() {
    AsyncStorage.getItem('customer_api_keys').then((value) => {
      if (value != null){
        this.defaultRoute = '/account';
        GlobalUtil.webClientApiKey = value;
      }
      else{
        this.defaultRoute = '/login';
      }
      this.router.history.push(this.defaultRoute);
    });
  }

  render() {
    return (
      <AppNavigator/>


    );
  }
}

// <View style={Styles.container} >
//   <StatusBar barStyle="dark-content"/>
//   <ImageBackground
//     source={require('./assets/images/backgrounds/rollercoaster_background.jpg')}
//     style={Styles.backgroundImage}>
//   </ImageBackground>
// </View>
