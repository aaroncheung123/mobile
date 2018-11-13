import React from 'react';
import {StyleSheet, Text, View , Image, TouchableHighlight, Animated, TextInput, Picker} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import TextInputSection from '../text-input-section.js';
import { Button } from 'react-native-elements'

export default class SubscriptionCard extends React.Component {

    constructor(props){
      super(props);
      this.state = {
        title       : props.title,
        expanded    : false,
        storeCredit : 1,
        paymentMethod : undefined
        };
    }
    componentDidMount(){
        this.setState({
            minHeight   : 220,
            animation   : new Animated.Value(220)
        });
    }

    _setMaxHeight(event){
        this.setState({
            maxHeight   : event.nativeEvent.layout.height + 5
        });
    }

    _setMinHeight(event){
        this.setState({
            minHeight   : 220
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
                        <Icon name='vcard-o' size= {35}/>
                    </View>



                    <Animated.View style={[STYLES.outsideContainer,{height: this.state.animation}]}>

                        <View style={STYLES.cardContainer}  onLayout={this._setMinHeight.bind(this)}>
                            <View style={STYLES.bodyTextContainer}>
                                <Text style={STYLES.textHeader}>Kyle Paulson</Text>
                                <Text style={STYLES.textHeaderSubtitle}>Pogo Pass Austin</Text>
                                <Text style={STYLES.textHeaderSubtitle}>Status: CANCELLED</Text>

                                <View style={STYLES.buttonContainer1}>
                                    <Button
                                     raised
                                     icon={{name: 'refresh'}}
                                     title='Renew - $34.98'
                                       buttonStyle = {STYLES.buttonStyle}
                                       onPress = {this.handleResendSubmit}
                                   />
                                </View>
                            </View>

                            <View style={STYLES.editIconContainer}>
                                <TouchableHighlight
                                    style={STYLES.button}
                                    onPress={this.toggle.bind(this)}
                                    underlayColor="transparent">
                                    <Icon name='edit' size= {35}/>

                                </TouchableHighlight>
                            </View>
                        </View>


                        <View style={STYLES.hiddenBody} onLayout={this._setMaxHeight.bind(this)}>


                            <View style={STYLES.productSectionContainer}>
                                <View style={STYLES.productSectionRow}>
                                    <View style={STYLES.productSectionLeft1}>
                                        <Text>Subscription #:</Text>
                                    </View>
                                    <View style={STYLES.productSectionRight1}>
                                        <Text>175956 - Pogo Pass Phoenix - 12 Months Renewal</Text>
                                    </View>
                                </View>

                                <View style={STYLES.productSectionRow}>
                                    <View style={STYLES.productSectionLeft1}>
                                        <Text>Status:</Text>
                                    </View>
                                    <View style={STYLES.productSectionRight1}>
                                        <Text>CANCELLED</Text>
                                    </View>
                                </View>

                                <View style={STYLES.productSectionRow}>
                                    <View style={STYLES.productSectionLeft1}>
                                        <Text>Payment Method:</Text>
                                    </View>
                                    <View style={STYLES.productSectionRight1}>
                                        <Picker
                                          selectedValue={this.state.paymentMethod}
                                          style={STYLES.pickerStyle}
                                          onValueChange={(itemValue, itemIndex) => this.setState({paymentMethod: itemValue})}>
                                          <Picker.Item label="None" value='0' />
                                          <Picker.Item label="Visa - 3442" value='1' />
                                          <Picker.Item label="Discover - 6213" value='2' />
                                        </Picker>
                                    </View>
                                </View>

                                <View style={STYLES.productSectionRow}>
                                    <View style={STYLES.productSectionLeft1}>
                                        <Text>Address:</Text>
                                    </View>
                                    <View style={STYLES.productSectionRight1}>
                                        <Text>Home - 213 W Ridge Rd, Saratoga Springs, UT 84045 </Text>
                                    </View>
                                </View>


                                <View style={STYLES.productSectionRow}>
                                    <View style={STYLES.productSectionLeft1}>
                                        <Text>Use Store Credit:</Text>
                                    </View>
                                    <View style={STYLES.productSectionRight1}>
                                        <Picker
                                          selectedValue={this.state.storeCredit}
                                          style={STYLES.pickerStyle}
                                          onValueChange={(itemValue, itemIndex) => this.setState({storeCredit: itemValue})}>
                                          <Picker.Item label="On" value='0' />
                                          <Picker.Item label="Off" value='1' />
                                        </Picker>
                                    </View>
                                </View>

                                <View style={STYLES.productSectionRow}>
                                    <View style={STYLES.productSectionLeft1}>
                                        <Text>Account #:</Text>
                                    </View>
                                    <View style={STYLES.productSectionRight1}>
                                        <Text>A0d29d037d</Text>
                                    </View>
                                </View>

                                <View style={STYLES.productSectionRow}>
                                    <View style={STYLES.productSectionLeft1}>
                                        <Text>Name:</Text>
                                    </View>
                                    <View style={STYLES.productSectionRight1}>
                                        <Text>Kyle Paulson</Text>
                                    </View>
                                </View>

                            </View>

                            <View style={STYLES.buttonContainer}>
                                <Button
                                 raised
                                 icon={{name: 'save'}}
                                 title='Save'
                                   buttonStyle = {STYLES.buttonStyle}
                                   onPress = {this.handleResendSubmit}
                               />
                            </View>




                       <Text>Renewals</Text>
                            <View style={STYLES.productSectionContainer}>
                                <View style={STYLES.productSectionRowHeader}>
                                    <View style={STYLES.productSectionLeft}>
                                        <Text>Date</Text>
                                    </View>
                                    <View style={STYLES.productSectionCenter}>
                                        <Text>Order #</Text>
                                    </View>
                                    <View style={STYLES.productSectionRight}>
                                        <Text>Charged</Text>
                                    </View>
                                </View>

                                <View style={STYLES.productSectionRow}>
                                    <View style={STYLES.productSectionLeft}>
                                        <Text>03/02/2018 1:48 PM</Text>
                                    </View>
                                    <View style={STYLES.productSectionRight}>
                                        <Text>d29d037d6f</Text>
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
            marginBottom: 30
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
            height: 220,
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'flex-start',
            backgroundColor: '#D9D9D9',
            opacity: .9,
            marginLeft: 25,
            borderRadius: 5
        },
        textHeader: {
            fontSize: 22,
            borderBottomWidth:1,
            marginBottom: 10,
            paddingBottom: 10
        },
        textHeaderSubtitle: {
            fontSize: 14
        },
        bodyTextContainer: {
            marginVertical: 30,
            justifyContent: 'center',
            alignItems: 'center',
            flex: 6,
            marginLeft: 20
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
            flex:  1,
            padding: 5
        },
        productSectionRight: {
            flex: 1,
            padding: 5
        },
        productSectionCenter: {
            flex: 1,
            padding: 5
        },
        productSectionLeft1:{
            flex: 2
        },
        productSectionRight1:{
            flex: 3
        },
        productSectionRow: {
            flexDirection: 'row',
            marginVertical: 10,
            marginHorizontal: 5
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
            marginVertical: 30,
            width: 125,
            alignSelf: 'center'
        },
        buttonContainer1:{
            marginTop: 30,
            alignSelf: 'center'
        },
        contentText: {
            marginBottom: 10
        },
        pickerStyle: {
        },
        editIconContainer: {
            marginTop: 10,
            justifyContent:'center',
            alignItems: 'center',
            flex: 1
        }
    }
