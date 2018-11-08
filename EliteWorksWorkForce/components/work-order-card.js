import React from 'react';
import {View, Text, TouchableOpacity, Animated, Switch, ScrollView, TextInput} from 'react-native';
import {EliteWorksOrange, AccountContentGrey, AccountMenuGrey, Blueberry, DarkBlueberry, AppleCore} from '../assets/styles/constants';
import Icon from 'react-native-vector-icons/FontAwesome';
import WorkOrderSpringContent from './work-order-spring-content';


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
                this.props.workOrder.name,
                <WorkOrderSpringContent workOrder={this.props.workOrder} />
            )
        }
    }

    render() {

        let scheduledDate = this.props.workOrder.scheduled_at ? GlobalUtil.convertMysqlToDate(this.props.workOrder.scheduled_at).formatDate('n/d/y H:m A') : '-';

        return (
            <View style={STYLES.outsideContainer}>
                <View style={STYLES.borderTopContainer}>
                    <Text style={STYLES.workOrderTitleText}>STATUS: {this.props.workOrder.status}</Text>


                    <TouchableOpacity>
                        <Icon name='trash' size= {20} color= 'white'/>
                    </TouchableOpacity>
                </View>


                <View style={STYLES.container}>
                    <DisplayLabel label="Name" value={this.props.workOrder.name}/>
                    <DisplayLabel label="Work Order #" value={this.props.workOrder.key}/>
                    <DisplayLabel label="Scheduled" value={scheduledDate}/>

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
        backgroundColor: Blueberry,
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


}
