

import React from 'react';
import {View, Text, TouchableOpacity, Animated, Switch, ScrollView, TextInput} from 'react-native';
import {EliteWorksOrange, AccountContentGrey, AccountMenuGrey, Blueberry, AppleCore} from '../assets/styles/constants';
import Icon from 'react-native-vector-icons/FontAwesome';


//import { RNCamera } from 'react-native-camera';

const TIMESPAN_STATUS_TO_WORK_ORDER_STATUS = {
	TRAVELLING: 'TRAVELLING',
	WORKING: 'IN PROGRESS'
}

export default class WorkOrderSpringContent extends React.Component {

	constructor(props)
	{
		super(props);

		this.state = {
			activeTimeSpan: undefined,
			activeStatus: '',
			travellingTotalHours: 0,
			travellingTotalMinutes: 0,
			workingTotalHours: 0,
			workingTotalMinutes: 0
		}

		this.timeSpans = {
			TRAVELLING: [],
			WORKING: []
		};

		this.toggleActiveStatus = this.toggleActiveStatus.bind(this);
		this.addNewTimeSpan = this.addNewTimeSpan.bind(this);
		this.loadData = this.loadData.bind(this);
		this.updateTime = this.updateTime.bind(this);
		this.handleUploadPhoto = this.handleUploadPhoto.bind(this);
		this.handleNoteChange = this.handleNoteChange.bind(this);
		this.handleWorkOrderSave = this.handleWorkOrderSave.bind(this);
		this.handleCompleteWorkOrder = this.handleCompleteWorkOrder.bind(this);
	}

	componentDidMount() {
		this.loadData();
		this.updateTime(true);
	}

	componentDidUpdate(prevProps, prevState) {
		if (prevProps.workOrder.work_order_id != this.props.workOrder.work_order_id)
		{
			this.setState({activeTimeSpan: undefined, activeStatus: ''}, () => {
				this.loadData();
			})
		}
	}

	updateTime(callUpdate = true) {
		let workingTotal = 0;
		let travellingTotal = 0;
		this.timeSpans['TRAVELLING'].forEach(timeSpan => {
			if (GlobalUtil.isEmpty(timeSpan.stop_at)) return;
			let startDate = GlobalUtil.convertMysqlToDate(timeSpan.start_at);
			let endDate = GlobalUtil.convertMysqlToDate(timeSpan.stop_at);
			travellingTotal += endDate - startDate;
		})
		this.timeSpans['WORKING'].forEach(timeSpan => {
			if (GlobalUtil.isEmpty(timeSpan.stop_at)) return;
			let startDate = GlobalUtil.convertMysqlToDate(timeSpan.start_at);
			let endDate = GlobalUtil.convertMysqlToDate(timeSpan.stop_at);
			workingTotal += endDate - startDate;
		})


		if (this.state.activeTimeSpan)
		{
			let startDate = GlobalUtil.convertMysqlToDate(this.state.activeTimeSpan.start_at);
			let endDate = new Date();

			if (this.state.activeTimeSpan.type === 'TRAVELLING') travellingTotal += endDate - startDate;
			else workingTotal += endDate - startDate;
		}

		let travellingMinutes = travellingTotal / 1000 / 60;
		let travellingHours = Math.floor(travellingMinutes / 60);
		let travellingRemainingMinutes = travellingMinutes - (60 * travellingHours);
		let workingMinutes = workingTotal / 1000 / 60;
		let workingHours = Math.floor(workingMinutes / 60);
		let workingRemainingMinutes = workingMinutes - (60 * workingHours);

		this.setState({
			travellingTotalHours: travellingHours,
			travellingTotalMinutes:  Math.floor(travellingRemainingMinutes),
			workingTotalHours: workingHours,
			workingTotalMinutes:  Math.floor(workingRemainingMinutes)
		})

		if (callUpdate) this.timeUpdater = setTimeout(this.updateTime.bind(this), 5000)
	}

	loadData() {
		this.getActiveTimeSpan('TRAVELLING');
		this.getActiveTimeSpan('WORKING');
	}


