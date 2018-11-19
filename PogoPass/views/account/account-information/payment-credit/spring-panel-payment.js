import React from 'react';
import {View, Text, TouchableOpacity, TextInput, ScrollView} from 'react-native';
import AddressSelect from '../../../../../EliteWorksLibrary/components/address/address-select';

export default class SpringPanelPayment extends React.Component {

    constructor(props) {
      super(props);
      this.state = {
          paymentMethod: new EliteAPI.Models.STR.PaymentMethod()
      }
      this.handleSave = this.handleSave.bind(this);
    }
    
    handleSave(){
        console.log('save');
        this.addressSelect.getAddress(address => {

            if (!address) return;

            this.state.paymentMethod.address = address;
            this.state.paymentMethod.address_id = address.address_id;

            this.state.paymentMethod.save((success) => {
                alert('Your payment method has successfully been added');
                this.forceUpdate();
            },(failure) => {
                console.log(failure);
            })
        });
    }

    handleChange(property, value){
        this.state.paymentMethod[property] = value
        this.forceUpdate();
    }


    render() {
        return (
            <ScrollView style={STYLES.container}>
                <View style={STYLES.filler}>

                    <BasicInput
                        label="Description"
                        placeHolder="Chase, Amazon Rewards, etc..."
                        onChangeText={(value) => this.handleChange('description', value)}/>
                    <BasicInput
                        label="Name on Card"
                        placeHolder="John Doe"
                        onChangeText={(value) => this.handleChange('name', value)}/>
                    <BasicInput
                        label="Card Number"
                        placeHolder="xxxx-xxxx-xxxx-xxxx"
                        onChangeText={(value) => this.handleChange('card', value)}/>
                    <BasicInput
                        label="CVV Number"
                        placeHolder="xxx"
                        onChangeText={(value) => this.handleChange('cvv2', value)}/>
                    <BasicInput
                        label="Expiration"
                        placeHolder="xx-xx"
                        onChangeText={(value) => this.handleChange('expiration', value)}/>

                    <AddressSelect ref={e => this.addressSelect = e}/>
                    <TouchableOpacity
                        style={STYLES.saveContainer}
                        onPress={this.handleSave}>
                            <Text>Save</Text>
                    </TouchableOpacity>
                </View>

            </ScrollView>
        );
    }
}

const BasicInput = (props) => {
    return (
        <View>
            <Text style={STYLES.label}>{props.label}</Text>
            <TextInput
              style={STYLES.input}
              placeholder={props.placeHolder}
              underlineColorAndroid="transparent"
              onChangeText={props.onChangeText}
              value={props.value}
            />
        </View>
    );
}


const STYLES = {
    container: {
        width: 250,
        marginHorizontal: 30
    },
    saveContainer: {
        backgroundColor: 'orange',
        padding: 10,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 20
    },
    input:{
        borderWidth: 1,
        borderRadius: 5,
        padding: 5,
        marginLeft: 5
    },
    filler: {
        marginBottom: 100
    },
    label: {
      fontSize: 16,
      paddingTop: 10,
    },
}


//onChangeText={(text) => this.setState({description: text})}
