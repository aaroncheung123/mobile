import React from 'react';
import {View, Text, TouchableOpacity, Animated, Switch, ScrollView, TextInput} from 'react-native';
import {EliteWorksOrange, AccountContentGrey, AccountMenuGrey, Blueberry, DarkBlueberry, AppleCore} from '../assets/styles/constants';
import Icon from 'react-native-vector-icons/FontAwesome';
import WorkOrderSpringContent from './work-order-spring-content';

const STATUS_COLOR = {
	'SCHEDULED' : Blueberry,
	'PENDING' : Blueberry,
	'TRAVELLING' : EliteWorksOrange,
	'IN PROGRESS' : EliteWorksOrange,
	'COMPLETED' : AccountMenuGrey
}


export default class WorkOrderCard extends React.Component {


    constructor(props)
    {
        super(props);
        this.state = {
            drivingSwitch: false,
            jobSwitch: false,
        }
        this.springValue = new Animated.Value(0);

        this.handleDetailsPress = this.handleDetailsPress.bind(this);
    }


    handleDetailsPress() {
        if (this.props.onShowSpringPanel)
        {
            this.props.onShowSpringPanel(
<<<<<<< HEAD
                this.props.workOrder.name, 
                <WorkOrderSpringContent workOrder={this.props.workOrder} onWorkOrderUpdated={() => this.forceUpdate()}/>
=======
                this.props.workOrder.name,
                <WorkOrderSpringContent workOrder={this.props.workOrder} />
>>>>>>> cdb3fd9e9949217f8a2353bb79e78a7666a9d700
            )
        }
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
                        <TouchableOpacity style={STYLES.buttonContainer}>
                            <Icon name='phone' size= {20} color='black'/>
                        </TouchableOpacity>
                        <TouchableOpacity style={STYLES.buttonContainer}>
                            <Icon name='map-o' size= {20} color='black'/>
                        </TouchableOpacity>
                        <TouchableOpacity style={STYLES.buttonContainer}>
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


const DisplayLabel = (props) =>
{
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
        //backgroundColor: 'white',
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
    }

}