	getActiveTimeSpan(type) {
		EliteAPI.GEN.ModelTimeSpan.current({class_key: 'workorder', model_id: this.props.workOrder.work_order_id, type: type}, success => {
			if (success.data.model_time_span)
			{
				this.setState({
					activeTimeSpan: success.data.model_time_span,
					activeStatus: type
				})
			}
		})

		EliteAPI.GEN.ModelTimeSpan.search({class_key: 'workorder', model_id: this.props.workOrder.work_order_id, type: type, take: 1000}, (success) => {
			this.timeSpans[type] = success.data.models.filter(x => !GlobalUtil.isEmpty(x.stop_at))
			this.updateTime(false);
		})
	}


	toggleActiveStatus(type, value) {

		if (this.state.activeTimeSpan) {

			let activeTimeSpan = new EliteAPI.Models.GEN.ModelTimeSpan(this.state.activeTimeSpan);

			navigator.geolocation.getCurrentPosition(position => {
				activeTimeSpan.stop_longitude = position.coords.longitude;
				activeTimeSpan.stop_latitude = position.coords.latitude;
				activeTimeSpan.stop((success) => {
					this.timeSpans[success.data.model_time_span.type].push(success.data.model_time_span);
				})
			}, () => {
				activeTimeSpan.stop((success) => {
					this.timeSpans[success.data.model_time_span.type].push(success.data.model_time_span);
				})
			}, {
				timeout: 3000,
				maximumAge: 10000,
				enableHighAccuracy: true
			})
		}

		if (value)
		{
			navigator.geolocation.getCurrentPosition(position => {
				this.addNewTimeSpan(type, position.coords.longitude, position.coords.latitude);
			}, () => {
				this.addNewTimeSpan(type, undefined, undefined);
			}, {
				timeout: 3000,
				maximumAge: 10000,
				enableHighAccuracy: true
			})

		}
		else
		{
			this.setState({
				activeStatus: '',
				activeTimeSpan: undefined
			})

			this.props.workOrder.status = this.props.workOrder.scheduled_at ? 'SCHEDULED' : 'PENDING';
			this.props.workOrder.save();
			if (this.props.onWorkOrderUpdated) this.props.onWorkOrderUpdated()
		}
	}

	addNewTimeSpan(type, longitude, latitude)
	{

		let newTimeSpan = new EliteAPI.Models.GEN.ModelTimeSpan({class_key: 'workorder', model_id: this.props.workOrder.work_order_id, type: type, start_latitude: latitude, start_longitude: longitude});
		newTimeSpan.start((success) => {
			this.setState({
				activeStatus: type,
				activeTimeSpan: success.data.model_time_span
			})
			this.props.workOrder.status = TIMESPAN_STATUS_TO_WORK_ORDER_STATUS[type];
			this.props.workOrder.save();
			if (this.props.onWorkOrderUpdated) this.props.onWorkOrderUpdated()
		})
		this.setState({
			activeStatus: type
		})
	}


	handleUploadPhoto(type) {
		console.log('uploading image for ' + type);
	}

	handleNoteChange(value) {
		this.props.workOrder.notes = value;
		this.forceUpdate();
	}

	handleWorkOrderSave()
	{
		this.props.workOrder.save();
		alert('Work order saved');
	}
	handleCompleteWorkOrder() {
		this.props.workOrder.complete((success) => {
			this.props.workOrder.status = "COMPLETED";
			if (this.props.onWorkOrderUpdated) this.props.onWorkOrderUpdated()
			alert('Work order marked as complete');
		}, (failure) => {
			alert(failure.error_message);
		})
	}

