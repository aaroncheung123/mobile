import React from 'react';
import {StyleSheet, Text, View , Image, TouchableHighlight, Animated, TextInput} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import TextInputSection from '../../../../components/text-input-section.js';
import { Button } from 'react-native-elements'

export default class OrderCard extends React.Component {

    constructor(props){
        super(props);

        this.icons = {
            'up'    : require('../../../../assets/images/icons/up_arrow.png'),
            'down'  : require('../../../../assets/images/icons/down_arrow.png')
        };

        this.state = {
            title       : props.title,
            expanded    : false
        };
        this.handleResendSubmit = this.handleResendSubmit.bind(this)
    }

    componentDidMount(){
        this.setState({
            minHeight   : 90,
            animation   : new Animated.Value(90)
        });
        //console.log('name: ', this.props.order);
    }

    handleMaxHeight(event){
        this.setState({
            maxHeight   : 570
        });
    }

    handleMinHeight(event){
        this.setState({
            minHeight   : 90
        });
    }

    toggle(){
        let initialValue= this.state.expanded? this.state.maxHeight + this.state.minHeight : this.state.minHeight,
            finalValue= this.state.expanded? this.state.minHeight : this.state.maxHeight + this.state.minHeight;

        this.setState({
            expanded : !this.state.expanded
        });

        this.state.animation.setValue(initialValue);
        Animated.spring(
            this.state.animation,
            {
                toValue: finalValue
            }
        ).start();
    }

    handleResendSubmit(){
        EliteAPI.STR.Order.sendConfirmation({order_id: this.props.order.order_id}, (success) => {
        }, (failure) => {
        })
    }



    render() {
        let icon = this.icons['down'];

        if(this.state.expanded){
            icon = this.icons['up'];
        }
        let productsSectionList = this.props.order.order_products.map(orderProduct => <ProductsSection
            key={orderProduct.order_product_id}
            left={orderProduct.name}
            right={GlobalUtil.convertToMoney(orderProduct.price_charged)}/>
        )
        let placedAt = GlobalUtil.convertMysqlToDate(this.props.order.created_at).formatDate('n/d/y h:m A');
        return (
            <View style={STYLES.container}>
                <View style={STYLES.iconContainer}>
                    <Icon name='tasks' size= {35}/>
                </View>


                <Animated.View style={[STYLES.outsideContainer,{height: this.state.animation}]}>


                    <TouchableHighlight
                        onPress={this.toggle.bind(this)}
                        underlayColor="transparent">
                        <View style={STYLES.cardContainer}  onLayout={this.handleMinHeight.bind(this)}>
                            <View style={STYLES.bodyTextContainer}>
                                <Text style={STYLES.textHeader}>Order #: {this.props.order.order_key}</Text>
                            </View>
                            <Image
                              style={STYLES.buttonImage}
                              source={icon}>
                            </Image>
                        </View>
                    </TouchableHighlight>


                    <View style={STYLES.hiddenBody} onLayout={this.handleMaxHeight.bind(this)}>
                        <Text>Placed At: {placedAt}</Text>
                        <Text>Order # {this.props.order.order_key}</Text>

                        <View style={STYLES.buttonContainer}>
                            <Button
                             raised
                             icon={{name: 'print'}}
                             title='Resend Order Receipt'
                               buttonStyle = {STYLES.buttonStyle}
                               onPress = {this.handleResendSubmit}
                           />
                        </View>
                        <Text>Products</Text>
                        <View style={STYLES.productSectionContainer}>
                            <ProductSectionHeader left='Name' right='Charged'/>
                            {productsSectionList}
                            <ProductsSection left='Sub Total' right={GlobalUtil.convertToMoney(this.props.order.price_sub_total)}/>
                            <ProductSectionHeader left='Totals'/>
                            <ProductsSection left='Sub Total' right={GlobalUtil.convertToMoney(this.props.order.price_sub_total)}/>
                            <ProductsSection left='Tax' right={GlobalUtil.convertToMoney(this.props.order.price_tax)}/>
                            <ProductsSection left='Total Charged' right={GlobalUtil.convertToMoney(this.props.order.price_total_charged)}/>
                        </View>
                    </View>
                </Animated.View>
            </View>

        );
    }
}

const ProductsSection = (props) => {
    return (
        <View style={STYLES.productSectionRow}>
            <View style={STYLES.productSectionLeft}>
                <Text>{props.left}</Text>
            </View>
            <View style={STYLES.productSectionRight}>
                <Text style={STYLES.shiftRightText}>{props.right}</Text>
            </View>
        </View>
    );
}
const ProductSectionHeader = (props) => {
    return (
        <View style={STYLES.productSectionRowHeader}>
            <View style={STYLES.productSectionLeft}>
                <Text>{props.left}</Text>
            </View>
            <View style={STYLES.productSectionRight}>
                <Text style={STYLES.shiftRightText}>{props.right}</Text>
            </View>
        </View>
    );
}



const STYLES = {
    container: {
        flexDirection: 'row',
        paddingHorizontal: 20,
        paddingTop: 25,
    },
    iconContainer:{
        position: 'absolute',
        zIndex: 1,
        backgroundColor:'white',
        borderWidth: 2,
        borderColor: 'orange',
        borderRadius: 50,
        padding: 10,
        marginTop: 40,
        marginLeft: 20
    },
    outsideContainer: {
        flexDirection: 'column',
        flex: 1,
        backgroundColor: 'transparent',
        overflow: 'hidden'
    },
    cardContainer: {
        height: 90,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#D9D9D9',
        opacity: .9,
        marginLeft: 25,
        borderRadius: 5,
        marginBottom: 10
    },
    textHeader: {
        fontSize: 20
    },
    bodyTextContainer: {
        marginVertical: 30,
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        marginLeft: 50
    },
    hiddenBody: {
        backgroundColor: 'white',
        opacity: .9,
        marginLeft: 25,
        marginTop: 2,
        padding: 20,
        borderRadius: 5
    },
    buttonStyle:{
        backgroundColor: 'orange'
    },
    productSectionContainer: {
        marginBottom: 30
    },
    productSectionLeft: {
        flex: 3
    },
    productSectionRight: {
        flex: 1
    },
    productSectionRow: {
        flexDirection: 'row',
        margin: 5
    },
    productSectionRowHeader: {
        flexDirection: 'row',
        margin: 5,
        borderBottomWidth: 1,
        borderTopWidth: 1,
        paddingVertical: 15,
        marginVertical: 15
    },
    buttonContainer:{
        marginVertical: 30
    },
    buttonImage : {
        width: 12,
        height: 8,
        opacity: .3,
        marginRight: 30,
        justifyContent: 'center',
        alignItems: 'center'
    },
    shiftRightText: {
        textAlign: 'right'
    }
}
