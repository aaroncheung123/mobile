import React from 'react';
import {View, Text, TouchableOpacity, Animated, Switch, ScrollView, TextInput} from 'react-native';
import {EliteWorksOrange, AccountContentGrey, AccountMenuGrey, Blueberry, DarkBlueberry, AppleCore} from '../assets/styles/constants';
import Icon from 'react-native-vector-icons/FontAwesome';
import WorkOrderSpringContent from './work-order-spring-content';
import Call from 'react-native-phone-call';
import OpenMap from 'react-native-open-maps';

const STATUS_COLOR = {
	'SCHEDULED' : Blueberry,
	'PENDING' : Blueberry,
	'TRAVELLING' : EliteWorksOrange,
	'IN PROGRESS' : EliteWorksOrange,
	'COMPLETED' : AccountMenuGrey
}


export default class WorkOrderCard extends React.Component {


	constructor(props){
      super(props);
      this.state = {
          drivingSwitch: false,
          jobSwitch: false,
      }
      this.springValue = new Animated.Value(0);
      this.handleDetailsPress = this.handleDetailsPress.bind(this);
			this.callCustomer = this.callCustomer.bind(this);
			this.loadMap = this.loadMap.bind(this);
			this.handleCustomerInfoPress = this.handleCustomerInfoPress.bind(this);
    }

  handleDetailsPress() {
        if (this.props.onShowSpringPanel){
            this.props.onShowSpringPanel(
                this.props.workOrder.name,
                <WorkOrderSpringContent
									onComplete={this.props.onComplete}
									onShowSpringPanel={this.props.onShowSpringPanel}
									onShowSidePanel={this.props.onShowSidePanel}
									workOrder={this.props.workOrder}
									onWorkOrderUpdated={() => this.forceUpdate()}/>
            )
        }
    }

	callCustomer(){
		let args = {
			number: this.props.workOrder.user.phone,
			prompt: true
		}

		Call(args).catch(console.error)
	}

	loadMap() {
		OpenMap({end: this.props.workOrder.address.formatted})
	}

	handleCustomerInfoPress() {
		//console.log('handleCustomerInfoPress',this.props.workOrder);
		this.props.onShowSpringPanel(
			'Customer Information',
			<View>
				<View style={STYLES.rowContainer}>
					<Text style={STYLES.textStyle1}>Name: </Text>
					<Text style={STYLES.textStyle1}>{this.props.workOrder.user.full_name}</Text>
				</View>

				<View style={STYLES.rowContainer}>
					<Text style={STYLES.textStyle1}>Email: </Text>
					<Text style={STYLES.textStyle1}>{this.props.workOrder.user.email}</Text>
				</View>

				<View style={STYLES.rowContainer}>
					<Text style={STYLES.textStyle1}>Phone: </Text>
					<Text style={STYLES.textStyle1}>{this.props.workOrder.user.phone}</Text>
				</View>

				<View style={STYLES.rowContainer}>
					<Text style={STYLES.textStyle1}>Address: </Text>
					<Text style={STYLES.textStyle1}>{this.props.workOrder.address.formatted}</Text>
				</View>

			</View>
		)
	}

  render() {

    	let scheduledDate = this.props.workOrder.scheduled_at ? GlobalUtil.convertMysqlToDate(this.props.workOrder.scheduled_at).formatDate('n/d/y H:m A') : '-';
			let activeColor = STATUS_COLOR[this.props.workOrder.status] ? STATUS_COLOR[this.props.workOrder.status] : Blueberry

	    return (
	    	<View style={STYLES.outsideContainer}>

	          <View style={{...STYLES.borderTopContainer, backgroundColor: activeColor}}>
	              <Text style={STYLES.workOrderTitleText}>STATUS: {this.props.workOrder.status}</Text>
	          </View>


	          <View style={STYLES.container}>
	              <DisplayLabel label="Name" value={this.props.workOrder.name}/>
	              <DisplayLabel label="Work Order #" value={this.props.workOrder.key}/>
	              <DisplayLabel label="Scheduled" value={scheduledDate}/>


	              <View style={STYLES.buttonSectionContainer}>
	                  <TouchableOpacity style={STYLES.buttonContainer} onPress={this.callCustomer}>
	                      <Icon name='phone' size= {20} color='black'/>
	                  </TouchableOpacity>
	                  <TouchableOpacity style={STYLES.buttonContainer} onPress={this.loadMap}>
	                      <Icon name='map-o' size= {20} color='black'/>
	                  </TouchableOpacity>
	                  <TouchableOpacity style={STYLES.buttonContainer} onPress={this.handleCustomerInfoPress}>
	                      <Icon name='user' size= {20} color='black'/>
	                  </TouchableOpacity>
	              </View>

	              <TouchableOpacity
	                  style={STYLES.detailsButton}
	                  onPress={this.handleDetailsPress}>

	                  <Text>Details</Text>
	              </TouchableOpacity>
	          </View>

	      </View>

	    );
		}
}


const DisplayLabel = (props) => {
    return (
        <View style={STYLES.innerContainer}>
            <View style={STYLES.leftContainer}>
                <Text style={STYLES.textStyle}>{props.label}</Text>
            </View>

            <View style={STYLES.rightContainer}>
                <Text style={STYLES.textStyle}>{props.value}</Text>
            </View>
        </View>
    )
}


const STYLES = {
  outsideContainer: {
        marginVertical: 10
    },
  container: {
        borderLeftWidth: 1,
        borderRightWidth: 1,
        borderBottomWidth: 1,
        borderColor: Blueberry,
        borderBottomLeftRadius: 5,
        borderBottomRightRadius: 5,
        padding: 10,
        minHeight: 100
    },
  innerContainer: {
      flexDirection:'row',
      marginHorizontal: 10,
      marginTop: 5
  },
  leftContainer: {
      flex: 2
  },
  rightContainer: {
      flex: 3
  },
  borderTopContainer: {
      borderTopLeftRadius: 5,
      borderTopRightRadius: 5,
      padding: 10,
      flexDirection: 'row',
      justifyContent: 'space-between'
  },
  textStyle: {
      fontSize: 14,
      margin: 5,
  },
  workOrderTitleText: {
      color: 'white',
      fontSize: 14,
  },
  detailsButton: {
      justifyContent: 'center',
      alignItems: 'center',
      alignSelf: 'center',
      width: '90%',
      padding: 10,
      borderColor: Blueberry,
      borderWidth: 1,
      borderRadius: 5,
      margin: 10
  },
  buttonContainer: {
      padding: 10,
      borderWidth: 1,
      borderColor: Blueberry,
      borderRadius: 5,
      height: 50,
      width: 50,
      justifyContent: 'center',
      alignItems: 'center',
  },
  buttonSectionContainer: {
      marginVertical: 15,
      flexDirection: 'row',
      justifyContent: 'space-around'
  },
	rowContainer: {
		width: '100%',
		flexDirection: 'row',
		justifyContent: 'flex-start',
		alignItems: 'flex-start',
		padding: 10
	},
	textStyle1: {
		fontSize: 16,
		color: 'white'
	},


}
