import React from 'react';
import NavigationBar from 'react-native-navbar';
import {Styles, PassStyles, VenueTotalStyles, ShareStyles} from '../../../assets/styles/styles';
import {View, Button, Text, AppRegistry, StyleSheet, Animated, Image, Easing, ScrollView} from 'react-native';
import ProductCard from '../../../components/cart/product-card.js'


export default class Cart extends React.Component {


	render() {

	  return (
			<View style={STYLES.container}>

				<View>
					<Text style={STYLES.title}>
						Cart
					</Text>

					<ScrollView style={STYLES.productDetailsScrollContainer}>

						<View style={STYLES.productDetailsContainer}>
							<Text style={STYLES.productDetailsText}>Details</Text>
							<ProductCard/>
						</View>
					</ScrollView>

				</View>

			</View>
	  )
	}
}


const STYLES = {
	container: {
		flex: 1
	},
	title: {
		color: 'white',
		minWidth: '100%',
		fontSize: 25,
		fontWeight: 'bold',
		textAlign: 'center',
		alignItems: 'center',
		justifyContent: 'center',
		padding: 10,
		opacity: .95,
		backgroundColor: 'rgba(0, 0, 0, 0.6)'
	},
	productDetailsContainer: {
		justifyContent: 'center',
		width: '100%',
		backgroundColor: 'white',
		borderRadius: 10
	},
	productDetailsScrollContainer: {
		padding: 20,
		width: '100%'
	},
	productDetailsText: {
		fontSize: 18,
		margin: 20
	}
}
