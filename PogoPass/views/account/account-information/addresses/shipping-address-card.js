import React from 'react';
import {StyleSheet, Text, View , Image, TouchableOpacity, Animated, TextInput} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import TextInputSection from '../../../../components/text-input-section.js';
import { Button } from 'react-native-elements'

import AddressSelect from '../../../../../EliteWorksLibrary/components/address/address-select';

export default class ShippingAddressCard extends React.Component {

    constructor(props){
      super(props);
      this.state = {
            title       : props.title,
            expanded    : false,
            shippingAddress : undefined
        };
        this.handleShippingAddressSubmit = this.handleShippingAddressSubmit.bind(this);
        this.handleTextChange = this.handleTextChange.bind(this);
        this.handleShippingAddressDelete = this.handleShippingAddressDelete.bind(this);
    }
    componentDidMount(){
        this.setState({shippingAddress: this.props.shippingAddress});
        this.setState({
            minHeight   : 90,
            animation   : new Animated.Value(90)
        });
    }

    _setMaxHeight(event){
        this.setState({
            maxHeight   : event.nativeEvent.layout.height + 10
        });
    }

    _setMinHeight(event){
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

    handleShippingAddressSubmit() {

        this.addressSelect.getAddress((address) => {

            if (address === undefined) return

            this.state.shippingAddress.address_id = address.address_id;
            this.state.shippingAddress.address = address;
            this.state.shippingAddress.save((success) => {
                alert('Your information has been successfully updated');
                this.forceUpdate();
            })
        });
    }

    handleShippingAddressDelete(){
        this.state.shippingAddress.delete((success) => {
            alert('Address has been deleted');
            this.forceUpdate();
        })
    }

    handleTextChange(property, value) {
        let shippingAddress = this.state.shippingAddress;
        shippingAddress[property] = value;
        this.setState({shippingAddress: shippingAddress});
    }

    render() {
        return (
            <View style={STYLES.container}>
                <View style={STYLES.iconContainer}>
                    <Icon name='home' size= {35}/>
                </View>



                <Animated.View style={[STYLES.outsideContainer,{height: this.state.animation}]}>
                    <View style={STYLES.cardContainer}  onLayout={this._setMinHeight.bind(this)}>
                        <View style={STYLES.bodyTextContainer}>
                            <Text style={STYLES.textHeader}>{this.props.shippingAddress.address.formatted}</Text>
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
                            title='Nickname'
                            value={this.props.shippingAddress.description}
                            onChangeText = {(value) => this.handleTextChange('description',value)}/>


                        <AddressSelect ref={e => this.addressSelect = e} address={this.props.shippingAddress.address} />

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
        borderRadius: 50,
        padding: 10,
        marginTop: 30,
        marginLeft: 20,
        borderWidth: 2,
        borderColor: 'orange'
    },
    outsideContainer: {
        flexDirection: 'column',
        flex: 1,
        backgroundColor: 'transparent',
        overflow: 'hidden'
    },
    cardContainer: {
        height: 80,
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
        fontSize: 14
    },
    bodyTextContainer: {
        marginVertical: 20,
        marginLeft: 55,
        flex: 4
    },
    editIconContainer: {
        justifyContent:'center',
        alignItems: 'center',
        flex: 1,
        padding: 10
    },
    innerEditContainer: {
        width: 100,
        height: 100
    },
    hiddenBody: {
        backgroundColor: 'white',
        borderRadius: 5,
        opacity: .9,
        marginLeft: 25,
        marginTop: 2,
        padding: 20,
        overflow:'hidden',
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

// <View style={STYLES.buttonContainer} >
//     <Button
//         raised
//         icon={{name: 'save'}}
//         title='Save'
//         buttonStyle = {STYLES.buttonStyle}
//         onPress = {this.handleShippingAddressSubmit}/>
// </View>
//
