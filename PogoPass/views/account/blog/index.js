import React from 'react';
import NavigationBar from 'react-native-navbar';
import {Styles, PassStyles, VenueTotalStyles, ShareStyles} from '../../../assets/styles/styles';
import {View, AsyncStorage, Text, ScrollView, Modal, TouchableHighlight, RefreshControl, Share} from 'react-native';
import BlogDateSections from '../../../components/blog/blog-date-sections';

export default class Blog extends React.Component {

	render() {
		return (

					<View style={STYLES.container}>
						<Text style={STYLES.title}>
							Blog
						</Text>
						<BlogDateSections/>
					</View>

		);
	}
}

const STYLES = {
  container: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center'
	},
	title: {
		color: 'white',
		fontSize: 35,
		marginTop: 15,
		marginBottom: 15
	}
}
