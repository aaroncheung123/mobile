import React from 'react';
import NavigationBar from 'react-native-navbar';
import {Styles, PassStyles, VenueTotalStyles, ShareStyles} from '../../../assets/styles/styles';
import {View, AsyncStorage, Text, ScrollView, Modal, TouchableHighlight, RefreshControl, Share} from 'react-native';
import Panel from '../../../components/animations/panel';

export default class AccountInformation extends React.Component {

	render() {
		return (
			<View>
				<ScrollView style={STYLES.container}>
	        <Panel title="A Panel with short content text">
	          <Text>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</Text>
	        </Panel>
	        <Panel title="A Panel with long content text">
	          <Text>Lorem ipsum...</Text>
	        </Panel>
	        <Panel title="Another Panel">
	          <Text>Lorem ipsum dolor sit amet...</Text>
	        </Panel>
	      </ScrollView>
			</View>

		);
	}
}

const STYLES = {
  container: {
		flex            : 1,
		backgroundColor : '#f4f7f9',
		paddingTop      : 30
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
