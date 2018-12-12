import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';


export default class ProductSelectRow extends React.Component {

    constructor(props)
    {
        super(props)
        this.state = {
            quantity: 1
        }
        this.handleQuantityIncrease = this.handleQuantityIncrease.bind(this);
        this.handleQuantityDecrease = this.handleQuantityDecrease.bind(this);
    }

    handleQuantityIncrease(){
        this.setState({
            quantity: this.state.quantity + 1
        });
    }

    handleQuantityDecrease(){
        this.state.quantity == 1 ? this.props.onRemoveProduct(this.props.product) : this.setState({quantity: this.state.quantity - 1})
    }

    render() {
        let productPrice = this.props.product.price != null ? this.props.product.price : 0;
        return (
            <View style={STYLES.container}>
                <Text style={STYLES.nameContainer}>{this.props.product.name}</Text>
                <Text style={STYLES.flexBox1}>{productPrice}</Text>
                <Text style={STYLES.flexBox2}>{this.state.quantity}</Text>

                <View style={STYLES.quantityControlContainer}>
                    <TouchableOpacity
                        onPress={this.handleQuantityDecrease}
                        style={STYLES.minusContainer}>
                            <Icon name='minus' size= {15} color='black'/>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={this.handleQuantityIncrease}
                        style={STYLES.addContainer}>
                            <Icon name='plus' size= {15} color='black'/>
                    </TouchableOpacity>
                </View>

            </View>
        );
    }
}

const STYLES = {
    container: {
        flexDirection: 'row'
    },
    nameContainer: {
        width: 100
    },
    flexBox2: {
        flex: 2,
        margin: 5
    },
    flexBox1: {
        flex: 1,
        margin: 5
    },
    minusContainer: {
        paddingVertical: 10,
        paddingHorizontal: 15
    },
    addContainer: {
        paddingVertical: 10,
        paddingHorizontal: 15
    },
    quantityControlContainer: {
        flexDirection: 'row',
        position: 'absolute',
        top: 0,
        right: 0
    }
}
