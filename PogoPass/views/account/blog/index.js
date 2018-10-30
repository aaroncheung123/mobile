import React from 'react';
import NavigationBar from 'react-native-navbar';
import {Styles, PassStyles, VenueTotalStyles, ShareStyles} from '../../../assets/styles/styles';
import {View, AsyncStorage, Text, ScrollView, Modal, TouchableHighlight, RefreshControl, Share} from 'react-native';
import BlogDateSections from '../../../components/blog/blog-date-sections';

export default class Blog extends React.Component {

	render() {
		return (

					<View style={STYLES.totalContainer}>
						<View>
							<Text style={STYLES.title}>
								News
							</Text>
						</View>

						<ScrollView>
							<BlogDateSections/>
						</ScrollView>

					</View>

		);
	}
}

const STYLES = {
  totalContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
		minWidth:'100%',
		minHeight: '100%'
	},
	title: {
		color: 'white',
		minWidth: '100%',
		fontSize: 30,
		backgroundColor: 'orange',
		textAlign: 'center',
		alignItems: 'center',
		justifyContent: 'center',
		padding: 20,
		opacity: .95
	}
}
