import React from 'react';
import {View, Text, ScrollView, TouchableOpacity} from 'react-native';
import TopMenu from '../top-menu';
import PaymentCard from '../../../../components/account-information/payment-card';
import Icon from 'react-native-vector-icons/FontAwesome';

export default class PaymentCredit extends React.Component {

    constructor(props)
    {
        super(props);
        this.state = {
            shippingAddresses: []
        }
        this.updatePath = this.updatePath.bind(this);
    }


    updatePath(path) {
        this.props.history.push(path);
    }

    render() {
        return (
            <View style={STYLES.container}>
                <TopMenu title= 'Payment/Credit' onPress={() => this.updatePath('/account-main')}/>
								<ScrollView>
									<PaymentCard/>


									<TouchableOpacity style={STYLES.iconContainer}>
											<Icon name='plus' size= {35}/>
									</TouchableOpacity>



									<View style={STYLES.bottomSectionTitle}>
										<Text style={STYLES.bottomSectionHeader}> Credit </Text>
									</View>

									<View style={STYLES.bottomSection}>

										<View style={STYLES.descriptionColumn}>
											<Text style={STYLES.bottomTextStyle}>Date: 03/06/2018 12:10 PM</Text>
											<Text style={STYLES.bottomTextStyle}>Description: Credit given for referring purchase of PogoPass Dallas - Gift Voucher. Order product id: 335054</Text>
											<Text style={STYLES.bottomTextStyle}>Amount: $5.00</Text>
											<Text style={STYLES.bottomTextStyle}>Available Balance: $15.00</Text>
										</View>


										<View style={STYLES.descriptionColumn}>
											<Text style={STYLES.bottomTextStyle}>Date: 02/27/2018 12:26 PM</Text>
											<Text style={STYLES.bottomTextStyle}>Description: Refund for transaction 2128</Text>
											<Text style={STYLES.bottomTextStyle}>Amount: $5.00</Text>
											<Text style={STYLES.bottomTextStyle}>Available Balance: $10.00</Text>
										</View>

									</View>
								</ScrollView>
            </View>
        );
    }
}

const STYLES = {
	container:{
		flex: 1,
		justifyContent:'center',
		alignItems:'center',
	},
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
