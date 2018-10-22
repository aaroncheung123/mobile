import React from 'react';
import NavigationBar from 'react-native-navbar';
import {Styles, PassStyles, VenueTotalStyles, ShareStyles} from '../../../assets/styles/styles';
import {View, AsyncStorage, Text, ScrollView, Modal, TouchableHighlight, RefreshControl, Share} from 'react-native';
import BlogDateSections from '../../../components/blog/blog-date-sections';

export default class Blog extends React.Component {

	render() {
		return (

					<View style={STYLES.totalContainer}>
						<View style={STYLES.sectionTitle}>
							<Text style={STYLES.title}>
								Blog
							</Text>
						</View>

						<BlogDateSections/>

					</View>

		);
	}
}

const STYLES = {
  totalContainer: {
		flex:1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-start',
		backgroundColor:'gray'
	},
	sectionTitle:{
		flex: 1
	},
	title: {
		color: 'white',
		fontSize: 35
	}
}
