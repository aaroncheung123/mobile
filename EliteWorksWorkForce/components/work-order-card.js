import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {EliteWorksOrange, AccountContentGrey, AccountMenuGrey, Blueberry, DarkBlueberry, AppleCore} from '../assets/styles/constants';
import Icon from 'react-native-vector-icons/FontAwesome';


const WorkOrderCard = (props) => {


    let scheduledDate = props.workOrder.scheduled_at ? GlobalUtil.convertMysqlToDate(props.workOrder.scheduled_at).formatDate('n/d/y H:m A') : '-'

    return (
        <View>
            <TouchableOpacity style={STYLES.trashIcon}>
                <Icon name='trash' size= {20} color= 'white'/>
            </TouchableOpacity>

            <View style={STYLES.container}>
                <DisplayLabel label="Name" value={props.workOrder.name}/>
                <DisplayLabel label="Work Order #" value={props.workOrder.key}/>
                <DisplayLabel label="Status" value={props.workOrder.status}/>
                <DisplayLabel label="Scheduled" value={scheduledDate}/>

                <TouchableOpacity
                    style={STYLES.detailsButton}
                    onPress={props.onPressDetails}>
                    <Text>Details</Text>
                </TouchableOpacity>
            </View>
        </View>

    );
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

export default WorkOrderCard;

const STYLES = {
    container: {
        borderTopWidth: 30,
        borderLeftWidth: 1,
        borderRightWidth: 1,
        borderBottomWidth: 1,
        borderColor: Blueberry,
        borderRadius: 5,
        margin: 10,
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
    textStyle: {
        fontSize: 14,
        margin: 5,
    },
    trashIcon: {
        position: 'absolute',
        right: 0,
        zIndex: 1,
        marginRight: 20,
        marginTop: 15
    },
    detailsButton: {
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        width: 120,
        padding: 10,
        backgroundColor: EliteWorksOrange,
        borderRadius: 5,
        margin: 10
    }
}
