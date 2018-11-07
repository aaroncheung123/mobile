import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {EliteWorksOrange, AccountContentGrey, AccountMenuGrey, Blueberry, DarkBlueberry, AppleCore} from '../assets/styles/constants';
import Icon from 'react-native-vector-icons/FontAwesome';

const WorkOrderCard = (props) => {
    return (
        <View>
            <TouchableOpacity style={STYLES.trashIcon}>
                <Icon name='trash' size= {20} color= 'white'/>
            </TouchableOpacity>

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

        </View>

    );
}

export default WorkOrderCard;

const STYLES = {
    container: {
        flex: 1,
        borderTopWidth: 30,
        borderLeftWidth: 1,
        borderRightWidth: 1,
        borderBottomWidth: 1,
        borderColor: Blueberry,
        borderRadius: 5,
        margin: 10
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
    trashIcon: {
        position: 'absolute',
        right: 0,
        zIndex: 1,
        marginRight: 20,
        marginTop: 15
    }
}
