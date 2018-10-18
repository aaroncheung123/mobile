import React from 'react';
import { Platform, View, Text } from 'react-native';
import { createSwitchNavigator } from 'react-navigation';

import PassManager from './pass-manager/index'
import {Styles, IconInputStyles} from '../../assets/styles/styles'


import {Icon, Button} from 'react-native-elements'
const ACCOUNT_SWITCH_NAVIGATOR = createSwitchNavigator({
  PassMangerStack: {
    screen: PassManager
  }
});



export default class AccountNavigation extends React.Component {

  constructor(props)
  {
    super(props);
  }


  handlePress() {
    console.log('test');
    console.log(this.testRef);
  }

  render() 
  {
    return (

      <View>

        <ACCOUNT_SWITCH_NAVIGATOR ref={e => this.testRef = e} />

        <View>
                <Button
                  title="Forgot your password?"
                  icon={{name: 'question', type: 'evilicon', size: 15, color: "white"}}
                  buttonStyle={Styles.link}
                  color="white"
                  onPress={this.handlePress}
                />
        </View>

      </View>

    )
  }



}
