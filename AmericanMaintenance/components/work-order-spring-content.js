import React from 'react';
import {View, Text, TouchableOpacity, Animated, Switch, ScrollView, TextInput, Dimensions, Image, Modal, Alert} from 'react-native';
import {EliteWorksOrange, AccountContentGrey, AccountMenuGrey, Blueberry, AppleCore} from '../assets/styles/constants';
import Icon from 'react-native-vector-icons/FontAwesome';
import ImageViewer from 'react-native-image-zoom-viewer';
import PhotoRow from './photo-row';
import ProductSelectRow from './product-select-row';
import SignaturePanel from './signature-panel';


const TIMESPAN_STATUS_TO_WORK_ORDER_STATUS = {
	TRAVELLING: 'TRAVELLING',
	WORKING: 'IN PROGRESS'
}

{/* =========================================================

This is the spring panel that shows when details is clicked in a work order card

============================================================*/}
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
      selectedImage: undefined,
      notes: '',
			products: [],
			searchText: '',
			selectedProducts: []
		}

		this.timeSpans = {
			TRAVELLING: [],
			WORKING: []
		};

		this.toggleActiveStatus = this.toggleActiveStatus.bind(this);
		this.addNewTimeSpan = this.addNewTimeSpan.bind(this);
		this.loadData = this.loadData.bind(this);
		this.updateTime = this.updateTime.bind(this);
		this.handleCompleteWorkOrder = this.handleCompleteWorkOrder.bind(this);
    this.handlePhotoZoom = this.handlePhotoZoom.bind(this);
		this.handleDropdownOnChangeText = this.handleDropdownOnChangeText.bind(this);
		this.handleRemoveProduct = this.handleRemoveProduct.bind(this);
		this.renderDropdown = this.renderDropdown.bind(this);
		this.handleSignature = this.handleSignature.bind(this);
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

	handleSignature(){
		this.props.onShowSidePanel(
			'Signature',
			<SignaturePanel workOrder={this.props.workOrder} onCompleteWorkOrder={this.handleCompleteWorkOrder}/>
		)
	}

	handleCompleteWorkOrder() {
		//console.log('handleCompleteWorkOrder');
		this.props.onComplete();
		console.log('notes: ', this.state.notes);
    this.props.workOrder.notes = this.state.notes;
    this.props.workOrder.save();

		this.toggleActiveStatus('TRAVELLING',false);
		this.toggleActiveStatus('WORKING',false);

		this.props.workOrder.complete((success) => {
		this.props.workOrder.status = "COMPLETED";
		if (this.props.onWorkOrderUpdated) this.props.onWorkOrderUpdated()
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

	handleDropdownOnChangeText(text){
			this.setState({searchText: text})
			EliteAPI.STR.Product.search({query_search: text, take: 1000, include_classes: 'productprice', status: 'WON'}, success => {
					//console.log(success.data.models[0]);
					this.setState({products: success.data.models});
			});
	}

	handleRemoveProduct(product){
			let myArray = this.state.selectedProducts.filter(item => item != product);
			this.setState({
					selectedProducts: myArray
			})
	}

	handleDropdownPress(product){
			//console.log(product);
			this.setState({
					searchText: '',
					products: []
			});
			this.state.selectedProducts.push(product);
	}

	renderDropdown(product) {
			return (
					<TouchableOpacity
							key={product.product_id}
							onPress={() => this.handleDropdownPress(product)}
							style={STYLES.dropdownText}>
							<Text>
									{product.name}
							</Text>
					</TouchableOpacity>

			)
	}

	render() {
		let dropdownMenu = this.state.products.map(product => {return this.renderDropdown(product)});
		let ProductRow = this.state.selectedProducts.map(product =>
				<ProductSelectRow key={product.product_id} product={product} onRemoveProduct={this.handleRemoveProduct}/>
		)
		return (

			<View style={STYLES.container}>


                {/* =========================================================

                Image Zoom View
                    - Pressing a photo will bring you to the zoom view for that one photo (photo-row component)

                ============================================================*/}
                <Modal visible={this.state.showPictureModal} transparent={true} onRequestClose= {() => this.setState({showPictureModal : false})}>
                    <ImageViewer imageUrls={this.state.selectedImage}/>
                </Modal>


                {/* =========================================================

                Toggle Section (Located: const right after this class)
                    - Travel and Job
                    - Hours and Minutes
                    - Start and Stop

                ============================================================*/}
                <ToggleSection
                    title='Travel'
                    hours={this.state.travellingTotalHours}
                    minutes={this.state.travellingTotalMinutes}
                    onValueChange={(value) => this.toggleActiveStatus('TRAVELLING',value)}
                    activeStatus={this.state.activeStatus}
                    job='TRAVELLING'/>

                <ToggleSection
                    title='Job'
                    hours={this.state.workingTotalHours}
                    minutes={this.state.workingTotalMinutes}
                    onValueChange={(value) => this.toggleActiveStatus('WORKING',value)}
                    activeStatus={this.state.activeStatus}
                    job='WORKING'/>


								{/* =========================================================

                Product Select Row

                ============================================================*/}
								<View style={STYLES.productSelectContainer}>
									<Text style={STYLES.notesTitle}>Products</Text>
									<TextInput style={STYLES.dropdownTextInput}
											underlineColorAndroid = "transparent"
											autoCapitalize = "none"
											onChangeText = {(text) => this.handleDropdownOnChangeText(text)}
											value={this.state.searchText}/>

									{
											this.state.products.length > 0 ?
											<View style={STYLES.dropdownMenu}>
													{dropdownMenu}
											</View> : null
									}

									{
											this.state.selectedProducts.length > 0 ?
											<View>
													<View style={STYLES.selectedBox}>
															<Text style={[STYLES.selectedBoxTitle,STYLES.nameContainer]}>NAME</Text>
															<Text style={[STYLES.selectedBoxTitle,STYLES.flexBox1]}>PRICE</Text>
															<Text style={[STYLES.selectedBoxTitle,STYLES.flexBox2]}>QUANTITY</Text>
													</View>
													<View style={STYLES.selectedBoxBody}>
															{ProductRow}
													</View>
											</View> : null
									}
								</View>


                {/* =========================================================

                Photo Row (Located: ./photo-row)
                    - Before and After
                    - Displays all photos in a row
                    - Add button triggers the camera in the side panel

                ============================================================*/}
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


                {/* =========================================================

                Notes
                    - Write any notes about the work order
                    - Save notes button

                ============================================================*/}
                <View style={STYLES.notesTitleContainer}>
                    <Text style={STYLES.notesTitle}>Notes</Text>
                </View>

                <View style={STYLES.notesContainer}>
                    <TextInput
                        placeholder = "Enter notes here"
                        underlineColorAndroid = "transparent"
                        value={this.state.notes}
                        onChangeText = {(text) => this.setState({notes: text})}
                        multiline={true}/>
                </View>


                {/* =========================================================

                Complete Work Order Button

                ============================================================*/}
                <TouchableOpacity
                    style={STYLES.completeButton}
                    onPress={this.handleSignature}>
                    <Text style={STYLES.toggleText}>Complete</Text>
                </TouchableOpacity>



			</View>
		)
	}
	}


const ToggleSection = (props) => {
    return (
        <View style={STYLES.outsideToggleContainer}>
						{props.activeStatus === props.job ?
							<View style={{...STYLES.leftToggleContainer, backgroundColor: EliteWorksOrange}}>
									<Text style={STYLES.toggleTextTitle}>{props.title}</Text>
							</View> :
							<View style={{...STYLES.leftToggleContainer, backgroundColor: Blueberry}}>
									<Text style={STYLES.toggleTextTitle}>{props.title}</Text>
							</View>
						}

            <View style={STYLES.rightToggleContainer}>
                <Text style={STYLES.toggleText}>
                    {props.hours} hours    {props.minutes} minutes
                </Text>

                <View style={STYLES.toggleContainer}>
                    <Text style={STYLES.toggleText}>Stop</Text>
                    <Switch
                        trackColor = '#F7882F'
                        _thumbColor = 'white'
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
	selectedBox: {
			flexDirection: 'row',
			backgroundColor: 'black',
			padding: 10,
			borderTopLeftRadius: 5,
			borderTopRightRadius: 5,
			marginTop: 10
	},
	selectedBoxBody: {
			padding: 10,
			borderBottomLeftRadius: 5,
			borderBottomRightRadius: 5,
			borderWidth: 1
	},
	selectedBoxTitle: {
			color: 'white'
	},
	flexBox1: {
			flex: 1
	},
	flexBox2: {
			flex: 2
	},
	nameContainer: {
			width: 100
	},
	productSelectContainer: {
		width: '100%',
		marginVertical: 20
	},
	dropdownTextInput: {
			padding: 5,
			borderWidth: 1,
			borderRadius: 5,
			width: '100%'
	},
	dropdownText: {
			margin: 10
	},
	dropdownMenu: {
			backgroundColor: '#eaeaea',
			padding: 10,
			borderRadius: 5
	},
	outsideToggleContainer: {
    flexDirection: 'row',
    height: 120,
		width: 300,
		margin: 10
	},
  leftToggleContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderRightWidth: 2,
    borderColor: 'white',
		borderTopLeftRadius: 5,
		borderBottomLeftRadius: 5
  },
  rightToggleContainer: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 30,
    backgroundColor: Blueberry,
		borderTopRightRadius: 5,
		borderBottomRightRadius: 5
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
    color: 'black',
    fontSize: 16,
    fontWeight: 'bold'
  },
  notesTitleContainer: {
    alignSelf: 'flex-start',
		marginLeft: 15
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
    marginTop: 15,
		borderWidth: 1
	},
	outsidePhotoContainer: {
    marginVertical: 20,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
		alignSelf: 'flex-start'
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
  	alignItems: 'center',
    marginTop: 20
}
}
