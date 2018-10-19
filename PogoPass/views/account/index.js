import React from 'react';
import { Platform, View, Text, ScrollView, TouchableWithoutFeedback } from 'react-native';
import {Styles, IconInputStyles} from '../../assets/styles/styles'
import {Icon, Button} from 'react-native-elements'
import {MemoryRouter, Route, IndexRedirect} from 'react-router';

import PassManager from './pass-manager/index'
import AccountInformation from './account-information/index'
import Events from './events/index'
import Notifications from './notifications/index'
import Refer from './refer/index'
import BottomMenu from '../../components/bottom-menu'

const ELITE_WORKS_ORANGE = '#faa31a'

export default class AccountNavigation extends React.Component {

  constructor(props)
  {
    super(props);
  }

  componentDidMount() {
    this.router.history.push('/pass-manager');
    this.forceUpdate();
  }

  updatePath(path) {
    this.router.history.push(path);
    //this.setState({sideMenuOpen: false}, this.updateSideMenu)
  }

  render()
  {
    let path = (this.router) ? this.router.history.location.pathname : '';

    return (

      <MemoryRouter ref={e => this.router = e}>
        <View>
          <ScrollView style={STYLES.container}>
            <Route path="/pass-manager" component={PassManager} />
            <Route path="/account-information" component={AccountInformation} />
            <Route path="/events" component={Events} />
            <Route path="/notifications" component={Notifications} />
            <Route path="/refer" component={Refer} />
          </ScrollView>

          {/*Bottom Menu*/}
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

        </View>

      </MemoryRouter>

    )
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
  container: {
    flex: 1,
    width: '100%'
  }
}

// if (this.router){
//   console.log(this.router.history.location.pathname);
// }
