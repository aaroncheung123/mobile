import React from 'react';
import {View, Text} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

export default class Blurb extends React.Component {

    render() {
        return (
            <View style={STYLES.container}>
                <View style={STYLES.iconContainer}>
                    <Icon name='home' size= {45}/>
                </View>

                <View style={STYLES.cardContainer}>
                    <View style={STYLES.bodyTextContainer}>
                        <Text style={STYLES.textHeader}>John Doe</Text>
                        <Text style={STYLES.textContent}>9104 N Cornwall Way, Eagle Mountain, UT 84005</Text>
                    </View>


                    <View style={STYLES.editIconContainer}>
                        <Icon name='edit' size= {25}/>
                    </View>
                </View>
            </View>

        );
    }
}

const STYLES = {
    container: {
        flex: 1,
        flexDirection: 'row',
        padding: 30
    },
    iconContainer:{
        position: 'absolute',
        zIndex: 1,
        backgroundColor:'orange',
        borderRadius: 50,
        padding: 15,
        marginTop: 40,
        marginLeft: 20
    },
    cardContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'flex-start',
        backgroundColor: 'white',
        opacity: .9,
        marginLeft: 25,
        borderRadius: 5,
        height: '100%'
    },
    textHeader: {
        fontSize: 24
    },
    textContent: {
        fontSize: 12,
    },
    bodyTextContainer: {
        marginVertical: 20,
        marginLeft: 60,
        flex: 4
    },
    editIconContainer: {
        marginTop: 10,
        justifyContent:'center',
        alignItems: 'center',
        flex: 1
    }
}


// position: 'absolute',
// top: 10,
// left: 235,
