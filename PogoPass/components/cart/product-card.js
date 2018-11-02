import React from 'react';
import {View, Text} from 'react-native';

const ProductCard = (props) => {
    return (
        <View style={STYLES.container}>
            <View style={STYLES.innerContainer}>
                <View style={STYLES.rowContainer}>
                    <View style={STYLES.leftContainer}>
                        <Text style={STYLES.title}>Product</Text>
                    </View>
                    <View style={STYLES.rightContainer}>
                        <Text style={STYLES.title1}>Pogo Pass San Antonio - 12 Months</Text>
                    </View>
                </View>


                <View style={STYLES.rowContainer}>
                    <View style={STYLES.leftContainer}>
                        <Text style={STYLES.title}>Price</Text>
                    </View>
                    <View style={STYLES.rightContainer}>
                        <Text style={STYLES.title1}>$99.95/1 year</Text>
                    </View>
                </View>


                <View style={STYLES.rowContainer}>
                    <View style={STYLES.leftContainer}>
                        <Text style={STYLES.title}>Quantity</Text>
                    </View>
                    <View style={STYLES.rightContainer}>
                        <Text style={STYLES.title1}>1</Text>
                    </View>
                </View>


                <View style={STYLES.rowContainer}>
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

export default ProductCard;

const STYLES = {
    container: {
        flex: 1,
        margin: 10,
        padding: 10,
        borderTopWidth: 20,
        borderColor: 'orange',
        borderRadius: 10
    },
    innerContainer: {
        borderLeftWidth: 2,
        borderRightWidth: 2,
        borderBottomWidth: 2,
    },
    rowContainer: {
        flex: 1,
        flexDirection: 'row'
    },
    leftContainer: {
        flex: 1,
        justifyContent: 'center',
        borderColor: '#bfbfbf',
        padding: 10
    },
    rightContainer: {
        flex: 3,
        justifyContent: 'center',
        //borderLeftWidth: 2,
        //borderColor: '#bfbfbf',
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
    }
}
