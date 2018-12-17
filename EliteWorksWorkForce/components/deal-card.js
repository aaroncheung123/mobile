import React from 'react';
import {View, Text, TouchableOpacity, Animated, Button, Image, TextInput} from 'react-native';
import {EliteWorksOrange, AccountContentGrey, AccountMenuGrey, Blueberry, DarkBlueberry, AppleCore} from '../assets/styles/constants';
import WorkOrderCard from './work-order-card';
import AddWorkOrderForm from './add-work-order-form';
import Icon from 'react-native-vector-icons/FontAwesome';


const ICONS = {
	'up'    : require('../assets/images/icons/up_arrow.png'),
	'down'  : require('../assets/images/icons/down_arrow.png'),
}


export default class DealCard extends React.Component {

	constructor(props){
		super(props);

		this.state = {
			expanded: false,
			opacity: new Animated.Value(0),
			maxHeight: new Animated.Value(0),
			workOrders: []
		};

		this.toggle = this.toggle.bind(this);
        this.handleAddWorkOrder = this.handleAddWorkOrder.bind(this);
	}

	componentDidMount() {
		let startOfDay = (new Date()).getStartOfDay();

		EliteAPI.STR.WorkOrder.search({
            include_classes: 'user,address',
            take: 1000,
            deal_id: this.props.deal.deal_id,
            scheduled_after: GlobalUtil.convertDateToMysql(startOfDay)}, success => {
                //console.log(success.data.models)
                this.setState({workOrders: success.data.models})
            })
	}



	toggle(){

		this.state.opacity.setValue(0);
		this.state.maxHeight.setValue(0);

		this.setState({
			expanded : !this.state.expanded
		}, () => {

			if (this.state.expanded) {

				Animated.timing(
					this.state.opacity,
					{
						toValue: 1,
						duration: 1000
					},
				).start();

				Animated.spring(
					this.state.maxHeight,
					{
						toValue: 500,
                		friction: 6
					}
				).start();
			}
		});
	}

    handleAddWorkOrder() {
        this.props.onShowSpringPanel(
            "Add Work Order",
            <AddWorkOrderForm onShowSidePanel={this.props.onShowSidePanel} onComplete={this.props.onComplete} deal={this.props.deal}/>
        )
    }

	render(){

		let lastScheduledService = null
		if (this.props.deal.lastest_scheduled_work_order) {
			lastScheduledService = <Text style={STYLES.textStyle}>Latest Service: {GlobalUtil.convertMysqlToDate(this.props.deal.lastest_scheduled_work_order).formatDate('n/d/y H:m A')}</Text>
		}

		let workOrders = this.state.workOrders.map(workOrder =>
            <WorkOrderCard
								onComplete={this.props.onComplete}
                workOrder={workOrder}
                key={workOrder.work_order_id}
                onShowSpringPanel={this.props.onShowSpringPanel}
                onShowSidePanel={this.props.onShowSidePanel}/>)

		return(
			<View style={STYLES.container}>
				<TouchableOpacity style={STYLES.elevatedContainer} onPress={this.toggle}>
						<View>
							<View style={STYLES.textContainer}>
								<Text style={STYLES.textStyleTitle}>{this.props.deal.name}</Text>
								<Text style={STYLES.textStyle}>Client: {this.props.deal.user.full_name}</Text>
								{lastScheduledService}
							</View>
							<View style={STYLES.arrowContainer}>
								<Image
								  style={STYLES.arrow}
								  source={ICONS[this.state.expanded ? 'down' : 'up']}>
								</Image>
							</View>
						</View>
				</TouchableOpacity>
				{
					this.state.expanded ?
					<Animated.View style={{...STYLES.hiddenBody, opacity: this.state.opacity, maxHeight: this.state.maxHeight < 500 ? this.state.maxHeight : 100000}}>
						<View style={STYLES.descriptionContainer}>
							<Text style={STYLES.textStyle2}>Description:</Text>
							<Text style={STYLES.textStyle3}>{GlobalUtil.htmlTextStripper(this.props.deal.description)}</Text>
						</View>

						<TouchableOpacity
              onPress={this.handleAddWorkOrder}
              style={STYLES.addButton}>
              <Text style={STYLES.textStyle}>+ Work Order</Text>
						</TouchableOpacity>

						{
							this.state.workOrders.length > 0 ?
							<View>
								<Text style={STYLES.textStyle2}>Work Orders</Text>
								{workOrders}
							</View> : null
						}
					</Animated.View> : null
				}
			</View>

		);
	}
}

const STYLES = {
	container: {
		width: '100%',
		flex: 1,
		backgroundColor: 'transparent',
		overflow: 'hidden',
		paddingLeft: 20,
		paddingRight: 20
	},
    addButton: {
        borderRadius: 5,
        backgroundColor: 'orange',
        padding: 10,
        margin: 10,
        marginBottom: 20,
        justifyContent: 'center',
        alignItems: 'center',
        width: '50%',
        alignSelf: 'center'
    },
	hiddenBody: {
		width: '100%',
		backgroundColor: 'white',
		padding: 20,
		borderRadius: 10,
		elevation: 10,
		shadowOffset: { height: 1, width: 1 }, // IOS
		shadowOpacity: 2, // IOS
		shadowRadius: 2, //IOS,
		marginBottom: 20
	},
	elevatedContainer: {
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
		marginBottom: 20
	}
}
