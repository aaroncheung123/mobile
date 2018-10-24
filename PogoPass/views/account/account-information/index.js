import React from 'react';
import NavigationBar from 'react-native-navbar';
import {Styles, PassStyles, VenueTotalStyles, ShareStyles} from '../../../assets/styles/styles';
import {View, AsyncStorage, Text, ScrollView, Modal, TouchableHighlight, RefreshControl, Share} from 'react-native';
import {MemoryRouter, Route, IndexRedirect} from 'react-router';
import InfoTab from '../../../components/info-tab.js';
import AccountMain from './account-main/index.js';
import Profile from './profile/index.js';


export default class AccountInformation extends React.Component {

	constructor(props)
  {
    super(props);
		this.updatePath = this.updatePath.bind(this);
  }

	componentDidMount() {
		this.updatePath('/account-main');
	}

	updatePath(path) {
		this.router.history.push(path);
		this.forceUpdate();
	}

	render() {
		return (


		<MemoryRouter ref={e => this.router = e}>
			<View style={STYLES.totalContainer}>

				<View style={STYLES.fullScreenContainer}>
					<ScrollView style={STYLES.scrollViewContainer}>
						<Route path="/account-main" component={AccountMain} />
						<Route path="/profile" component={Profile} />
					</ScrollView>
				</View>

			</View>
		</MemoryRouter>

			// <MemoryRouter ref={e => this.router = e}>
			// 	<View style={STYLES.fullScreenContainer}>
			// 		<ScrollView style={STYLES.scrollViewContainer}>
			// 			<Route path="/pass-manager" component={PassManager} />
			// 		</ScrollView>
			//
			// 		{/*Bottom Menu*/}
			// 		<View style={STYLES.accountMenu.container}>
			// 			<View style={STYLES.accountMenu.menuContainer}>
			// 				<AccountMenuItem
			// 					onPress={() => this.updatePath('/blog')}
			// 					active={path === '/blog'}
			// 					icon="bell"
			// 				/>
			// 				/>
			// 			</View>
			// 		</View>
			//
			// 	</View>
			//
			// </MemoryRouter>


		);
	}
}

const STYLES = {
	totalContainer: {
    justifyContent: 'flex-start',
    alignItems: 'center',
		flex: 1,
		width:'100%'
	},
	title: {
		color: 'white',
		fontSize: 35,
		paddingTop: 60,
		paddingBottom: 60,
		flex: 1
	},
	topSection:{
		flex: 1,
		backgroundColor: 'black'
	},
	bottomSection:{
		backgroundColor: 'white',
		maxHeight: '100%',
		maxWidth: '100%'
	}
}

//
// import React,{AppRegistry,StyleSheet,Text,ScrollView} from 'react-native';
// import Panel from '../../../components/animations/panel';  // Step 1
//
// var Panels = React.createClass({
//   render: function() {
//     return (  //Step 2
//       <ScrollView style={styles.container}>
//         <Panel title="A Panel with short content text">
//           <Text>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</Text>
//         </Panel>
//         <Panel title="A Panel with long content text">
//           <Text>Lorem ipsum...</Text>
//         </Panel>
//         <Panel title="Another Panel">
//           <Text>Lorem ipsum dolor sit amet...</Text>
//         </Panel>
//       </ScrollView>
//     );
//   }
// });
//
// var styles = StyleSheet.create({
//   container: {
//     flex            : 1,
//     backgroundColor : '#f4f7f9',
//     paddingTop      : 30
//   },
//
// });
//
// AppRegistry.registerComponent('Panels', () => Panels);


// <View style={STYLES.bottomSection}>
// </View>
