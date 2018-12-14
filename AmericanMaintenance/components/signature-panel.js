import React from 'react';
import {View, Text, TouchableOpacity, Alert, Modal, TextInput} from 'react-native';
import ExpoPixi from 'expo-pixi';
import {EliteWorksOrange, AccountContentGrey, AccountMenuGrey, Blueberry, AppleCore} from '../assets/styles/constants';

export default class Test extends React.Component {

    constructor(props)
    {
        super(props)

				this.state = {
					modalVisible: false,
					notes: ''
				}
				this.handleComplete = this.handleComplete.bind(this);
				this.handleModal = this.handleModal.bind(this);
				this.handleConfirmAlert = this.handleConfirmAlert.bind(this);
				this.handleSignatureSave = this.handleSignatureSave.bind(this);
				this.handleSkipComplete = this.handleSkipComplete.bind(this);
    }

	handleConfirmAlert(){
		Alert.alert(
		  'Complete Confirmation',
		  'Are you sure you have completed this work order?',
		  [
			{text: 'NO', style: 'cancel'},
			{text: 'YES', onPress: () => this.handleComplete()}
		  ],
		  { cancelable: false }
		);
	}

	handleSkipComplete(){
		this.props.workOrder.data.signature.skip_message = this.state.notes;
		this.props.workOrder.save((success) => {
				console.log(success);
				this.setState({
					notes: ''
				})
				this.handleModal();
				this.props.onCompleteWorkOrder();
		});
	}

	async handleComplete(){

		let options = {format: 'png', quality: 0.1, result: 'file', height: 120, width: '100%'};
		let uriSignature = await Expo.takeSnapshotAsync(this.sketch, options);

		let data = new FormData();
		data.append('file_upload', {
			uri: uriSignature,
			type: 'image/png',
			name: 'SignatureUpload'
		});
		data.append('private', 1);
		data.append('site_file_parent_id', -1);
		EliteAPI.CMS.SiteFile.add(data, (success) => {
			//console.log('success: ', success.data.site_file);
			this.handleSignatureSave(success.data.site_file);
		}, (failure) => {
			console.log(failure)
		});

	}

	handleSignatureSave(siteFile){
		EliteAPI.GEN.ModelFile.add({
			model_id: this.props.workOrder.work_order_id,
			class_key: 'workorder',
			type: 'SIGNATURE',
			site_file_id: siteFile.site_file_id,
			include_classes: 'sitefile'
		}, (success) => {
			console.log('success: ', success);
			this.props.onCompleteWorkOrder();
		}, (failure) => {
			console.log(failure);
		})
	}

	handleModal(){
		console.log(this.state.modalVisible);
		this.setState({ modalVisible: !this.state.modalVisible });
	}

    render() {
        return (
            <View style={STYLES.container}>
                <Text>Please sign to verify completion</Text>
                <View style={STYLES.signatureContainer}>
                    <Text style={STYLES.signatureText}>X</Text>
                    <View style={STYLES.innerSignatureContainer}>
                        <ExpoPixi.Sketch
                            style={{width: '100%', height: 120}}
                            strokeColor={'black'}
                            strokeWidth={6}
                            strokeAlpha={.7}
							ref={ref => this.sketch = ref}/>
                    </View>
                </View>

				<TouchableOpacity
					onPress={this.handleConfirmAlert}
					style={STYLES.myButton}>
					<Text style={STYLES.buttonText}>Complete</Text>
				</TouchableOpacity>
				<TouchableOpacity
					onPress={this.handleModal}
					style={STYLES.myButton}>
					<Text style={STYLES.buttonText}>Skip</Text>
				</TouchableOpacity>

				<Modal
					animationType = {"slide"}
					transparent = {true}
					visible = {this.state.modalVisible}
					onRequestClose = {() => { console.log("Modal has been closed.") } }>

				   <View style = {STYLES.modal}>
				   		<View style = {STYLES.modalContainer}>
							<Text style = {STYLES.textTitle}>Skipping?</Text>
							<Text>Please write the reason for skipping the signature</Text>
							<View style={STYLES.notesContainer}>

								<TextInput
									style={STYLES.textInput}
								  	placeholder = "Enter notes here"
								  	underlineColorAndroid = "transparent"
								  	value={this.state.notes}
								  	onChangeText = {(text) => this.setState({notes: text})}
								  	multiline={true}/>
							</View>
							<TouchableOpacity
							  style={STYLES.myButton}
							  onPress ={this.handleSkipComplete}>
								  <Text style={STYLES.buttonText}>Complete</Text>
							</TouchableOpacity>

							<TouchableOpacity
							  style={STYLES.myButton}
							  onPress ={this.handleModal}>
								  <Text style={STYLES.buttonText}>Back</Text>
							</TouchableOpacity>
						</View>
				   </View>
				</Modal>
            </View>
        );
    }
}


const STYLES = {
	container: {
		margin: 10,
		width: '80%'
	},
	modalContainer: {
		width: 300
	},
	textTitle: {
		fontSize: 20,
		fontWeight: 'bold'
	},
	notesContainer: {
		width: 300,
		minHeight: 200,
		backgroundColor: 'white',
		borderRadius: 10,
		padding: 10,
		marginVertical: 20
	},
	modal: {
	   flex: 1,
	   justifyContent: 'flex-start',
	   alignItems: 'center',
	   backgroundColor: '#d6d6d6',
	   padding: 20
	},
	myButton: {
		padding: 10,
		backgroundColor: EliteWorksOrange,
		borderRadius: 5,
		justifyContent: 'center',
		alignItems: 'center',
		marginTop: 15
	},
	buttonText: {
		color: 'white'
	},
    signatureText: {
		fontSize: 24
	},
	signatureContainer: {
		flexDirection: 'row',
		backgroundColor: 'white',
		borderRadius: 5,
		padding: 15,
		alignItems: 'flex-end',
		marginVertical: 10,
		width: '100%'
	},
	innerSignatureContainer: {
		width: '100%',
		marginHorizontal: 5,
		borderBottomWidth: 2
	},
}
