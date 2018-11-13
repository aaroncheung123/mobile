import React from 'react';
import NavigationBar from 'react-native-navbar';
import {Styles, PassStyles, VenueTotalStyles, ShareStyles} from '../../../assets/styles/styles';
import {View, Text,ScrollView, TouchableOpacity, TextInput} from 'react-native';
import ProductCard from '../../../components/cart/product-card.js';
import { Button } from 'react-native-elements';


export default class Cart extends React.Component {

	handleCheckout(){

	}


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
					</ScrollView>


					<View style={STYLES.orderSummaryContainer}>

						<View style={STYLES.subtTotal}>
							<View style={STYLES.textInputContainer}>
								<TextInput
								 underlineColorAndroid = "transparent"
								 placeholder = "Promo, Referral, or Gift Code"
								 placeholderTextColor = "gray"/>
							</View>

							<TouchableOpacity
								onPress={this.handleCheckout}
								style={STYLES.buttonStyle}>
								<Text style={STYLES.bodyText1}>Apply</Text>
							</TouchableOpacity>
						</View>


						<View style={STYLES.subtTotal}>
								<Text style={STYLES.bodyText}>Subtotal: $99.95</Text>
								<TouchableOpacity
									onPress={this.handleCheckout}
									style={STYLES.buttonStyle}>
									<Text style={STYLES.bodyText1}>Checkout</Text>
								</TouchableOpacity>
						</View>


					</View>

				</View>

			</View>
	  )
	}
}


const STYLES = {
	container: {
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
		padding: 10,
		marginBottom: 100
	},
	productDetailsScrollContainer: {
		height: '65%',
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
	orderSummaryContainer: {
		height: 200,
		padding: 20,
		paddingBottom: 90,
		borderTopLeftRadius: 15,
		borderTopRightRadius: 15,
		borderWidth: 2,
		borderColor: 'white'
	},
	bodyText: {
		fontSize: 18,
		color: 'white'
	},
	bodyText1: {
		fontSize: 14,
		color: 'white',
		textAlign: 'center'
	},
	subtTotal: {
		flex: 1,
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center'
	},
	buttonStyle: {
		backgroundColor: 'orange',
		borderRadius: 5,
		padding: 10,
		width: 90
	},

	textInputContainer: {
		width: 200,
		backgroundColor: 'white',
		borderRadius: 5,
		paddingVertical: 5,
		paddingHorizontal: 10
	}
}
