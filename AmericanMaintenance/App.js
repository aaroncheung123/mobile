import React from 'react';
import {StyleSheet, Text, View, ImageBackground, TextInput, AsyncStorage, StatusBar} from 'react-native';
import {MemoryRouter, Route, Redirect} from "react-router-dom";
import {Constants, LinearGradient} from 'expo';

import Login from './views/login';
import Account from './views/account';

import '../EliteWorksLibrary/global-util'

export default class App extends React.Component {

  componentDidMount() {
    // look for workspaces
    this.defaultRoute = '/login';
    AsyncStorage.getItem('workspaces').then((value) => {
      // set default route as login
      this.defaultRoute = '/login';
      let workspaces = {}


      if (!GlobalUtil.isEmpty(value)) {
        if (!GlobalUtil.isEmpty(value)) workspaces = JSON.parse(value);
      }
      else this.router.history.push(this.defaultRoute);


      if (Object.keys(workspaces).length > 0) {
        AsyncStorage.getItem('workspaceSelected').then((selectedWorkspace) => {

          if (!GlobalUtil.isEmpty(selectedWorkspace)) {
            GlobalUtil.webClientKey = selectedWorkspace;
            GlobalUtil.webClientApiKey = workspaces[selectedWorkspace].apiKey;
            this.defaultRoute = '/account';
          }
          this.router.history.push(this.defaultRoute);

        });
      }
      else this.router.history.push(this.defaultRoute);

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
              <Route path="/account" component={Account} />
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
