
import React from 'react';
import {StyleSheet, View, TextInput, Image, Keyboard, TouchableWithoutFeedback, Text, Animated, TouchableHighlight} from 'react-native';
import {EliteWorksOrange, AccountContentGrey, AccountMenuGrey} from '../../assets/styles/constants';
import DatePicker from 'react-native-datepicker'
import WorkOrderModal from './work-order-modal';
import WorkOrderCard from '../../components/work-order-card.js';

export default class WorkOrders extends React.Component {

	constructor(props) {
		super(props);

		this.state = {

			selectedDay: new Date(),
			workOrders: []
		}
	}

	componentDidMount() {
		this.loadWorkOrders();
	}


	loadWorkOrders() {
		Service.User.get((user) => {
			EliteAPI.STR.WorkOrder.search({assigned_user_id: user.id, include_classes: 'workorderproduct,user,address', 'scheduled_at_start': GlobalUtil.convertDateToMysql(this.state.selectedDay.getStartOfDay()), 'scheduled_at_end': GlobalUtil.convertDateToMysql(this.state.selectedDay.getEndOfDay())}, (success) => {
				this.setState({workOrders: success.data.work_orders});
			})
		})
	}

	render() {
		return (
			<View>
				<View style={PANEL.container}>
					<View style={PANEL.dateSearch}>
						<Text>Search by date</Text>
						<DatePicker
							style={PANEL.datePickerContainer}
							date={this.state.selectedDay}
							showIcon={false}
	    				onDateChange={(date) => {this.setState({selectedDay: new Date(date)}, this.loadWorkOrders)}}
			        confirmBtnText="Confirm"
			        cancelBtnText="Cancel"
			        format="MM/DD/YYYY"
						/>
					</View>

					<View style={PANEL.workOrderContainer}>
						<Text>Hello</Text>
						<WorkOrderCard/>
						<WorkOrderCard/>
						<WorkOrderCard/>
						<WorkOrderCard/>
						<Text>Hello</Text>
					</View>





					<View style={PANEL.TableContainer}>
						{ this.state.workOrders.map( (workOrder) => <WorkOrderRow key={workOrder.work_order_id} workOrder={workOrder} onSelect={() => this.setState({selectedWorkOrder: workOrder})}/> ) }
					</View>
					<WorkOrderModal onClose={() => this.setState({selectedWorkOrder: undefined})} onUpdate={() => this.loadWorkOrders()} workOrder={this.state.selectedWorkOrder}/>
				</View>
			</View>
		)
	}
}



const WorkOrderRow = (props) => {

	let scheduledAt = GlobalUtil.convertMysqlToDate(props.workOrder.scheduled_at);

	return (
		<TouchableWithoutFeedback onPress={props.onSelect} >
			<View style={WORK_ORDER_ROW.container}>
				<TimeClockRowCell value={props.workOrder.status} header={'Status'} showBorder={true} width="40%"/>
				<TimeClockRowCell value={props.workOrder.user.full_name} header={props.workOrder.name} showBorder={false} width="60%"/>
			</View>
		</TouchableWithoutFeedback>
	)
}

const TimeClockRowCell = (props) => {
	let containerStyle = {width: props.width}
	if (props.showBorder)
	{
		containerStyle.borderRightColor = '#eeeeee';
		containerStyle.borderRightWidth = 2;
	}
	return (

		<View style={containerStyle}>
			<Text style={WORK_ORDER_ROW.cellHeaderText}>{props.header}</Text>
			<Text style={WORK_ORDER_ROW.cellValue}>{props.value}</Text>
		</View>
	)
}

const WORK_ORDER_ROW = {
	cellHeaderText: {
		color: '#cccccc',
		width: '100%',
		textAlign: 'center'
	},
	cellValue: {
		color: '#222222',
		width: '100%',
		textAlign: 'center',
		fontSize: 20
	},

	container: {
		marginTop: 10,
		paddingTop: 2.5,
		borderWidth: 1,
		borderColor: '#f5f5f5',
		borderLeftColor: EliteWorksOrange,
		borderLeftWidth: 4,
		height: 45,
		minWidth: '100%',
		borderRadius: 5,
		flexDirection: 'row'
	}
}

const PANEL = {
	container: {
		backgroundColor: 'white',
		borderRadius: 10,
		alignItems: 'center',
		margin: 10
	},
	workOrderContainer: {
		padding: 20,
		backgroundColor: 'pink',
		width: '100%'
	},
	dateSearch: {
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
		padding: 10
	},
	datePickerContainer: {
		margin: 10
	},
	headerText: {
		margin: 15,
		color: EliteWorksOrange,
		fontSize: 25,
		fontWeight: 'bold'
	},
	timeText: {
		marginBottom: 15,
		color: '#222222',
		fontSize: 25
	},
	statusText: {
		marginBottom: 15,
		fontSize: 25
	},
	clockInButtonContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		marginBottom: 15
	},
	clockInButton: {
		height: 50,
		borderRadius: 15,
		width: 125
	},
	TableContainer: {
		margin: 15,
	},
	SelectPicker: {
		inputIOS: {
	        fontSize: 24,
	        paddingTop: 13,
	        paddingHorizontal: 10,
	        paddingBottom: 12,
	        borderTopWidth: 1,
	        borderBottomWidth: 1,
	        borderTopColor: 'gray',
	        borderBottomColor: 'gray',
	        color: 'black',
	        textAlign: 'center',
	        marginTop: 15
	    },
	}
}
