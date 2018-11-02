import React from 'react';
import {View, Text} from 'react-native';

const ProductCard = (props) => {
    return (
        <View style={STYLES.container}>
            <View style={STYLES.leftContainer}>
                <Text style={STYLES.title}>Product Details</Text>
            </View>
            <View style={STYLES.rightContainer}>
                <Text style={STYLES.title1}>Pogo Pass San Antonio - 12 Months</Text>
            </View>

        </View>
    );
}

export default ProductCard;

const STYLES = {
    container: {
        flex: 1,
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
    }
}
