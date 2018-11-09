
import React from 'react';

import {Modal, View, TextInput, StyleSheet, Image, TouchableWithoutFeedback, Keyboard, Text, AsyncStorage} from 'react-native';
import {Icon, Button} from 'react-native-elements'
import {Constants} from 'expo';
import {EliteWorksOrange, AccountContentGrey, AccountMenuGrey} from '../../assets/styles/constants';
import {KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import openMap from 'react-native-open-maps';


import call from 'react-native-phone-call';

export default class WorkOrderModal extends React.Component {
	constructor(props) {
		super(props)
	}


	render() {

		return (
			<Modal
				animationType="slide"
				transparent={true}
				visible={this.props.workOrder !== undefined}
				onRequestClose={this.props.onClose}>
				<View style={STYLES.overlay}>
					<View style={MODAL_STYLES.modalContainer}>
						<TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false} style={{maxWidth: '100%'}}>
							<KeyboardAwareScrollView
								keyboardShouldPersistTaps='always'
								>
								<WorkOrderContent {...this.props}/>
							</KeyboardAwareScrollView>
						</TouchableWithoutFeedback>
					</View>
				</View>
			</Modal>
		)
	}
}

class WorkOrderContent extends React.Component {
	constructor(props)
	{
		super(props)

		this.completeWorkOrder = this.completeWorkOrder.bind(this)
		this.loadMap = this.loadMap.bind(this);
	}

	completeWorkOrder() {
		this.props.workOrder.complete((success) => {
			this.props.onUpdate();
			this.props.onClose();
		}, (failure) => {
			alert(failure.error_message);
		})
	}


	loadMap() {
		openMap({end: this.props.workOrder.address.formatted})
	}

	callCustomer = () => {
		let args = {
			number: this.props.workOrder.user.phone,
			prompt: true
		}

		call(args).catch(console.error)
	}


	render() {
		if (this.props.workOrder === undefined) return null;
		let products = this.props.workOrder.work_order_products.map(workOrderProduct => {
			return (
				<View key={workOrderProduct.work_order_product_id}>
					<Text>{workOrderProduct.name} - {workOrderProduct.quantity}</Text>
					<Text>{workOrderProduct.notes}</Text>
				</View>
			)
		})
		return (
			<View style={STYLES.scrollView}>
				<Text>{this.props.workOrder.name}</Text>
				<Text>{this.props.workOrder.user.full_name}</Text>
				<Text>{this.props.workOrder.notes}</Text>

				<Text>Products</Text>
				{products}
				{
					!GlobalUtil.isEmpty(this.props.workOrder.user.phone) ?
					<Button
						buttonStyle={STYLES.overlayButton}
						title="Call Customer"
						color="#222200"
						onPress={this.callCustomer}
					/> : null
				}
				<Button
					buttonStyle={STYLES.overlayButton}
					title="Directions"
					color="#222200"
					onPress={this.loadMap}
				/>
				<Button
					buttonStyle={STYLES.overlayButton}
					title="Complete"
					color="#222222"
					onPress={this.completeWorkOrder}
				/>
				<Button
					buttonStyle={STYLES.link}
					title="Cancel"
					color="#222222"
					onPress={this.props.onClose}
				/>
			</View>
		)
	}
}



export const STYLES = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
		marginTop: Constants.statusBarHeight,
		height: '100%'
	},
	iconInputIcon: {
		width: 30
	},
	backgroundImage: {
		width: '100%',
		height: '100%',
		alignItems: 'center',
	},
	overlay: {
		flex: 1,
		width: '100%',
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: 'rgba(0, 0, 0, 0.4)',
		alignItems: 'center',
		justifyContent: 'center',
	},
	overlayLogo: {
		marginBottom: 70,
		height: 46,
		width: 300
	},
	overlayButton: {
		height: 50,
		borderColor: EliteWorksOrange,
		borderWidth: 2,
		borderStyle: 'solid',
		borderRadius: 15,
		marginTop: 30,
		backgroundColor: 'transparent',
		minWidth: '100%'
	},
	scrollView: {
		flex: 1,
		width: '100%',
		alignItems: 'center',
		justifyContent: 'center',
		paddingTop: 100
	},
	link: {
		marginTop: 20,
		backgroundColor: 'transparent',
	},
	overlayErrorText: {
		color: 'red',
		marginTop: 10,
		fontSize: 20
	},
	overlaySuccessText: {
		color: EliteWorksOrange,
		marginTop: 10,
		fontSize: 20
	}
});



export const ICON_INPUT_STYLES = StyleSheet.create({
	text: {
		height: 25,
		width: '80%',
		lineHeight: 25,
		color: '#222222',
		fontWeight: "400",
		fontSize: 18,
		marginLeft: 10

	},
	container:  {
		width: '80%',
		maxWidth: 350,
		borderStyle: 'solid',
		borderBottomColor: '#dddddd',
		borderBottomWidth: 2,
		flex: 1,
		alignItems: 'center',
		flexDirection: 'row',
		height: 50,
		maxHeight: 50
	},
	icon: {
		width: 20
	}
});

const MODAL_STYLES = {

	modalContainer: {
		maxWidth: '90%',
		height: '90%',
		backgroundColor: '#ffffff',
		borderRadius: 20,
		alignItems: 'center',
		justifyContent: 'center',
		position: 'relative',
	},
	modalTextContainer: {
		borderBottomColor: EliteWorksOrange,
		borderStyle: 'solid',
		borderBottomWidth: 2,
		width: '100%',
		padding: 10,
		top: 0,
		position: 'absolute'
	},
	modalTextName: {
		color: EliteWorksOrange,
		fontSize: 30,
		textAlign: 'center'
	},
	modalButtonContainer: {
		borderTopColor: EliteWorksOrange,
		borderStyle: 'solid',
		borderTopWidth: 2,
		width: '100%',
		paddingBottom: 20,
		position: 'absolute',
		justifyContent: 'center',
		alignItems: 'center',
		bottom: 0
	},
	modalButton: {
		height: 50,
		borderColor: EliteWorksOrange,
		borderWidth: 2,
		borderStyle: 'solid',
		borderRadius: 15,
		marginTop: 20,
		backgroundColor: 'transparent',
		width: 220,
		maxWidth: 220
	},
	modalScrollView: {
		width: '100%',
		marginTop: 40,
		marginBottom: 80,
		flex: 1

	}
}
