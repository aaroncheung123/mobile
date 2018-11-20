import React from 'react';
import NavigationBar from 'react-native-navbar';
import {Styles, PassStyles, VenueTotalStyles, ShareStyles} from '../../../../assets/styles/styles';
import {View, AsyncStorage, Text, ScrollView, Modal, TouchableHighlight, RefreshControl, Share, Dimensions, WebView} from 'react-native';
import InfoTab from './info-tab';


export default class AccountInformation extends React.Component {

	constructor(props)
  {
    super(props);
		this.state = {
			loginLink: ''
		}
		this.updatePath = this.updatePath.bind(this);
  }

	updatePath(path) {
		this.props.history.push(path);
	}

	componentDidMount(){
		Service.User.get(user => {
			EliteAPI.CRM.User.getLoginToken(
			 { user_id: user.id },
			 success => {
				 console.log(success);
				 this.setState({
					 loginLink: "http://www.pogopass.com/login/auto?one_time_login_token=" + success.data.user_login_token.token
				 })
			 },
			 failure => {
				 console.log(failure);
			 }
		 );
		})

	}

	render() {
		if (GlobalUtil.isEmpty(this.state.loginLink)) return null;

		return (
			<View style={STYLES.container}>
				<WebView
					source = {{ uri: this.state.loginLink + '&url=https://www.pogopass.com/user/account/profile' }}
				/>
			</View>
		);
	}
}

const STYLES = {
	container: {
		 height: Dimensions.get('window').height,
	},
	totalContainer: {
    justifyContent: 'flex-start',
    alignItems: 'center',
		flex: 1,
		width:'100%'
	},
	infoTabContainer: {
		width:'100%'
	},
	rowContainer: {
		flexDirection: 'row',
		justifyContent: 'center',
		flexWrap: 'wrap',
		marginTop: 25
	}
}
