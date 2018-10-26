import React from 'react';
import {View, Text, TouchableWithoutFeedback, TextInput, TouchableHighlight} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import TopMenu from '../../../../components/account-information/top-menu';
import ShippingAddressCard from '../../../../components/account-information/shipping-address-card';

export default class Blurb extends React.Component {
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

				{shippingAddressCards}


      </View>
  	);
	}
}

const STYLES = {
	container:{
		flex: 1
	},
}


// EliteAPI.CRM.User.setPassword ({
// 	password: this.state.newPassword,
// 	current_password: this.state.currentPassword},
// 	success => {
// 		alert('Password has been updated');
// 	},
// 	failure => {
// 		alert(failure.error_message);
// 	});