	render() {
		return (

			<View style={STYLES.container}>
				<View style={STYLES.toggleContainer}>
					<Text style={STYLES.toggleText}>Stop Travel</Text>
					<Switch
						onTintColor = '#F7882F'
						thumbTintColor = 'white'
						style={STYLES.switchStyle}
						onValueChange = {(value) => this.toggleActiveStatus('TRAVELLING', value)}
						value={this.state.activeStatus === 'TRAVELLING'}/>

					<Text style={STYLES.toggleText}>Start Travel</Text>
				</View>
				<Text style={STYLES.timeTotal}>{this.state.travellingTotalHours}h {this.state.travellingTotalMinutes}m</Text>

				<View style={STYLES.toggleContainer}>
					<Text style={STYLES.toggleText}>Stop Job</Text>
					<Switch
						onTintColor = '#F7882F'
						thumbTintColor = 'white'
						style={STYLES.switchStyle}
						onValueChange = {(value) => this.toggleActiveStatus('WORKING', value)}
						value = {this.state.activeStatus === 'WORKING'}/>

					<Text style={STYLES.toggleText}>Start Job</Text>
				</View>
				<Text style={STYLES.timeTotal}>{this.state.workingTotalHours}h {this.state.workingTotalMinutes}m</Text>

				<View style={STYLES.outsidePhotoContainer}>
					<Text style={STYLES.toggleText}>Before Photos</Text>
					<View style={STYLES.photoRow}>
						<TouchableOpacity style={STYLES.photoAddContainer} onPress={() => this.handleUploadPhoto('BEFORE')}>
							{/*<RNCamera
								style={styles.preview}
								type={RNCamera.Constants.Type.back}
								flashMode={RNCamera.Constants.FlashMode.on}
								permissionDialogTitle={'Permission to use camera'}
								permissionDialogMessage={'We need your permission to use your camera phone'}
							>
								{({ camera, status }) => {
									if (status !== 'READY') return <PendingView />;
									return (
										<View style={{ flex: 0, flexDirection: 'row', justifyContent: 'center' }}>
											<TouchableOpacity onPress={() => this.takePicture(camera)} style={styles.capture}>
												<Text style={{ fontSize: 14 }}> SNAP </Text>
											</TouchableOpacity>
										</View>
									);
								}}
							</RNCamera>*/}
							<Icon name='plus' size={30} color='white'/>
						</TouchableOpacity>
					</View>
					<Text style={STYLES.toggleText}>After Photos</Text>
					<View style={STYLES.photoRow}>
						<TouchableOpacity style={STYLES.photoAddContainer}>
								<Icon name='plus' size={30} color='white' onPress={() => this.handleUploadPhoto('AFTER')}/>
						</TouchableOpacity>
					</View>
				</View>

				<View style={STYLES.notesContainer}>
					<TextInput
						placeholder = "Enter notes here"
						underlineColorAndroid = "transparent"
						value={this.props.workOrder.notes}
						onChangeText={this.handleNoteChange}
						multiline={true}/>
				</View>
				<TouchableOpacity
					style={STYLES.saveNotes}
					onPress={this.handleWorkOrderSave}>
					<Text style={STYLES.toggleText}>Save</Text>
				</TouchableOpacity>


				<TouchableOpacity
					style={STYLES.completeButton}
					onPress={this.handleCompleteWorkOrder}>
					<Text style={STYLES.toggleText}>Complete</Text>
				</TouchableOpacity>
			</View>
		)
	}
}



const STYLES = {
	container: {
		justifyContent: 'center',
		alignItems: 'center',
	},
	toggleContainer: {
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
		marginVertical: 10
	},
	toggleText: {
		color: 'white',
		fontSize: 16
	},
	switchStyle: {
		marginHorizontal: 10,
	},
	notesContainer: {
		width: 300,
		minHeight: 300,
		backgroundColor: 'white',
		borderRadius: 10,
		padding: 10,
		marginTop: 30
	},
	saveNotes: {
		backgroundColor: EliteWorksOrange,
		padding: 15,
		margin: 10,
		borderRadius: 5,
		alignSelf: 'flex-end'
	},
	photoAddContainer: {
		height: 80,
		width: 60,
		borderRadius: 5,
		borderStyle: 'dashed',
		borderColor: 'white',
		borderWidth: 1,
		margin: 15,
		justifyContent: 'center',
		alignItems: 'center'
	},
	photoRow: {
		flexDirection: 'row'
	},
	outsidePhotoContainer: {
		marginVertical: 20
	},
	timeTotal: {
		color: 'white',
		marginBottom: 20
	},
	completeButton: {
		padding: 15,
		marginVertical: 20,
		width: '90%',
		backgroundColor: EliteWorksOrange,
		borderRadius: 5,
		justifyContent: 'center',
		alignItems: 'center'
	}
}
