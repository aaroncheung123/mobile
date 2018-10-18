
import React, { Component } from 'react';
import { View, Text, StyleSheet, Tabs } from 'react-native'
import {Styles, PassStyles, VenueTotalStyles, ShareStyles, TouchableWithoutFeedback, ScrollView} from '../assets/styles/styles';
import {MemoryRouter, Route, Redirect} from "react-router-dom";
import Login from '../views/login';
import Forgot from '../views/forgot';
import {Icon} from 'react-native-elements';
//import NavigationBar from 'react-navigation';

class Navigator extends Component {
  state = {}



}



export default Navigator;





// updatePath(path) {
// 	this.router.history.push(path);
// }
//
//
// render() {
// 	let path = (this.router) ? this.router.history.location.pathname : '';
//
//
// 	return (
// 		<MemoryRouter ref={(e) => this.router = e}>
// 			<View
// 				onSwipeRight={() => this.setState({sideMenuOpen: true}, this.updateSideMenu)}
// 				onSwipeLeft={() => this.setState({sideMenuOpen: false}, this.updateSideMenu)}
// 				style={Styles.container}
// 				config={{directionalOffsetThreshold: '100'}}
// 			>
//
// 				{/*content*/}
//
// 				<View>
// 					<ScrollView style={ContentStyles.container}>
// 						<Route path="/Login" component={Login} />
// 						<Route path="/Forgot" component={Forgot} />
// 					</ScrollView>
// 				</View>
//
// 				{/*Bottom Menu*/}
// 				<View style={AccountMenu.container}>
// 					<View style={AccountMenu.menuContainer}>
// 						<AccountMenuItem
// 							onPress={() => this.updatePath('/Login')}
// 							active={path === '/Login'}
// 							icon="home"
// 							title="Home"
// 						/>
// 						<AccountMenuItem
// 							onPress={() => this.updatePath('/Forgot')}
// 							active={path === '/Forgot'}
// 							icon="clipboard"
// 							title="Tasks"
// 						/>
// 						<AccountMenuItem
// 							onPress={() => this.updatePath('/Account')}
// 							active={path === '/Account'}
// 							icon="clock-o"
// 							title="Time Clock"
// 						/>
// 					</View>
// 				</View>
// 			</View>
// 		</MemoryRouter>
// 	);
// }


// const AccountMenuItem = (props) => {
// 	return (
// 		<TouchableWithoutFeedback onPress={props.onPress}>
// 			<View style={AccountMenu.menuItemContainer}>
// 				<Icon
// 					name={props.icon}
// 					type='font-awesome'
// 					color={props.active ? EliteWorksOrange : '#dddddd'}
// 					size={30}
// 				/>
// 				<Text style={{color: (props.active ? EliteWorksOrange : '#dddddd')}}>{props.title}</Text>
// 			</View>
// 		</TouchableWithoutFeedback>
// 	)
// }
//
// const ContentStyles = {
// 	container: {
// 		flex: 2,
// 		width: '100%',
// 		//backgroundColor: AccountContentGrey
// 	}
// }
//
// const AccountMenu = {
// 	container: {
// 		flex: 3,
// 		width: '100%',
// 		backgroundColor: 'black',
// 		maxHeight: 65,
// 		alignItems: 'center',
// 		justifyContent: 'center',
// 	},
// 	menuContainer: {
// 		flexDirection: 'row',
// 		flex: 1,
// 		maxWidth: 300,
// 		width: '100%'
// 	},
// 	menuItemContainer: {
// 		width: '33.333%',
// 		height: '100%',
// 		alignItems: 'center',
// 		justifyContent: 'center'
// 	}
// }
