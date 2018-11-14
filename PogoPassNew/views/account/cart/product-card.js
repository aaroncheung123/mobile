import React from 'react';
import {View, Text, TouchableOpacity, TextInput} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

export default class ProductCard extends React.Component {

    handleQuantity(){

    }

    render() {
        return (
            <View>


                <View style={STYLES.orangeBoxContainer}>
                    <Text style={STYLES.productTitleText}>Pogo Pass San Antonio - 12 Months</Text>
                    <TouchableOpacity style={STYLES.trashIcon}>
                        <Icon name='trash' size= {25}/>
                    </TouchableOpacity>
                </View>

                <View style={STYLES.container}>
                    <View style={STYLES.innerContainer}>
                        <View style={STYLES.leftContainer}>
                            <Text style={STYLES.title}>Price</Text>
                        </View>
                        <View style={STYLES.rightContainer}>
                            <Text style={STYLES.title1}>$99.95 / 1 year</Text>
                        </View>
                    </View>

                    <View style={STYLES.innerContainer}>
                        <View style={STYLES.leftContainer}>
                            <Text style={STYLES.title}>Quantity</Text>
                        </View>
                        <View style={STYLES.rightContainer}>
                            <TextInput
                                style = {STYLES.textInputStyle}
                                keyboardType = 'number-pad'
                                underlineColorAndroid = "transparent"
                                value = '1'
                                onChangeText = {this.handleQuantity}/>
                        </View>
                    </View>


                    <View style={STYLES.innerContainer}>
                        <View style={STYLES.leftContainer}>
                            <Text style={STYLES.title}>Total Price</Text>
                        </View>
                        <View style={STYLES.rightContainer}>
                            <Text style={STYLES.title1}>$99.95</Text>
                        </View>
                    </View>



                </View>
            </View>
        );
    }
}


const STYLES = {
    container: {
        marginBottom: 30,
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10,
        backgroundColor: 'white',
        opacity: .9,
        padding: 10
    },
    orangeBoxContainer: {
        flexDirection: 'row',
        backgroundColor: 'orange',
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        paddingHorizontal: 10,
        paddingVertical: 20
    },
    innerContainer: {
        flexDirection: 'row'
    },
    rowContainer: {
        flex: 1,
        flexDirection: 'row'
    },
    leftContainer: {
        flex: 1,
        justifyContent: 'center',
        padding: 10
    },
    rightContainer: {
        flex: 2,
        justifyContent: 'center',
        padding: 10
    },
    title: {
        fontSize: 14,
        fontWeight: 'bold',
        textAlign: 'left',
        paddingBottom: 5
    },
    title1: {
        fontSize: 14,
        textAlign: 'left',
        paddingBottom: 5,
        paddingLeft: 20
    },
    productTitleText: {
        fontSize: 14,
        color: 'white',
        fontWeight: 'bold'
    },
    trashIcon: {
        position: 'absolute',
        right: 0,
        zIndex: 1,
        marginRight: 20,
        marginTop: 15
    },
    textInputStyle: {
        textAlign: 'center',
        marginLeft: 20,
        borderWidth: 1,
        width: 40,
        borderRadius: 10
    }
}
