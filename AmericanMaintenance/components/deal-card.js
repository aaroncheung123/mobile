import React from 'react';
import {View, Text, TouchableOpacity, Animated, Button, Image, TextInput} from 'react-native';
import {EliteWorksOrange, AccountContentGrey, AccountMenuGrey, Blueberry, DarkBlueberry, AppleCore} from '../assets/styles/constants';
import DealCardSpringContent from './deal-card-spring-content';
import Icon from 'react-native-vector-icons/FontAwesome';


const ICONS = {
	'up'    : require('../assets/images/icons/up_arrow.png'),
	'down'  : require('../assets/images/icons/down_arrow.png'),
}


export default class DealCard extends React.Component {

	constructor(props){
		super(props);

		this.state = {
			opacity: new Animated.Value(0),
			workOrders: []
		};

		this.toggle = this.toggle.bind(this);
    //this.handleWorkOrderAdd = this.handleWorkOrderAdd.bind(this);
	}

	componentDidMount() {
		let startOfDay = (new Date()).getStartOfDay();
		//console.log('DEAL: ', this.props.deal.address.formatted);
		EliteAPI.STR.WorkOrder.search({
      include_classes: 'model,address,workorderproduct',
      take: 1000,
      deal_id: this.props.deal.deal_id,
      scheduled_after: GlobalUtil.convertDateToMysql(startOfDay)}, success => {
          //console.log('HELLO',success.data.models)
          this.setState({workOrders: success.data.models})
      })
	}


	toggle(){
		this.props.onShowSpringPanel(
			this.props.deal.name,
			<DealCardSpringContent
				deal={this.props.deal}
				workOrders={this.state.workOrders}
				onComplete={this.props.onComplete}
				onShowCameraPanel={this.props.onShowCameraPanel}
				onShowSpringPanel={this.props.onShowSpringPanel}
				onShowSidePanel={this.props.onShowSidePanel}/>)
	}

	render(){

		let lastScheduledService = null
		if (this.props.deal.lastest_scheduled_work_order) {
			lastScheduledService =
				<Text style={STYLES.textStyle}>
					Latest Service: {GlobalUtil.convertMysqlToDate(this.props.deal.lastest_scheduled_work_order).formatDate('n/d/y H:m A')}
				</Text>
		}

		return(
			<View style={STYLES.container}>
				<TouchableOpacity style={STYLES.elevatedContainer} onPress={this.toggle}>
						<View>
							<View style={STYLES.textContainer}>
								<Text style={STYLES.textStyleTitle}>{this.props.deal.name}</Text>
								<Text style={STYLES.textStyle}>{this.props.deal.address.formatted}</Text>
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
	}
}
