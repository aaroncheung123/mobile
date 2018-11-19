import React from 'react';
import {StyleSheet, Text, View , Image, TouchableOpacity, Animated, TextInput} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import TextInputSection from '../../../../components/text-input-section.js';
import { Button } from 'react-native-elements'

export default class PaymentCard extends React.Component {

    constructor(props){
      super(props);
      this.state = {
        title       : props.title,
        expanded    : false
        };
    }
    componentDidMount(){
		console.log(this.props.paymentMethod);
        this.setState({
            minHeight   : 200,
            animation   : new Animated.Value(200)
        });
    }

    _setMaxHeight(event){
        this.setState({
            maxHeight   : event.nativeEvent.layout.height + 15
        });
    }

    _setMinHeight(event){
        this.setState({
            minHeight   : 200
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
                    <Icon name='credit-card' size= {35}/>
                </View>



                <Animated.View style={[STYLES.outsideContainer,{height: this.state.animation}]}>
                    <View style={STYLES.cardContainer}  onLayout={this._setMinHeight.bind(this)}>
                        <View style={STYLES.bodyTextContainer}>
                            <Text style={STYLES.textHeader}>{this.props.paymentMethod.description} - {this.props.paymentMethod.last_four}</Text>
                            <Text style={STYLES.textBody}>{this.props.paymentMethod.name}</Text>
                            <Text style={STYLES.textBody}>{this.props.paymentMethod.address.formatted}</Text>
                            <Text style={STYLES.textBody}>Card Ending In: {this.props.paymentMethod.last_four}</Text>
                        </View>



                        <TouchableOpacity
                            style={STYLES.editIconContainer}
                            onPress={this.toggle.bind(this)}
                            underlayColor="transparent">
                            <Icon name='edit' size= {25}/>
                        </TouchableOpacity>
                    </View>

                    <View style={STYLES.hiddenBody} onLayout={this._setMaxHeight.bind(this)}>
                        <TextInputSection
                            title='Edit Card Name'
                            value='Amazon - 4616'
                            onChangeText = {(value) => this.handleTextChange('description',value)}/>

                        <View style={STYLES.buttonsContainer}>
                            <TouchableOpacity
                                style={STYLES.buttonContainer}
                                onPress={this.handleShippingAddressSubmit}
                                underlayColor="transparent">
                                <Text style={STYLES.buttonText}>Save</Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                style={STYLES.buttonContainer}
                                onPress={this.handleShippingAddressDelete}
                                underlayColor="transparent">
                                <Text style={STYLES.buttonText}>Delete</Text>
                            </TouchableOpacity>
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
        backgroundColor:'white',
        borderWidth: 2,
        borderColor: 'orange',
        borderRadius: 50,
        padding: 10,
        marginTop: 35,
        marginLeft: 20
    },
    outsideContainer: {
        flexDirection: 'column',
        flex: 1,
        backgroundColor: 'transparent',
        overflow: 'hidden'
    },
    cardContainer: {
        height: 200,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'flex-start',
        backgroundColor: '#D9D9D9',
        opacity: .9,
        marginLeft: 25,
        borderRadius: 5,
        marginBottom: 10
    },
    textHeader: {
        fontSize: 20,
        fontWeight: 'bold',
        borderBottomWidth: 1,
        marginBottom: 20,
        paddingBottom: 20
    },
    textBody: {
        fontSize: 14
    },
    bodyTextContainer: {
        marginVertical: 20,
        marginLeft: 55,
        flex: 4
    },
    editIconContainer: {
        marginTop: 10,
        justifyContent:'center',
        alignItems: 'center',
        flex: 1
    },
    hiddenBody: {
        backgroundColor: 'white',
        borderRadius: 5,
        opacity: .9,
        marginLeft: 25,
        marginTop: 2,
        padding: 20,
        overflow:'hidden'
    },
    buttonStyle:{
        backgroundColor: 'orange',
    },
    buttonsContainer: {
        marginTop: 20
    },
    buttonContainer: {
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
    }
}
