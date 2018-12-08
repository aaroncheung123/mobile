import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';


export default class ProductSelectRow extends React.Component {

    constructor(props)
    {
        super(props)
        this.state = {
        }
    }

    render() {
        return (
            <View style={STYLES.container}>
                <Text style={STYLES.flexBox2}>{this.props.product.name}</Text>
                <Text style={STYLES.flexBox1}>{this.props.product.price}</Text>
                <Text style={STYLES.flexBox1}>{this.props.product.price}</Text>
                <TouchableOpacity style={STYLES.addContainer}>
                    <Icon name='plus' size= {15} color='black'/>
                </TouchableOpacity>
            </View>
        );
    }
}

const STYLES = {
    container: {
        flexDirection: 'row'
    },
    flexBox1: {
        flex: 1,
        alignSelf: 'center'
    },
    flexBox2: {
        flex: 2
    },
    addContainer: {
        position: 'absolute',
        top: 0,
        right: 0,
        padding: 12
    }
}
