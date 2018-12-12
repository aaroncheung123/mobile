import React from 'react';
import {StyleSheet, View, ScrollView, TextInput, Image, Keyboard, TouchableWithoutFeedback, Text, Animated, AsyncStorage} from 'react-native';
import {MemoryRouter, Route, Redirect} from "react-router-dom";
import {Icon} from 'react-native-elements';
import {Constants} from 'expo';
import {EliteWorksOrange, AccountContentGrey, AccountMenuGrey, Blueberry, AppleCore} from '../assets/styles/constants';
import GestureRecognizer from 'react-native-swipe-gestures';

import AccountDashBoard from './account/dashboard';
import AccountTimeClock from './account/timeclock';
import AccountWorkOrders from './account/workorders';
import LoginModal from './account/login-modal';
import SpringPanel from '../components/spring-panel';
import SidePanel from '../components/side-panel';

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
			showLoginModal: false,
			showSpringPanel: true,
			springPanelTitle: '',
			springPanelContent: null,
			sidePanelTitle: '',
			sidePanelContent: null,
			title: ''
		}

		this.updateSideMenu = this.updateSideMenu.bind(this);
		this.updatePath = this.updatePath.bind(this);
		this.populateData = this.populateData.bind(this);
		this.handleLogout = this.handleLogout.bind(this);
		this.handleShowSpringPanel = this.handleShowSpringPanel.bind(this);
		this.handleSpringPanelClose = this.handleSpringPanelClose.bind(this);
		this.handleShowSidePanel = this.handleShowSidePanel.bind(this);
		this.handleSidePanelClose = this.handleSidePanelClose.bind(this);
    this.handleComplete = this.handleComplete.bind(this);
	}

	componentDidMount() {
		this.updatePath('/dashboard');
		this.populateData();
	}

	updateSideMenu() {
		if (this.state.sideMenuOpen) Animated.timing(this.state.sideMenuWidth, {toValue: SIDE_MENU_WIDTH, duration: 200}).start(() => this.setState({sideMenuShowContent: true}));
		else this.setState({sideMenuShowContent: false}, () => {Animated.timing(this.state.sideMenuWidth, {toValue: 0, duration: 200}).start()});
	}

	updatePath(path) {
		if(path == '/dashboard'){
			this.setState({title: 'Dashboard'});
		}
		else if(path == '/orders'){
			this.setState({title: 'Work Orders'});
		}
		else if(path == '/time'){
			this.setState({title: 'Time'});
		}
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

	handleSpringPanelClose() {
		this.setState({
			springPanelTitle: '',
			springPanelContent: null
		})
	}

	handleShowSpringPanel(title, content) {
		this.setState({
			springPanelTitle: title,
			springPanelContent: content
		}, () => {
			if (this.springPanel) {
				this.springPanel.open();
			}
		})
	}

	handleSidePanelClose() {
		this.setState({
			sidePanelTitle: '',
			sidePanelContent: null
		})
	}

	handleShowSidePanel(title, content) {
		this.setState({
			sidePanelTitle: title,
			sidePanelContent: content
		}, () => {
			if (this.sidePanel) {
				this.sidePanel.open();
			}
		})
	}

	handleComplete(){
		this.springPanel.handleClose();
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
								color='#F7882F'
								size={25}
								onPress={() => this.setState({sideMenuOpen: !this.state.sideMenuOpen}, this.updateSideMenu)}
							/>
						</View>
						<View style={TOP_MENU_STYLES.companyNameContainer}>
							<Text style={TOP_MENU_STYLES.companyName}>{this.state.title}</Text>
						</View>

					</View>

					{/*content*/}
						<View style={CONTENT_STYLES.container}>
							<Route path="/dashboard" render={(props) =>
	              <AccountDashBoard {...props}
	                  onComplete={this.handleComplete}
	                  onShowSpringPanel={this.handleShowSpringPanel}
	                  onShowSidePanel={this.handleShowSidePanel}/>} />
							<Route path="/orders" render={(props) =>
                <AccountWorkOrders {...props}
										onComplete={this.handleComplete}
                    onShowSpringPanel={this.handleShowSpringPanel}/>} />
							<Route path="/time" render={(props) =>
                <AccountTimeClock {...props}
                    onShowSpringPanel={this.handleShowSpringPanel}/>} />

							{/* slide up model */}
							<SpringPanel ref={e => this.springPanel = e} title={this.state.springPanelTitle} content={this.state.springPanelContent} onClose={this.handleSpringPanelClose}/>
							<SidePanel ref={e => this.sidePanel = e} title={this.state.sidePanelTitle} content={this.state.sidePanelContent} onClose={this.handleSidePanelClose}/>
						</View>

					{/*Bottom Menu*/}
					<View style={ACCOUNT_MENU.container}>
						<View style={ACCOUNT_MENU.menuContainer}>
							<AccountMenuItem
								onPress={() => this.updatePath('/dashboard')}
								active={path === '/dashboard'}
								icon="home"
							/>
							<AccountMenuItem
								onPress={() => this.updatePath('/orders')}
								active={path === '/orders'}
								icon="tasks"
							/>
							<AccountMenuItem
								onPress={() => this.updatePath('/time')}
								active={path === '/time'}
								icon="clock-o"
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
											Object.keys(this.state.workSpaces).map((key) =>
												<WorkSpaceSideBarRow
													key={key}
													workSpaceKey={key}
													workspace={this.state.workSpaces[key]}
													onSelectWorkspace={() => this.handleSelectWorkspace(key)}/>)
										}
										<TouchableWithoutFeedback onPress={() => this.setState({showLoginModal: true})}>
											<View style={SIDE_MENU_STYLES.workSpaceRowContainer}>
												<Text style={SIDE_MENU_STYLES.text}>+ New Workspace</Text>
											</View>
										</TouchableWithoutFeedback>
									</ScrollView>
								</View>
								<TouchableWithoutFeedback onPress={this.handleLogout}>
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
	return (
		<View>
			{
				GlobalUtil.webClientKey === props.workSpaceKey ? <View style={SIDE_MENU_STYLES.orangeCircle}></View> : null
			}
			<View style={SIDE_MENU_STYLES.orangeCircle}></View>
			<TouchableWithoutFeedback onPress={props.onSelectWorkspace}>

				<View style={SIDE_MENU_STYLES.workSpaceRowContainer}>
					<Text style={SIDE_MENU_STYLES.text}>{props.workspace.companyName}</Text>
				</View>
			</TouchableWithoutFeedback>
		</View>
	)
}

