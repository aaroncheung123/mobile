
import React from 'react';
import {View, Text, Dimensions, TouchableOpacity, Alert} from 'react-native';


export default class RegisterModal extends React.Component {
	constructor(props)
	{
		super(props);

		this.state = {
			available: [],
			registered: []
		}

		this.handleRegister = this.handleRegister.bind(this);
	}

	componentDidMount() {
		this.props.accounts.forEach(account => {
			EliteAPI.CRM.Account.availableUsage({account_id: account.account_id, availability_id: this.props.availability.availability_id}, (success) => {

				if (success.data.registered_count > 0) this.state.registered.push(account);
				else if (success.data.available_usage > 0) this.state.available.push(account);

				this.forceUpdate();

			}, (failure) => {

			})
		})
	}



    // purpose
    //   register for an availability
    // args
    //   availability_id (required)
    //   user_id (optional) (default is logged in user)
    //   account_id (optional) (required if open enrollment is false)
    //   quantity (optional) (default is 1)
    // returns
    //   availability_registrants
	handleRegister(account) {
		Alert.alert(
			'Confirm Registration',
			`Are you sure you would like to register ${GlobalUtil.capitalizeFirstOfEachWord(account.full_name)}`,
			[
				{text: 'Cancel', style: 'cancel'},
				{text: 'OK', onPress: () => {

					EliteAPI.EVN.Availability.register({
						availability_id: this.props.availability.availability_id,
						account_id: account.account_id
					}, success => {
						this.state.available = this.state.available.filter(x => x.account_id != account.account_id);
						this.state.registered.push(account);
						this.forceUpdate();
					})


				}},
			],
			{ cancelable: false }
		)
	}

	render() {

		let availableElements = this.state.available.map(account => <Pass key={account.account_id} account={account} showRegister={true} onRegister={this.handleRegister}/>);
		let registeredElements = this.state.registered.map(account => <Pass key={account.account_id} account={account}/>)

		return (
			<View style={STYLES.container}>
				{
					this.state.available.length > 0 ?
					<View style={STYLES.container}>
						<Text style={STYLES.title}>Available Passes</Text>
						{availableElements}
					</View> : null
				}
				{
					this.state.registered.length > 0 ?
					<View style={STYLES.container}>
						<Text style={STYLES.title}>Registered Passes</Text>
						{registeredElements}
					</View> : null
				}
			</View>
		)
	}
}


const Pass = (props) => {


	return (

		<View style={STYLES.passContainer}>
			<View style={STYLES.accountDescriptionContainer}>
				<Text style={STYLES.accountName}>{GlobalUtil.capitalizeFirstOfEachWord(props.account.full_name)}</Text>
				<Text style={STYLES.accountKey}>{props.account.account_key}</Text>
			</View>
			{
				props.showRegister ?
				<View style={STYLES.container}>
					<TouchableOpacity
	                    style={STYLES.registrationButton}
	                    onPress={() => props.onRegister(props.account)}>
	                        <Text>Register</Text>
	                </TouchableOpacity>
				</View> : <Text style={STYLES.accountName}>Registered</Text>
			}
		</View>
	)
}


const STYLES = {
	container: {
		justifyContent: 'center',
		alignItems: 'center'
	},
	title: {
		color: 'black',
		fontSize: 20,
		textDecorationLine: 'underline'
	},
	passContainer: {
		borderColor: 'black',
		borderWidth: 1,
		flexDirection: 'row',
		marginTop: 20,
		padding: 20,
		borderRadius: 5,
		width: Dimensions.get('window').width - 40,
	},
	accountDescriptionContainer: {
		flex: 1
	},
	accountName: {
		color: 'black',
		fontSize: 20
	},
	accountKey: {
		color: 'black',
		fontSize: 16
	},
    registrationButton: {
        backgroundColor: 'orange',
        padding: 10,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center'
    }
}
