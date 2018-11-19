import React from 'react';
import {StyleSheet, Text, View , Image, TouchableHighlight,TouchableOpacity, Animated, TextInput, Picker} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import TextInputSection from '../../../../components/text-input-section.js';
import { Button } from 'react-native-elements'

export default class SubscriptionCard extends React.Component {

    constructor(props){
      super(props);
      this.state = {
        title       : props.title,
        expanded    : false,
        storeCredit : 1,
        paymentMethods : []
        };
    }
    componentDidMount(){
        this.setState({
            minHeight   : 150,
            animation   : new Animated.Value(150)
        });

        Service.User.get(user => {
            EliteAPI.STR.PaymentMethod.search({
                user_id: user.id,
                include_classes: 'address'
            },
            success => {
                //console.log(success.data.models[0]);
                this.setState({paymentMethods: success.data.models});
            },
            failure => {
                console.log(failure.error_message);
            })
        })
    }

    _setMaxHeight(event){
        this.setState({
            maxHeight   : event.nativeEvent.layout.height + 5
        });
    }

    _setMinHeight(event){
        this.setState({
            minHeight   : 150
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

            let paymentMethods = this.state.paymentMethods.map(paymentMethod =>
                <Picker.Item
                    key={paymentMethod.payment_method_id}
                    label={`${paymentMethod.description} - ${paymentMethod.last_four}`}
                    value='0' />
            );

            let renewalRows = this.props.subscription.subscription_renewals.map(renewal =>
                <DisplayRenewal
                    key={renewal.subscription_renewal_id}
                    date={renewal.created_at}
                    order={renewal.created_at}
                    charged={renewal.created_at}/>)

            return (
                <View style={STYLES.container}>
                    <View style={STYLES.iconContainer}>
                        <Icon name='vcard-o' size= {35}/>
                    </View>

                    <Animated.View style={[STYLES.outsideContainer,{height: this.state.animation}]}>

                        <View style={STYLES.cardContainer}  onLayout={this._setMinHeight.bind(this)}>
                            <View style={STYLES.bodyTextContainer}>
                                <Text style={STYLES.textHeader}>{this.props.subscription.account.description}</Text>
                                <Text style={STYLES.textHeaderSubtitle}>{this.props.subscription.account.full_name}</Text>
                                <Text style={STYLES.textHeaderSubtitle}>STATUS: {this.props.subscription.status}</Text>


                            </View>

                            <View style={STYLES.editIconContainer}>
                                <TouchableHighlight
                                    style={STYLES.button}
                                    onPress={this.toggle.bind(this)}
                                    underlayColor="transparent">
                                    <Icon name='edit' size= {25}/>

                                </TouchableHighlight>
                            </View>
                        </View>


                        <View style={STYLES.hiddenBody} onLayout={this._setMaxHeight.bind(this)}>

                            <View style={STYLES.productSectionContainer}>

                                <DisplaySection
                                    title='Subscription #:'
                                    description={`${this.props.subscription.subscription_id} - ${this.props.subscription.account.description}`}/>

                                <DisplaySection
                                    title='Status:'
                                    description={this.props.subscription.status}/>


                                <View style={STYLES.productSectionRow}>
                                    <View style={STYLES.productSectionLeft1}>
                                        <Text>Payment Method:</Text>
                                    </View>
                                    <View style={STYLES.productSectionRight1}>
                                        <Picker
                                          selectedValue={this.state.paymentMethod}
                                          style={STYLES.pickerStyle}
                                          onValueChange={(itemValue, itemIndex) => this.setState({paymentMethod: itemValue})}>
                                          {paymentMethods}
                                        </Picker>
                                    </View>
                                </View>


                                <DisplaySection
                                    title='Address'
                                    description={this.props.subscription.shipping_address.address.formatted}/>


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


                                <DisplaySection
                                    title='Account #:'
                                    description={this.props.subscription.account.account_key}/>

                                <DisplaySection
                                    title='Name:'
                                    description={this.props.subscription.account.full_name}/>


                            </View>

                            <View style={STYLES.buttonsContainer}>
                                <TouchableOpacity
                                    style={STYLES.buttonContainer}
                                    onPress={this.handleDelete}
                                    underlayColor="transparent">
                                    <Text style={STYLES.buttonText}>Save</Text>
                                </TouchableOpacity>

                                <TouchableOpacity
                                    style={STYLES.buttonContainer}
                                    onPress={this.handleDelete}
                                    underlayColor="transparent">
                                    <Text style={STYLES.buttonText}>Cancel</Text>
                                </TouchableOpacity>
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
                                {renewalRows}
                            </View>



                        </View>
                    </Animated.View>
                </View>

            );
        }
    }

const DisplaySection = (props) => {
    return (
        <View style={STYLES.productSectionRow}>
            <View style={STYLES.productSectionLeft1}>
                <Text>{props.title}</Text>
            </View>
            <View style={STYLES.productSectionRight1}>
                <Text>{props.description}</Text>
            </View>
        </View>
    );
}

const DisplayRenewal = (props) => {
    return (
        <View style={STYLES.productSectionRow}>
            <View style={STYLES.productSectionLeft}>
                <Text>{props.date}</Text>
            </View>
            <View style={STYLES.productSectionRight}>
                <Text>{props.order}</Text>
            </View>
            <View style={STYLES.productSectionRight}>
                <Text>{props.charged}</Text>
            </View>
        </View>
    );
}



    const STYLES = {
        container: {
            flex: 1,
            flexDirection: 'row',
            paddingHorizontal: 20,
            paddingTop: 25,
            marginBottom: 10
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
            height: 150,
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'flex-start',
            backgroundColor: '#D9D9D9',
            opacity: .9,
            marginLeft: 25,
            borderRadius: 5
        },
        textHeader: {
            fontSize: 18,
            borderBottomWidth:1,
            marginBottom: 10,
            paddingBottom: 10
        },
        textHeaderSubtitle: {
            fontSize: 14
        },
        bodyTextContainer: {
            marginVertical: 20,
            justifyContent: 'flex-start',
            alignItems: 'flex-start',
            flex: 6,
            marginLeft: 55
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
        buttonsContainer:{
            marginVertical: 20
        },
        buttonContainer:{
            marginTop: 5,
            width: 200,
            alignSelf: 'center',
            justifyContent: 'center',
            backgroundColor: 'orange',
            borderRadius: 10,
            padding: 10,
        },
        buttonText: {
            textAlign: 'center'
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


    // <TouchableOpacity
    //     style={STYLES.buttonContainer}
    //     onPress={this.handleDelete}
    //     underlayColor="transparent">
    //     <Text style={STYLES.buttonText}>Renew - $34.98</Text>
    // </TouchableOpacity>


    // <Picker.Item label="None" value='0' />
    // <Picker.Item label="Visa - 3442" value='1' />
    // <Picker.Item label="Discover - 6213" value='2' />
