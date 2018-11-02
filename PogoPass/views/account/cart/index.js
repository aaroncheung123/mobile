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
							<Text style={STYLES.productDetailsText}>Product Details (2)</Text>
							<ProductCard/>
							<ProductCard/>
						</View>
						<View style={STYLES.transparentFiller}></View>
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
		opacity: .9,
		borderRadius: 10,
		borderWidth: 2,
		borderColor: '#bfbfbf',
		padding: 10,
	},
	productDetailsScrollContainer: {
		padding: 15,
		width: '100%'
	},
	productDetailsText: {
		flex: 1,
		width: '60%',
		fontSize: 18,
		fontWeight: 'bold',
		margin: 20,
		borderBottomWidth: 2,
		borderColor: '#bfbfbf',
		paddingBottom: 20,
		marginBottom: 20,
	},
	transparentFiller: {
			height: 250,
	}
}
