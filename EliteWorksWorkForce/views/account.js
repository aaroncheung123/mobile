

import React from 'react';
import {StyleSheet, View, ScrollView, TextInput, Image, Keyboard, TouchableWithoutFeedback, Text, Animated, AsyncStorage} from 'react-native';
import {MemoryRouter, Route, Redirect} from "react-router-dom";
import {Icon} from 'react-native-elements';
import {Constants} from 'expo';	
import {EliteWorksOrange, AccountContentGrey, AccountMenuGrey} from '../assets/styles/constants';
import GestureRecognizer from 'react-native-swipe-gestures';

import AccountDashBoard from './account/dashboard';
import AccountTimeClock from './account/timeclock';
import AccountWorkOrders from './account/workorders';
import LoginModal from './account/login-modal';

const SIDE_MENU_WIDTH = 300;

export default class Account extends React.Component {

	constructor(props) {

		super(props);

		this.state = {
			sideMenuShowContent: false,
			sideMenuOpen: false,
			sideMenuWidth: new Animated.Value(0),
			companyName: '',
			user: new EliteAPI.Models.CRM.User(),
			workSpaces: {},
			showLoginModal: false
		}

		this.updateSideMenu = this.updateSideMenu.bind(this);
		this.updatePath = this.updatePath.bind(this);
		this.populateData = this.populateData.bind(this);
		this.handleLogout = this.handleLogout.bind(this);
	}


	componentDidMount() {
		this.updatePath('/dashboard');
		this.populateData();
	}

	updateSideMenu()
	{
		if (this.state.sideMenuOpen) Animated.timing(this.state.sideMenuWidth, {toValue: SIDE_MENU_WIDTH, duration: 200}).start(() => this.setState({sideMenuShowContent: true}));
		else this.setState({sideMenuShowContent: false}, () => {Animated.timing(this.state.sideMenuWidth, {toValue: 0, duration: 200}).start()});
	}

	updatePath(path) {
		this.router.history.push(path);
		this.setState({sideMenuOpen: false}, this.updateSideMenu)
	}

	populateData() {
		Service.Config.get('COMPANY_NAME', (value) => {
			this.setState({companyName: GlobalUtil.ulify(value, 25)});
		}, '')

		Service.User.get((user) => {
			if (user) this.setState({user: user});
		})

		if (this.router) {
			let path = this.router.history.location.pathname;
			this.router.history.push('/');
			this.router.history.push(path);
		}
		AsyncStorage.getItem('workspaces').then((value) => {
			// set default route as login
			let workspaces = {}

			if (!GlobalUtil.isEmpty(value)) workspaces = JSON.parse(value) 
			else this.props.history.push('/login');


			if (Object.keys(workspaces).length > 0) this.setState({workSpaces: workspaces}); 
			else this.props.history.push('/login');
		});
	}

	handleLogout() {
		AsyncStorage.getItem('workspaces').then((value) => {
			// set default route as login
			let workspaces = {}

			if (!GlobalUtil.isEmpty(value)) workspaces = JSON.parse(value) 

			if (workspaces[GlobalUtil.webClientKey]) {
				delete workspaces[GlobalUtil.webClientKey];

				AsyncStorage.setItem('workspaces', JSON.stringify(workspaces), () => {

					let selectedWorkspace = undefined
					if (Object.keys(workspaces).length > 0) {
						selectedWorkspace = Object.keys(workspaces)[0];
			            GlobalUtil.webClientKey = selectedWorkspace;
			            GlobalUtil.webClientApiKey = workspaces[selectedWorkspace].apiKey
						Service.Config.refresh(() => {
							Service.User.refresh(() => {
								AsyncStorage.setItem('workspaceSelected', selectedWorkspace, () => {
									this.setState({workSpaces: workspaces}, this.populateData); 
								});
							})
						})
					}
					else 
					{
						AsyncStorage.removeItem('workspaceSelected').then(() => {
							this.props.history.push('/login');
						})
					}
				});	
			}

		});
	}

	handleSelectWorkspace = (key) => {
		AsyncStorage.setItem('workspaceSelected', key, () => {
			GlobalUtil.webClientKey = key;
			GlobalUtil.webClientApiKey = this.state.workSpaces[key].apiKey;
			this.forceUpdate();
			Service.Config.refresh(() => {
				Service.User.refresh(() => {
					this.populateData()
				})
			})
		});
	}

