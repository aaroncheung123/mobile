import React from 'react';
import NavigationBar from 'react-native-navbar';
import {View, AsyncStorage, Text, ScrollView, Modal, TouchableHighlight, RefreshControl, Share} from 'react-native';

export default class BottomMenu extends React.Component {
    render() {
        return (
          <View style={STYLES.accountMenu.container}>
            <View style={STYLES.accountMenu.menuContainer}>
              <AccountMenuItem
                onPress={() => this.updatePath('/notifications')}
                active={path === '/notifications'}
                icon="bell"
              />
              <AccountMenuItem
                onPress={() => this.updatePath('/account-information')}
                active={path === '/account-information'}
                icon="user"
              />
              <AccountMenuItem
                onPress={() => this.updatePath('/pass-manager')}
                active={path === '/pass-manager'}
                icon="ticket"
              />
              <AccountMenuItem
                onPress={() => this.updatePath('/events')}
                active={path === '/events'}
                icon="calendar"
              />
              <AccountMenuItem
                onPress={() => this.updatePath('/refer')}
                active={path === '/refer'}
                icon="dollar"
              />
            </View>
          </View>
        );
    }
}

const AccountMenuItem = (props) => {
  return (
    <TouchableWithoutFeedback onPress={props.onPress}>
      <View style={STYLES.accountMenu.menuItemContainer}>
        <Icon
          name={props.icon}
          type='font-awesome'
          color={props.active ? ELITE_WORKS_ORANGE : '#dddddd'}
          size={30}
        />
        <Text style={{color: (props.active ? ELITE_WORKS_ORANGE : '#dddddd')}}>{props.title}</Text>
      </View>
    </TouchableWithoutFeedback>
  )
}

const STYLES = {
  accountMenu: {
    container: {
      flex: 1,
      width: '100%',
      backgroundColor: 'white',
      maxHeight: 65,
      alignItems: 'center',
      justifyContent: 'center',
    },
    menuContainer: {
      flexDirection: 'row',
      flex: 1,
      maxWidth: 300,
      width: '100%'
    },
    menuItemContainer: {
      width: '20%',
      height: '100%',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: 'white'
    }
  },
}
