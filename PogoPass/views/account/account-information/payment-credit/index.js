import React from 'react';
import {View, Text} from 'react-native';
import TopMenu from '../../../../components/account-information/top-menu';
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
								<PaymentCard/>
								<View style={STYLES.iconContainer}>
                    <Icon name='plus' size= {35}/>
                </View>

								<View style={STYLES.bottomSectionTitle}>
									<Text style={STYLES.bottomSectionHeader}> Credit </Text>
								</View>
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
		backgroundColor:'orange',
		borderRadius: 50,
		padding: 10,
		marginTop: 35,
		marginBottom: 35,
		marginLeft: 20,
		justifyContent:'center',
		alignItems:'center',
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
}
