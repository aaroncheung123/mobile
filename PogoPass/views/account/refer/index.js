import React from 'react';
import NavigationBar from 'react-native-navbar';
import {Styles, PassStyles, VenueTotalStyles, ShareStyles} from '../../../assets/styles/styles';
import {View, Button, AsyncStorage, Text, ScrollView, Modal, TouchableHighlight, RefreshControl, Share} from 'react-native';
import SlidingUpPanel from 'rn-sliding-up-panel';

export default class Refer extends React.Component {

	state = {
		visible: false
	}

	render() {
		return (
			<View style={styles.container}>
				<Button title='Show panel' onPress={() => this.setState({visible: true})} />
				<SlidingUpPanel
					visible={this.state.visible}
					onRequestClose={() => this.setState({visible: false})}>
					<View style={styles.container}>
						<Text>Here is the content inside panel</Text>
						<Button title='Hide' onPress={() => this.setState({visible: false})} />
					</View>
				</SlidingUpPanel>
			</View>
		);
	}
}

const styles = {
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
		height: 700
  }
}

//
// class MyComponent extends React.Component {

//
//   render() {
//     return (

//     )
//   }
// }
