import React from 'react';
import { Platform, View, Text, ScrollView, TouchableWithoutFeedback } from 'react-native';
import {Styles, IconInputStyles} from '../../assets/styles/styles'
import {Icon, Button} from 'react-native-elements'
import {MemoryRouter, Route, IndexRedirect} from 'react-router';

import PassManager from './pass-manager/index'
import AccountInformation from './account-information/index'
import Events from './events/index'
import News from './news/index'
import Cart from './cart/index'
import SpringPanel from '../../components/spring-panel.js'

const ELITE_WORKS_ORANGE = '#faa31a'

export default class AccountNavigation extends React.Component {

  constructor(props)
  {
    super(props);
    this.state = {
      showSpringPanel: true,
      springPanelTitle: '',
      springPanelContent: null
    }
		this.handleSpringPanelClose = this.handleSpringPanelClose.bind(this);
    this.handleShowSpringPanel = this.handleShowSpringPanel.bind(this);
  }

  componentDidMount() {
    this.updatePath('/pass-manager');
  }

  updatePath(path) {
    this.router.history.push(path);
    this.forceUpdate();
  }

  handleSpringPanelClose()
	{
		this.setState({
			springPanelTitle: '',
			springPanelContent: null
		})
	}

  handleShowSpringPanel(title, content){
    this.setState({
      springPanelTitle: title,
      springPanelContent: content
    }, () => {
      if (this.springPanel) {
        this.springPanel.open();
      }
    })
  }

  render()
  {
    let path = (this.router) ? this.router.history.location.pathname : '';

    return (

      <MemoryRouter ref={e => this.router = e}>
        <View style={STYLES.fullScreenContainer}>
          <View style={STYLES.scrollViewContainer}>
            <Route path="/news" render={(props) => <News {...props} onShowSpringPanel={this.handleShowSpringPanel}/>} />
            <Route path="/account-information" component={AccountInformation} />
            <Route path="/pass-manager"  render={(props) => <PassManager {...props} onShowSpringPanel={this.handleShowSpringPanel}/>} />
            <Route path="/events" component={Events} />
            <Route path="/cart" component={Cart} />
          </View>

          <SpringPanel ref={e => this.springPanel = e} title={this.state.springPanelTitle} content={this.state.springPanelContent} onClose={this.handleSpringPanelClose}/>

          {/*Bottom Menu*/}
          <View style={STYLES.accountMenu.container}>
            <View style={STYLES.accountMenu.menuContainer}>
              <AccountMenuItem
                onPress={() => this.updatePath('/news')}
                active={path === '/news'}
                icon="newspaper-o"
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
                onPress={() => this.updatePath('/cart')}
                active={path === '/cart'}
                icon="shopping-cart"
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
    width: '100%',
    height: '100%'
  },
  accountMenu: {
    container: {
      backgroundColor:'white',
      borderTopLeftRadius: 30,
      borderTopRightRadius: 30,
      width: "100%",
      height: 60,
      marginTop: -40
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
