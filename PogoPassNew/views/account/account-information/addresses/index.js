import React from 'react';
import {View, Text, TouchableOpacity, TextInput, TouchableHighlight, ScrollView} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import TopMenu from '../top-menu';
import ShippingAddressCard from './shipping-address-card';

export default class Addresses extends React.Component {
	constructor(props)
	{
		super(props);
		this.state = {
			shippingAddresses: []
		}
		this.updatePath = this.updatePath.bind(this);
	}

	componentDidMount(){
		Service.User.get(user => {
			EliteAPI.STR.ShippingAddress.search({
				user_id: user.id,
				include_classes: 'address'
			},
			success => {
				//console.log("Success 2: ", success.data.models);
				this.setState({shippingAddresses: success.data.models});
			},
			failure => {
				console.log(failure.error_message);
			})
		})
	}

	updatePath(path) {
		this.props.history.push(path);
	}

  render() {
		let shippingAddressCards = this.state.shippingAddresses.map(shippingAddress =>
			<ShippingAddressCard key={shippingAddress.shipping_address_id } shippingAddress={shippingAddress}/>)
  	return (


      <View style={STYLES.container}>
      	<TopMenu title= 'Addresses' onPress={() => this.updatePath('/account-main')}/>
				<ScrollView style={STYLES.scrollViewContainer}>
					{shippingAddressCards}
					<TouchableOpacity style={STYLES.iconContainer}>
							<Icon name='plus' size= {35}/>
					</TouchableOpacity>
					<View style={STYLES.transparentFiller}></View>
				</ScrollView>
      </View>


  	);
	}
}

const STYLES = {
	container:{
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		width: '100%'
	},
	scrollViewContainer: {
		width: '100%',
	},
	iconContainer:{
		flex: 1,
		backgroundColor:'white',
		borderRadius: 15,
		padding: 10,
		marginVertical: 35,
		marginLeft: 20,
		justifyContent:'center',
		alignItems:'center',
		alignSelf: 'center',
		width: 55
	},
	transparentFiller: {
			height: 250,
	}
}
