import React from 'react';
import { Platform, View, Text, ScrollView, TouchableWithoutFeedback } from 'react-native';
import {Styles, IconInputStyles} from '../../assets/styles/styles'
import {Icon, Button} from 'react-native-elements'
import {MemoryRouter, Route, IndexRedirect} from 'react-router';

import PassManager from './pass-manager/index'
import AccountInformation from './account-information/index'
import Events from './events/index'
import Blog from './blog/index'
import Refer from './refer/index'

const ELITE_WORKS_ORANGE = '#faa31a'

export default class AccountNavigation extends React.Component {

  constructor(props)
  {
    super(props);
  }

  componentDidMount() {
    this.updatePath('/account-information');
  }

  updatePath(path) {
    this.router.history.push(path);
    this.forceUpdate();
  }

  render()
  {
    let path = (this.router) ? this.router.history.location.pathname : '';

    return (

      <MemoryRouter ref={e => this.router = e}>
        <View style={STYLES.fullScreenContainer}>
          <ScrollView style={STYLES.scrollViewContainer}>
            <Route path="/pass-manager" component={PassManager} />
            <Route path="/account-information" component={AccountInformation} />
            <Route path="/events" component={Events} />
            <Route path="/blog" component={Blog} />
            <Route path="/refer" component={Refer} />
          </ScrollView>

          {/*Bottom Menu*/}
          <View style={STYLES.accountMenu.container}>
            <View style={STYLES.accountMenu.menuContainer}>
              <AccountMenuItem
                onPress={() => this.updatePath('/blog')}
                active={path === '/blog'}
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
  fullScreenContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.4)'
  },
  scrollViewContainer:{
    flex:1,
    width: '100%'
  },
  accountMenu: {
    container: {
      backgroundColor:'white',
      borderTopLeftRadius: 30,
      borderTopRightRadius: 30,
      width: "100%",
      height: 60
    },
    menuContainer: {
      flexDirection: 'row',
      flex: 1
    },
    menuItemContainer: {
      width: '20%',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: 'white',
      borderTopLeftRadius: 30,
      borderTopRightRadius: 30
    }
  }
}

// if (this.router){
//   console.log(this.router.history.location.pathname);
// }