// we need a top menu

// then content

// then we need the footer menu


const STYLES = {
	container: {
		flex: 1,
		width: '100%',
		backgroundColor: 'white'
	}
}

const TOP_MENU_STYLES = {
	container: {
		flex: 1,
		width: '100%',
		maxHeight: 70,
		backgroundColor: 'white',
		elevation: 2,
		shadowOffset: { height: 1, width: 1 }, // IOS
		shadowOpacity: 2, // IOS
		shadowRadius: 2, //IOS
	},
	leftMenuIconContainer: {
		position: 'absolute',
		top: 25,
		left: 20,
	},
	companyName: {
		textAlign: 'center',
		color: 'black',
		fontSize: 20,
		fontWeight: 'bold',
		marginTop: 5
	},
	companyNameContainer: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center'
	}
}

const SIDE_MENU_STYLES = {
	container: {
		position: 'absolute',
		top: 70,
		bottom: 65,
		backgroundColor: 'white',
		elevation: 3,
		borderTopRightRadius: 5,
		borderBottomRightRadius: 5
	},
	orangeCircle:{
		position: 'absolute',
		left:0,
		backgroundColor: EliteWorksOrange,
		height: 20,
		width: 20,
		borderRadius: 50,
		margin: 15
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
		fontSize: 14,
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
		borderColor: '#dddddd',
		borderBottomWidth: 1
	}
}

const CONTENT_STYLES = {
	container: {
		flex: 1,
		width: '100%',
	}
}

const ACCOUNT_MENU = {
	container: {
		flex: 1,
		width: '100%',
		backgroundColor: 'white',
		maxHeight: 65,
		alignItems: 'center',
		justifyContent: 'center',
		elevation: 2,
		borderTopLeftRadius: 20,
		borderTopRightRadius: 20
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
