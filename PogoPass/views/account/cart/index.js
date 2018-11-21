import React from 'react';
import NavigationBar from 'react-native-navbar';
import {Styles, PassStyles, VenueTotalStyles, ShareStyles} from '../../../assets/styles/styles';
import {View, Text,ScrollView, TouchableOpacity, TextInput, WebView, Dimensions} from 'react-native';
import ProductCard from './product-card.js';
import { Button } from 'react-native-elements';


export default class Cart extends React.Component {

	constructor(props){
		super(props);
		this.screenHeight = Dimensions.get('window').height - 275;
		this.screenWidth = Dimensions.get('window').width;
	}

	handleCheckout(){

	}

	render() {

	  return (
			<View style={STYLES.container}>
				<WebView
					source = {{ uri:'https://www.pogopass.com/cart' }}
				/>
			</View>
	  )
	}
}


const STYLES = {
	container: {
		 height: Dimensions.get('window').height,
	},
	productDetailsContainer: {
		justifyContent: 'center',
		width: '100%',
		borderRadius: 10,
		padding: 10,
		marginBottom: 200
	},
	productDetailsScrollContainer: {
		padding: 15,
		width: '100%'
	},
	orderSummaryContainer: {
		position: 'absolute',
		width: '100%',
		bottom: 0,
		height: 170,
		padding: 20,
		paddingBottom: 45,
		borderTopLeftRadius: 15,
		borderTopRightRadius: 15,
		backgroundColor: 'rgba(0, 0, 0, 0.6)'
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


// <View>
// 		<ScrollView style={STYLES.productDetailsScrollContainer}>
// 			<View style={STYLES.productDetailsContainer}>
// 				<ProductCard/>
// 				<ProductCard/>
// 				<ProductCard/>
// 			</View>
// 		</ScrollView>
//
//
// 		<View style={STYLES.orderSummaryContainer}>
//
// 			<View style={STYLES.subtTotal}>
// 				<View style={STYLES.textInputContainer}>
// 					<TextInput
// 					 underlineColorAndroid = "transparent"
// 					 placeholder = "Promo, Referral, or Gift Code"
// 					 placeholderTextColor = "gray"/>
// 				</View>
//
// 				<TouchableOpacity
// 					onPress={this.handleCheckout}
// 					style={STYLES.buttonStyle}>
// 					<Text style={STYLES.bodyText1}>Apply</Text>
// 				</TouchableOpacity>
// 			</View>
//
//
// 			<View style={STYLES.subtTotal}>
// 					<Text style={STYLES.bodyText}>Subtotal: $99.95</Text>
// 					<TouchableOpacity
// 						onPress={this.handleCheckout}
// 						style={STYLES.buttonStyle}>
// 						<Text style={STYLES.bodyText1}>Checkout</Text>
// 					</TouchableOpacity>
// 			</View>
//
//
// 		</View>
// </View>
