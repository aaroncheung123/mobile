import React from 'react';
import NavigationBar from 'react-native-navbar';
import {Styles, PassStyles, VenueTotalStyles, ShareStyles} from '../../../assets/styles/styles';
import {View, AsyncStorage, Text, ScrollView, Modal, TouchableHighlight, RefreshControl, Share} from 'react-native';
import NewsDateSections from './news-date-sections';

export default class News extends React.Component {

	render() {
		return (

					<View style={STYLES.totalContainer}>


						<ScrollView>
							<View style={STYLES.filler}>
								<NewsDateSections onShowSpringPanel={this.props.onShowSpringPanel}/>
							</View>
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
	filler: {
			marginBottom: 100,
	}
}