	render() {

		let path = (this.router) ? this.router.history.location.pathname : '';
		return (

			<MemoryRouter ref={(e) => this.router = e}>
				<View
					onSwipeRight={() => this.setState({sideMenuOpen: true}, this.updateSideMenu)}
					onSwipeLeft={() => this.setState({sideMenuOpen: false}, this.updateSideMenu)}
					style={STYLES.container}
					config={{directionalOffsetThreshold: '100'}}
				>
					{/*Top Menu*/}
					<View style={TOP_MENU_STYLES.container}>
						<View style={TOP_MENU_STYLES.leftMenuIconContainer}>
							<Icon
								name='bars'
								type='font-awesome'
								color='#dddddd'  
								size={35}
								onPress={() => this.setState({sideMenuOpen: !this.state.sideMenuOpen}, this.updateSideMenu)}
							/>
						</View>
						<Text style={TOP_MENU_STYLES.companyName}>{GlobalUtil.ulify(this.state.companyName, 25)}</Text>
					</View>

					{/*content*/}
					<TouchableWithoutFeedback onPress={() => this.setState({sideMenuOpen: false}, this.updateSideMenu)}>
						<ScrollView style={CONTENT_STYLES.container}>
							<Route path="/dashboard" component={AccountDashBoard} />
							<Route path="/orders" component={AccountWorkOrders} />
							<Route path="/time" component={AccountTimeClock} />
						</ScrollView>
					</TouchableWithoutFeedback>

					{/*Bottom Menu*/}
					<View style={ACCOUNT_MENU.container}>
						<View style={ACCOUNT_MENU.menuContainer}>
							<AccountMenuItem 
								onPress={() => this.updatePath('/dashboard')} 
								active={path === '/dashboard'} 
								icon="home"
								title="Home"
							/>
							<AccountMenuItem 
								onPress={() => this.updatePath('/orders')} 
								active={path === '/orders'} 
								icon="clipboard"
								title="Tasks"
							/>
							<AccountMenuItem 
								onPress={() => this.updatePath('/time')} 
								active={path === '/time'} 
								icon="clock-o"
								title="Time Clock"
							/>
						</View>
					</View>

					{/*Side Menu*/}
					<Animated.View style={{...SIDE_MENU_STYLES.container, width: this.state.sideMenuWidth}}>
						{
							this.state.sideMenuShowContent ? 
							<View style={SIDE_MENU_STYLES.innerContainer}>
								<View style={SIDE_MENU_STYLES.userNameContainer}>
									<Text style={SIDE_MENU_STYLES.text}>{this.state.user.full_name}</Text>
								</View> 
								<View style={SIDE_MENU_STYLES.companiesContainer}>
									<ScrollView>
										{
											Object.keys(this.state.workSpaces).map((key) => <WorkSpaceSideBarRow key={key} workSpaceKey={key} workspace={this.state.workSpaces[key]} onSelectWorkspace={() => this.handleSelectWorkspace(key)}/>)
										}
										<TouchableWithoutFeedback 
											onPress={() => this.setState({showLoginModal: true})}
										>
											<View style={{...SIDE_MENU_STYLES.workSpaceRowContainer, backgroundColor: '#222222'}}>
												<Text style={SIDE_MENU_STYLES.text}>Add New Workspace</Text>
											</View>
										</TouchableWithoutFeedback>
									</ScrollView>
								</View>
								<TouchableWithoutFeedback 
									
									onPress={this.handleLogout}
								>
									<View style={SIDE_MENU_STYLES.logoutContainer}>
										<Text style={SIDE_MENU_STYLES.text}>Logout</Text>
									</View>
								</TouchableWithoutFeedback>
							</View> : null
						}

					</Animated.View>

					<LoginModal visible={this.state.showLoginModal} onClose={() => this.setState({showLoginModal: false})} onUpdate={() => this.populateData()}/>

				</View>
			</MemoryRouter>
		)
	}
}

const AccountMenuItem = (props) => {
	return (
		<TouchableWithoutFeedback onPress={props.onPress}>
			<View style={ACCOUNT_MENU.menuItemContainer}>
				<Icon
					name={props.icon}
					type='font-awesome'
					color={props.active ? EliteWorksOrange : '#dddddd'}
					size={30}
				/>
				<Text style={{color: (props.active ? EliteWorksOrange : '#dddddd')}}>{props.title}</Text>
			</View>
		</TouchableWithoutFeedback>
	)
}

const WorkSpaceSideBarRow = (props) => {
	let backgroundColor = GlobalUtil.webClientKey === props.workSpaceKey ? EliteWorksOrange : '#222222'
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

// we need a top menu 

// then content

// then we need the footer menu


const STYLES = {
	container: {
		flex: 1,
		width: '100%'
	}
}

const TOP_MENU_STYLES = {
	container: {
		flex: 1,
		width: '100%',
		maxHeight: 70,
		backgroundColor: EliteWorksOrange
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
		borderBottomColor: AccountMenuGrey,
		borderBottomWidth: 1
	}
}

const CONTENT_STYLES = {
	container: {
		flex: 2,
		width: '100%',
		//backgroundColor: AccountContentGrey
	}
}

const ACCOUNT_MENU = {
	container: {
		flex: 3,
		width: '100%',
		backgroundColor: AccountMenuGrey,
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
		width: '33.333%',
		height: '100%',
		alignItems: 'center',
		justifyContent: 'center'
	}
}