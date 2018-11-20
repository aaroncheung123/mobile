import React from 'react';
import {View, Text, ScrollView, TouchableOpacity, WebView, Dimensions} from 'react-native';
import TopMenu from '../top-menu';
import PaymentCard from './payment-card';
import Icon from 'react-native-vector-icons/FontAwesome';
import SpringPanelPayment from './spring-panel-payment'

export default class PaymentCredit extends React.Component {

    constructor(props)
    {
        super(props);
        this.state = {
            paymentMethods: []
        }
        this.updatePath = this.updatePath.bind(this);
				this.handleAddPayment = this.handleAddPayment.bind(this);
    }

		componentDidMount(){
			Service.User.get(user => {
				EliteAPI.STR.PaymentMethod.search({
					user_id: user.id,
					include_classes: 'address'
				},
				success => {
					this.setState({paymentMethods: success.data.models});
				},
				failure => {
					console.log(failure.error_message);
				})
			})
		}


    updatePath(path) {
        this.props.history.push(path);
    }

		handleAddPayment(){
			this.props.onShowSidePanel(
				'Add New Payment Method',
				<SpringPanelPayment/>
			)
		}



    render() {
			//let paymentCards = this.state.paymentMethods.map(paymentMethod =>
			//	<PaymentCard key={paymentMethod.payment_method_id} paymentMethod={paymentMethod}/>)

        return (
            <View>
                <TopMenu title= 'Payment/Credit' onPress={() => this.updatePath('/account-main')}/>
									<View style={STYLES.container}>
										<WebView
											source = {{ uri: this.props.loginLink + '&url=https://www.pogopass.com/user/account/payment#user-payment' }}
										/>
									</View>
            </View>
        );
    }
}

const STYLES = {
	container: {
		 height: Dimensions.get('window').height,
	},
	// container:{
	// 	flex: 1,
	// 	justifyContent:'center',
	// 	alignItems:'center',
	// },
	iconContainer:{
		flex: 1,
		backgroundColor:'white',
		borderRadius: 15,
		padding: 10,
		marginTop: 35,
		marginBottom: 35,
		marginLeft: 20,
		justifyContent:'center',
		alignItems:'center',
		alignSelf: 'center',
		width: 55
	},
	bottomSectionTitle: {
		backgroundColor:'#c9c9c9',
		width:'100%',
		opacity:.95
	},
	bottomSectionHeader: {
		fontSize: 20,
		padding: 30
	},
	bottomSection: {
		flexDirection:'column',
		justifyContent:'space-evenly',
		alignItems:'center',
		opacity: .90,
		backgroundColor: 'white',
		width:'100%',
		paddingLeft: 30,
		paddingRight: 30
	},
	bottomTextStyle: {
		fontSize: 16,
		paddingTop: 20,
	},
	descriptionColumn: {
		flex: 1,
		flexDirection:'column',
		justifyContent:'flex-start',
		alignItems:'flex-start',
		borderBottomWidth: 1,
		marginBottom: 30,
		paddingBottom: 30
	},
	transparentFiller: {
			height: 250,
	},
	transparentFiller1: {
			height: 50,
	}
}

// <ScrollView>
// 	{paymentCards}
//
//
// 	<TouchableOpacity
// 		style={STYLES.iconContainer}
// 		onPress={this.handleAddPayment}>
// 			<Icon name='plus' size= {35}/>
// 	</TouchableOpacity>
//
//
//
// 	<View style={STYLES.bottomSectionTitle}>
// 		<Text style={STYLES.bottomSectionHeader}> Credit </Text>
// 	</View>
//
// 	<View style={STYLES.bottomSection}>
//
// 		<View style={STYLES.descriptionColumn}>
// 			<Text style={STYLES.bottomTextStyle}>Date: 03/06/2018 12:10 PM</Text>
// 			<Text style={STYLES.bottomTextStyle}>Description: Credit given for referring purchase of PogoPass Dallas - Gift Voucher. Order product id: 335054</Text>
// 			<Text style={STYLES.bottomTextStyle}>Amount: $5.00</Text>
// 			<Text style={STYLES.bottomTextStyle}>Available Balance: $15.00</Text>
// 		</View>
//
//
// 		<View style={STYLES.descriptionColumn}>
// 			<Text style={STYLES.bottomTextStyle}>Date: 02/27/2018 12:26 PM</Text>
// 			<Text style={STYLES.bottomTextStyle}>Description: Refund for transaction 2128</Text>
// 			<Text style={STYLES.bottomTextStyle}>Amount: $5.00</Text>
// 			<Text style={STYLES.bottomTextStyle}>Available Balance: $10.00</Text>
// 		</View>
//
// 	</View>
// </ScrollView>
