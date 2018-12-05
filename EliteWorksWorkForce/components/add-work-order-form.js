import React from 'react';
import {View, Text, TextInput, Picker} from 'react-native';
import AddressSelect from '../../EliteWorksLibrary/components/address/address-select';

export default class AddWorkOrderForm extends React.Component {

    constructor(props)
    {
        super(props)
        this.state = {
            workOrderName: '',
            productSelect: '',
            clientSelect: '',
            emplyeeSelect: '',
            shippingAddress : undefined
        }
        this.handleShippingAddressSubmit = this.handleShippingAddressSubmit.bind(this);
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

    render() {
        return (
            <View style={STYLES.container}>
                <Text style = {STYLES.textStyle}>Worder Order Name</Text>
                <TextInput style = {STYLES.textInputContainer}
                   underlineColorAndroid = "transparent"
                   onChangeText = {(text) => this.setState({workOrderName: text})}
                   value={this.state.workOrderName}/>

               <Text style = {STYLES.textStyle}>Products</Text>
               <Picker
                    selectedValue={this.state.productSelect}
                    style={STYLES.pickerStyle}
                    onValueChange={(itemValue, itemIndex) => this.setState({productSelect: itemValue})}>
                        <Picker.Item label="-- Add product(s) --" value="default" />
               </Picker>

               <Text style = {STYLES.textStyle}>Client</Text>
               <Picker
                    selectedValue={this.state.productSelect}
                    style={STYLES.pickerStyle}
                    onValueChange={(itemValue, itemIndex) => this.setState({clientSelect: itemValue})}>
                        <Picker.Item label="-- Nothing Selected --" value="default" />
               </Picker>

               <Text style = {STYLES.textStyle}>Employee Role</Text>
               <Picker
                    selectedValue={this.state.productSelect}
                    style={STYLES.pickerStyle}
                    onValueChange={(itemValue, itemIndex) => this.setState({emplyeeSelect: itemValue})}>
                        <Picker.Item label="-- Nothing Selected --" value="default" />
               </Picker>

               <AddressSelect ref={e => this.addressSelect = e}/>


            </View>
        );
    }
}

const STYLES = {
    container: {
        margin: 10
    },
    textInputContainer: {
        height: 35,
        width: 300,
        borderWidth: 1,
        borderRadius: 5,
        paddingHorizontal: 20,
        marginVertical: 5
    },
    textStyle: {
        fontSize: 16
    },
    pickerStyle: {
        margin: 10
    },
}


// address={this.props.shippingAddress.address}
