import React from 'react';
import {StyleSheet, Text, View , Image, TouchableHighlight, Animated, TextInput} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import TextInputSection from '../text-input-section.js';
import { Button } from 'react-native-elements'

export default class OrderCard extends React.Component {

    constructor(props){
      super(props);
      this.state = {
        title       : props.title,
        expanded    : true,
        animation   : new Animated.Value(),
        };
    }
    componentDidMount(){
    }

    _setMaxHeight(event){
        this.setState({
            maxHeight   : event.nativeEvent.layout.height
        });
    }

    _setMinHeight(event){
        this.setState({
            minHeight   : event.nativeEvent.layout.height
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



    render() {
        return (
            <View style={STYLES.container}>
                <View style={STYLES.iconContainer}>
                    <Icon name='hashtag' size= {35}/>
                </View>



                <Animated.View style={[STYLES.outsideContainer,{height: this.state.animation}]}>
                    <View style={STYLES.cardContainer}  onLayout={this._setMinHeight.bind(this)}>
                        <View style={STYLES.bodyTextContainer}>
                            <TouchableHighlight
                                style={STYLES.button}
                                onPress={this.toggle.bind(this)}
                                underlayColor="#f1f1f1">
                                <Text style={STYLES.textHeader}>c6f134347 - $42.68</Text>
                            </TouchableHighlight>
                        </View>
                    </View>

                    <View style={STYLES.hiddenBody} onLayout={this._setMaxHeight.bind(this)}>
                        <Text>Order # c6f12e6935</Text>
                        <Text>Placed At: 03/06/2018 12:10 PM</Text>
                        <Button
                         raised
                         icon={{name: 'print'}}
                         title='Resend Order Receipt'
                           buttonStyle = {STYLES.buttonStyle}
                           onPress = {this.handleResendSubmit}
                       />
                        <Text>Products</Text>
                        <View style={STYLES.productSectionContainer}>
                            <View style={STYLES.productSectionRow}>
                                <View style={STYLES.productSectionLeft}>
                                    <Text>Name</Text>
                                </View>
                                <View style={STYLES.productSectionRight}>
                                    <Text>Charged</Text>
                                </View>
                            </View>

                            <View style={STYLES.productSectionRow}>
                                <View style={STYLES.productSectionLeft}>
                                    <Text>Pogo Pass Phoenix - 12 Months</Text>
                                </View>
                                <View style={STYLES.productSectionRight}>
                                    <Text>$124.95</Text>
                                </View>
                            </View>

                            <View style={STYLES.productSectionRow}>
                                <View style={STYLES.productSectionLeft}>
                                    <Text>Sub Total</Text>
                                </View>
                                <View style={STYLES.productSectionRight}>
                                    <Text>$124.95</Text>
                                </View>
                            </View>


                            <View style={STYLES.productSectionRow}>
                                <View style={STYLES.productSectionLeft}>
                                    <Text>Totals</Text>
                                </View>
                            </View>

                            <View style={STYLES.productSectionRow}>
                                <View style={STYLES.productSectionLeft}>
                                    <Text>Sub Total</Text>
                                </View>
                                <View style={STYLES.productSectionRight}>
                                    <Text>$124.95</Text>
                                </View>
                            </View>

                            <View style={STYLES.productSectionRow}>
                                <View style={STYLES.productSectionLeft}>
                                    <Text>Discount</Text>
                                </View>
                                <View style={STYLES.productSectionRight}>
                                    <Text>$124.95</Text>
                                </View>
                            </View>

                            <View style={STYLES.productSectionRow}>
                                <View style={STYLES.productSectionLeft}>
                                    <Text>Total Charged</Text>
                                </View>
                                <View style={STYLES.productSectionRight}>
                                    <Text>$0.00</Text>
                                </View>
                            </View>

                        </View>



                    </View>

                </Animated.View>

            </View>

        );
    }
}

const STYLES = {
    container: {
        flex: 1,
        flexDirection: 'row',
        paddingHorizontal: 20,
        paddingTop: 25,
    },
    iconContainer:{
        position: 'absolute',
        zIndex: 1,
        backgroundColor:'orange',
        borderRadius: 50,
        padding: 10,
        marginTop: 40,
        marginLeft: 20
    },
    outsideContainer: {
        flexDirection: 'column',
        flex: 1,
        backgroundColor: 'transparent'
    },
    cardContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'flex-start',
        backgroundColor: '#D9D9D9',
        opacity: .9,
        marginLeft: 25,
        borderRadius: 5
    },
    textHeader: {
        fontSize: 20,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10
    },
    bodyTextContainer: {
        marginVertical: 20,
        justifyContent: 'center',
        alignItems: 'center'
    },
    hiddenBody: {
        backgroundColor: 'white',
        borderRadius: 5,
        opacity: .9,
        marginLeft: 25,
        marginTop: 2,
        padding: 20
    },
    buttonStyle:{
        backgroundColor: 'orange'
    },
    productSectionContainer: {
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
    }
}
