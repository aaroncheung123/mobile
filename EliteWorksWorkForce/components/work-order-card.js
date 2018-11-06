import React from 'react';
import {View, Text} from 'react-native';
import {EliteWorksOrange, AccountContentGrey, AccountMenuGrey, Blueberry, DarkBlueberry, AppleCore} from '../assets/styles/constants';

const WorkOrderCard = (props) => {
    return (
        <View style={STYLES.container}>


            <View style={STYLES.innerContainer}>
                <View style={STYLES.leftContainer}>
                    <Text style={STYLES.textStyle}>Name</Text>
                </View>

                <View style={STYLES.rightContainer}>
                    <Text style={STYLES.textStyle}>Snow Removal</Text>
                </View>
            </View>

            <View style={STYLES.innerContainer}>
                <View style={STYLES.leftContainer}>
                    <Text style={STYLES.textStyle}>Key</Text>
                </View>

                <View style={STYLES.rightContainer}>
                    <Text style={STYLES.textStyle}>d938012cf4</Text>
                </View>
            </View>


            <View style={STYLES.innerContainer}>
                <View style={STYLES.leftContainer}>
                    <Text style={STYLES.textStyle}>Status</Text>
                </View>

                <View style={STYLES.rightContainer}>
                    <Text style={STYLES.textStyle}>PROCESSED</Text>
                </View>
            </View>

            <View style={STYLES.innerContainer}>
                <View style={STYLES.leftContainer}>
                    <Text style={STYLES.textStyle}>Scheduled</Text>
                </View>

                <View style={STYLES.rightContainer}>
                    <Text style={STYLES.textStyle}>9/21/19</Text>
                </View>
            </View>

            <View style={STYLES.innerContainer}>
                <View style={STYLES.leftContainer}>
                    <Text style={STYLES.textStyle}>Date</Text>
                </View>

                <View style={STYLES.rightContainer}>
                    <Text style={STYLES.textStyle}>9/21/19</Text>
                </View>
            </View>



        </View>
    );
}

export default WorkOrderCard;

const STYLES = {
    container: {
        flex: 1,
        borderTopWidth: 15,
        borderLeftWidth: 1,
        borderRightWidth: 1,
        borderBottomWidth: 1,
        borderColor: Blueberry,
        borderRadius: 5
    },
    innerContainer: {
        flex: 1,
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
}
