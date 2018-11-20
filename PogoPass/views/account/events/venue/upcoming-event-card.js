import React from 'react';
import {View, Text} from 'react-native';

const UpcomingEventCard = (props) => {


    let availability = undefined;
    let registrationStart = undefined;
    let registrationEnd = undefined;


    let showRegistrationButton = false;
    if (props.event.time_blocks && props.event.time_blocks.length > 0 && props.event.time_blocks[0].availabilities && props.event.time_blocks[0].availabilities.length > 0)
    {
        availability = props.event.time_blocks[0].availabilities[0];
        registrationStart = GlobalUtil.convertMysqlToDateRaw(availability.registraion_start);
        registrationEnd = GlobalUtil.convertMysqlToDateRaw(availability.registraion_end);

        let now = new Date();
        if (now > registrationStart && now < registrationEnd) showRegistrationButton = true;
    }

    return (
        <View style={STYLES.container}>
            <View style={STYLES.leftContainer}>
                <Text style={STYLES.title}>{GlobalUtil.convertMysqlToDateRaw(props.event.start).formatDate('n/d')}</Text>
                <Text style={STYLES.title}>{GlobalUtil.convertMysqlToDateRaw(props.event.start).formatDate('H:m A')}</Text>
            </View>
            <View style={STYLES.rightContainer}>
                <Text style={STYLES.title1}>{props.event.name}</Text>
                {
                    availability ?
                    <View>
                        <Text style={STYLES.title1}>Registration:</Text>
                        <Text style={STYLES.title1}>{registrationStart.formatDate('n/d H:m A')} - {registrationEnd.formatDate('n/d H:m A')}</Text>
                            {
                                showRegistrationButton ?
                                <TouchableOpacity
                                    style={STYLES.registrationButton}
                                    onPress={() => this.props.onRegister(availability)}>
                                        <Text>Register</Text>
                                </TouchableOpacity> : null

                            }
                    </View> : null
                }
            </View>
        </View>
    );
}

export default UpcomingEventCard;

const STYLES = {
    container: {
        flexDirection: 'row',
        borderTopWidth: 20,
        borderColor: 'orange',
        margin: 5
    },
    leftContainer: {
        flex: 1,
        justifyContent: 'center',
        borderLeftWidth: 2,
        borderBottomWidth: 2,
        borderTopWidth: 2,
        borderColor: '#bfbfbf',
        padding: 10
    },
    rightContainer: {
        flex: 2,
        justifyContent: 'center',
        borderWidth: 2,
        borderColor: '#bfbfbf',
        padding: 10
    },
    title: {
        fontSize: 14,
        textAlign: 'center'
    },
    title1: {
        fontSize: 14,
        textAlign: 'left'
    },
    registrationButton: {
        backgroundColor: 'orange',
        padding: 10,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 20
    }
}
