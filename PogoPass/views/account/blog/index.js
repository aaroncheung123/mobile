import React from 'react';
import NavigationBar from 'react-native-navbar';
import {Styles, PassStyles, VenueTotalStyles, ShareStyles} from '../../../assets/styles/styles';
import {View, AsyncStorage, Text, ScrollView, Modal, TouchableHighlight, RefreshControl, Share} from 'react-native';
import Blurb from '../../../components/blurb';

export default class Blog extends React.Component {

	render() {
		return (

					<View style={STYLES.container}>
						<Blurb/>
						<Blurb/>
						<Blurb/>
						<Blurb/>
						<Blurb/>
						<Blurb/>
						<Blurb/>
						<Blurb/>
					</View>

		);
	}
}

const STYLES = {
  container: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center'
	}
}
