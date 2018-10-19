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
const ACCOUNT_MENU_GRAY = 'black'


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
    console.log(path);
    this.router.history.push(path);
    //this.setState({sideMenuOpen: false}, this.updateSideMenu)
  }

  render()
  {
    let path = (this.router) ? this.router.history.location.pathname : '';
    {/*if (this.router){
      console.log(this.router.history.location.pathname);
    }*/}
    return (

      <MemoryRouter ref={e => this.router = e}>
        <View>
          <ScrollView style={CONTENT_STYLES.container}>
            <Route path="/pass-manager" component={PassManager} />
            <Route path="/account-information" component={AccountInformation} />
            <Route path="/events" component={Events} />
            <Route path="/notifications" component={Notifications} />
            <Route path="/refer" component={Refer} />
          </ScrollView>

          {/*Bottom Menu*/}
          <View>
            <Text>Hello</Text>
          </View>

        </View>

      </MemoryRouter>

    )
  }
}

const WorkSpaceSideBarRow = (props) => {
  let backgroundColor = GlobalUtil.webClientKey === props.workSpaceKey ? ELITE_WORKS_ORANGE : '#222222'
  return (
    <TouchableWithoutFeedback
      onPress={props.onSelectWorkspace}
    >
      <View style={{...SIDE_MENU_STYLES.workSpaceRowContainer, backgroundColor: backgroundColor}}>
        <Text style={SIDE_MENU_STYLES.text}>{props.workspace.companyName}</Text>
        <Text style={SIDE_MENU_STYLES.subText}>{props.workSpaceKey}</Text>
      </View>
    </TouchableWithoutFeedback>
  )
}

const STYLES = {
  topMenu: {
    container: {
      flex: 1,
      width: '100%',
      maxHeight: 70,
      backgroundColor: ELITE_WORKS_ORANGE
    },
    leftMenuIconContainer: {
      position: 'absolute',
      top: 25,
      left: 14,
    },
    companyName: {
      position: 'absolute',
      top: 27,
      left: 65,
      fontSize: 24,
      right: 35,
      textAlign: 'center',
      color: '#dddddd'
    }
  },
  container: {
    flex: 1,
    width: '100%'
  }
}


const SIDE_MENU_STYLES = {
  container: {
    position: 'absolute',
    top: 70,
    bottom: 65,
    backgroundColor: '#222222'
  },
  innerContainer: {
    minWidth: 300,
    flex: 1
  },
  userNameContainer: {
    flex: 1,
    maxHeight: 60,
    borderBottomWidth: 1,
    borderBottomColor: '#dddddd'
  },
  text: {
    flex: 1,
    color: '#dddddd',
    fontSize: 28,
    width: '100%',
    textAlign: 'center',
    padding: 15
  },
  subText: {
    flex: 1,
    color: '#dddddd',
    fontSize: 14,
    width: '100%',
    textAlign: 'center',
    marginTop: -15,
    paddingBottom: 15
  },
  companiesContainer: {
    flex: 2
  },
  logoutContainer: {
    flex: 3,
    maxHeight: 60,
    borderTopWidth: 1,
    borderTopColor: '#dddddd'
  },
  workSpaceRowContainer: {
    flex: 1,
    borderBottomColor: ACCOUNT_MENU_GRAY,
    borderBottomWidth: 1
  }
}

const CONTENT_STYLES = {
  container: {
    flex: 1,
    width: '100%',
    //backgroundColor: AccountContentGrey
  }
}
