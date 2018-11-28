import React from 'react';
import {View, Text, TouchableOpacity, Animated, Switch, ScrollView, TextInput, Dimensions, Image, Modal} from 'react-native';
import {EliteWorksOrange, AccountContentGrey, AccountMenuGrey, Blueberry, AppleCore} from '../assets/styles/constants';
import Icon from 'react-native-vector-icons/FontAwesome';
import ImageViewer from 'react-native-image-zoom-viewer';
import PhotoRow from './photo-row';

const STATUS_COLOR = {
	'SCHEDULED' : Blueberry,
	'PENDING' : Blueberry,
	'TRAVELLING' : EliteWorksOrange,
	'IN PROGRESS' : EliteWorksOrange,
	'COMPLETED' : AccountMenuGrey
}

const TIMESPAN_STATUS_TO_WORK_ORDER_STATUS = {
	TRAVELLING: 'TRAVELLING',
	WORKING: 'IN PROGRESS'
}

export default class WorkOrderSpringContent extends React.Component {

	constructor(props){
		super(props);

		this.state = {
			activeTimeSpan: undefined,
			activeStatus: '',
			travellingTotalHours: 0,
			travellingTotalMinutes: 0,
			workingTotalHours: 0,
			workingTotalMinutes: 0,
            beforePhotos: [],
            showPictureModal: false,
            selectedImage: undefined
		}

		this.timeSpans = {
			TRAVELLING: [],
			WORKING: []
		};

		this.toggleActiveStatus = this.toggleActiveStatus.bind(this);
		this.addNewTimeSpan = this.addNewTimeSpan.bind(this);
		this.loadData = this.loadData.bind(this);
		this.updateTime = this.updateTime.bind(this);
		this.handleNoteChange = this.handleNoteChange.bind(this);
		this.handleWorkOrderSave = this.handleWorkOrderSave.bind(this);
		this.handleCompleteWorkOrder = this.handleCompleteWorkOrder.bind(this);
        this.handlePhotoZoom = this.handlePhotoZoom.bind(this);
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

	addNewTimeSpan(type, longitude, latitude){

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

	handleNoteChange(value) {
		this.props.workOrder.notes = value;
		this.forceUpdate();
	}

	handleWorkOrderSave(){
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

    handlePhotoZoom(photo){
        this.setState({
            showPictureModal: true,
            selectedImage: [{url: photo.photo.site_file.proxy_url_full}]
        })
    }

	render() {
        let activeColor = STATUS_COLOR[this.props.workOrder.status] ? STATUS_COLOR[this.props.workOrder.status] : Blueberry;

		return (

			<View style={STYLES.container}>

                <Modal visible={this.state.showPictureModal} transparent={true} onRequestClose= {() => this.setState({showPictureModal : false})}>
                    <ImageViewer imageUrls={this.state.selectedImage}/>
                </Modal>


                <ToggleSection
                    activeColor={activeColor}
                    title='Travel'
                    hours={this.state.travellingTotalHours}
                    minutes={this.state.travellingTotalMinutes}
                    onValueChange={(value) => this.toggleActiveStatus('TRAVELLING',value)}
                    activeStatus={this.state.activeStatus}
                    job='TRAVELLING'/>

                <ToggleSection
                    activeColor={activeColor}
                    title='Job'
                    hours={this.state.workingTotalHours}
                    minutes={this.state.workingTotalMinutes}
                    onValueChange={(value) => this.toggleActiveStatus('WORKING',value)}
                    activeStatus={this.state.activeStatus}
                    job='WORKING'/>


                <View style={STYLES.outsidePhotoContainer}>
                    <PhotoRow
                        title='Before Photos'
                        type='BEFORE'
                        workOrder={this.props.workOrder}
                        onPress={this.handlePhotoZoom}
                        onShowSidePanel={this.props.onShowSidePanel}/>
                    <PhotoRow
                        title='After Photos'
                        type='AFTER'
                        workOrder={this.props.workOrder}
                        onPress={this.handlePhotoZoom}
                        onShowSidePanel={this.props.onShowSidePanel}/>
                </View>



                <View>
                    <View style={STYLES.notesTitleContainer}>
                        <Text style={STYLES.notesTitle}>Notes</Text>
                    </View>

                    <View style={STYLES.notesContainer}>
                        <TextInput
                            placeholder = "Enter notes here"
                            underlineColorAndroid = "transparent"
                            value={this.props.workOrder.notes}
                            onChangeText={this.handleNoteChange}
                            multiline={true}/>
                    </View>
                </View>

                <TouchableOpacity
                    style={STYLES.saveNotes}
                    onPress={this.handleWorkOrderSave}>
                    <Text style={STYLES.toggleText}>Save Notes</Text>
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


const ToggleSection = (props) => {
    return (
        <View style={STYLES.outsideToggleContainer}>
            <View style={{...STYLES.leftToggleContainer, backgroundColor: props.activeColor}}>
                <Text style={STYLES.toggleTextTitle}>{props.title}</Text>
            </View>

            <View style={STYLES.rightToggleContainer}>
                <Text style={STYLES.toggleText}>
                    {props.hours} hours    {props.minutes} minutes
                </Text>

                <View style={STYLES.toggleContainer}>
                    <Text style={STYLES.toggleText}>Stop</Text>
                    <Switch
                        onTintColor = '#F7882F'
                        thumbTintColor = 'white'
                        style={STYLES.switchStyle}
                        onValueChange = {props.onValueChange}
                        value = {props.activeStatus === props.job}/>

                    <Text style={STYLES.toggleText}>Start</Text>
                </View>
            </View>
        </View>
    );
}


const STYLES = {
	container: {
		justifyContent: 'center',
		alignItems: 'center',
        width: '100%'
	},
	outsideToggleContainer: {
        flexDirection: 'row',
        height: 120,
		width: 300,
		borderWidth: 2,
		borderColor: 'white',
		borderRadius: 5,
		margin: 10
	},
    leftToggleContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        borderRightWidth: 2,
        borderColor: 'white'
    },
    rightToggleContainer: {
        flex: 2,
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 30,
        backgroundColor: Blueberry
    },
    toggleTextTitle: {
        color: 'white',
        fontSize: 20,
        fontWeight: 'bold'
    },
	toggleContainer: {
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
        marginTop: 5
	},
	toggleText: {
		color: 'white',
		fontSize: 16
	},
    notesTitle: {
        color: 'white',
        fontSize: 20,
        fontWeight: 'bold'
    },
    notesTitleContainer: {
        alignSelf: 'flex-start'
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
        marginTop: 15
	},
	outsidePhotoContainer: {
        width: '100%',
		marginVertical: 20,
        justifyContent: 'flex-start',
        alignItems: 'flex-start'
	},
	timeTotal: {
		color: 'white',
		marginBottom: 20
	},
    saveNotes: {
        width: '90%',
        backgroundColor: EliteWorksOrange,
        padding: 15,
        justifyContent: 'center',
		alignItems: 'center',
        marginVertical: 15,
        borderRadius: 5,
    },
	completeButton: {
		padding: 15,
		width: '90%',
		backgroundColor: EliteWorksOrange,
		borderRadius: 5,
		justifyContent: 'center',
		alignItems: 'center'
	}
}
