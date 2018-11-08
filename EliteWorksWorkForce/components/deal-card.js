import React from 'react';
import {View, Text, TouchableOpacity, Animated, Button, Image, TextInput} from 'react-native';
import {EliteWorksOrange, AccountContentGrey, AccountMenuGrey, Blueberry, DarkBlueberry, AppleCore} from '../assets/styles/constants';
import WorkOrderCard from './work-order-card';


const ICONS = {
	'up'    : require('../assets/images/icons/up_arrow.png'),
	'down'  : require('../assets/images/icons/down_arrow.png'),
}


export default class DealCard extends React.Component {

	constructor(props){
		super(props);

		this.state = {
			expanded: true,
			animation: new Animated.Value(),
			workOrders: []
		};
	
		this.handleMaxHeight = this.handleMaxHeight.bind(this);
		this.handleMinHeight = this.handleMinHeight.bind(this);
		this.toggle = this.toggle.bind(this);
	}

	componentDidMount() {
		let startOfDay = (new Date()).getStartOfDay();

		EliteAPI.STR.WorkOrder.search({take: 1000, deal_id: this.props.deal.deal_id, scheduled_after: GlobalUtil.convertDateToMysql(startOfDay)}, success => {
			this.setState({workOrders: success.data.models})
		})
	}

	handleMaxHeight(event){
		this.setState({
			maxHeight   : event.nativeEvent.layout.height + 45
		});
	}

	handleMinHeight(event){
		this.setState({
			minHeight   : event.nativeEvent.layout.height + 45
		});
	}

	toggle(){

		let initialValue = this.state.expanded? this.state.maxHeight + this.state.minHeight : this.state.minHeight,
			finalValue = this.state.expanded? this.state.minHeight : this.state.maxHeight + this.state.minHeight;

		this.setState({
			expanded : !this.state.expanded
		});

		this.state.animation.setValue(initialValue);
		Animated.spring(
			this.state.animation,
			{
				toValue: finalValue
			}
		).start();
	}

	render(){


		let lastScheduledService = null
		if (this.props.deal.lastest_scheduled_work_order) {
			lastScheduledService = <Text style={STYLES.textStyle}>Latest Service: {GlobalUtil.convertMysqlToDate(this.props.deal.lastest_scheduled_work_order).formatDate('n/d/y H:m A')}</Text>
		}

		let workOrders = this.state.workOrders.map(workOrder => <WorkOrderCard workOrder={workOrder} key={workOrder.work_order_id}/>)

		return(
			<Animated.View style={[STYLES.container, {height: this.state.animation}]}>
				<TouchableOpacity style={STYLES.elevatedContainer} onLayout={this.handleMinHeight} onPress={this.toggle}>
						<View>
							<View style={STYLES.textContainer}>
								<Text style={STYLES.textStyleTitle}>{this.props.deal.name}</Text>
								<Text style={STYLES.textStyle}>Client: {this.props.deal.user.full_name}</Text>
								{lastScheduledService}
							</View>
							<View style={STYLES.arrowContainer}>
								<Image
								  style={STYLES.arrow}
								  source={ICONS[this.state.expanded ? 'up' : 'down']}>
								</Image>
							</View>
						</View>
				</TouchableOpacity>

				<View style={STYLES.hiddenBody} onLayout={this.handleMaxHeight}>
					<View style={STYLES.descriptionContainer}>
						<Text style={STYLES.textStyle2}>Description:</Text>
						<Text style={STYLES.textStyle3}>{GlobalUtil.htmlTextStripper(this.props.deal.description)}</Text>
					</View>

					{
						this.state.workOrders.length > 0 ?
						<View>
							<Text style={STYLES.textStyle2}>Work Orders</Text>
							{workOrders}
						</View> : null
					}

				</View>

			</Animated.View>

		);
	}
}

const STYLES = {
	container: {
		padding: 30,
		width: '100%',
		flex: 1,
		backgroundColor: 'transparent'
	},
	hiddenBody: {
		width: '100%',
		backgroundColor: 'white',
		marginTop: 2,
		padding: 20,
		borderRadius: 10,
		elevation: 10,
		shadowOffset: { height: 1, width: 1 }, // IOS
		shadowOpacity: 2, // IOS
		shadowRadius: 2, //IOS
	},
	elevatedContainer: {
		flex: 1,
		backgroundColor: Blueberry,
		borderRadius: 5,
		shadowOffset: { height: 1, width: 1 }, // IOS
		shadowOpacity: 2, // IOS
		shadowRadius: 2, //IOS
		elevation: 10, // Android
		paddingHorizontal: 40,
		paddingVertical: 20,
		width: '100%',
		marginBottom: 25
	},
	textStyle: {
		color: 'white'
	},
	textStyleTitle: {
		width: '100%',
		color: 'white',
		fontSize: 18,
		paddingBottom: 15,
		borderBottomWidth: 2,
		borderColor: 'white',
		fontWeight: 'bold'
	},
	textStyle2: {
		fontSize: 18,
		color: 'black'
	},
	textStyle3: {
		color: 'black'
	},
	textContainer: {
		justifyContent: 'center',
		alignItems: 'flex-start',
	},
	buttonImage: {
		height: 40,
		width: 40
	},
	arrow : {
		width: 12,
		height: 8,
		opacity: .3
	},
	arrowContainer: {
		justifyContent: 'center',
		alignItems: 'center',
		marginTop: 20
	},
	descriptionContainer: {
		flex: 1,
		marginBottom: 20
	}
}
