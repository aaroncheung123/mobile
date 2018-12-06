import React from 'react';
import {View, Text, TextInput, Picker, TouchableOpacity, Switch} from 'react-native';
import AddressSelect from '../../EliteWorksLibrary/components/address/address-select';
import DatePicker from 'react-native-datepicker';
import {EliteWorksOrange, AccountContentGrey, AccountMenuGrey, Blueberry, AppleCore} from '../assets/styles/constants';

export default class AddWorkOrderForm extends React.Component {

    constructor(props)
    {
        super(props)
        this.state = {
            workOrderName: '',
            productSelect: '',
            clientSelect: '',
            emplyeeSelect: '',
            shippingAddress : undefined,
            selectedDay: new Date(),
            recurring: false,
            users: [],
            products: []
        }
        this.handleShippingAddressSubmit = this.handleShippingAddressSubmit.bind(this);
    }

    componentDidMount(){
        EliteAPI.CRM.User.search({take: 1000, include_classes: 'user', status: 'WON'}, success => {
            //console.log(success.data.users);
            this.setState({users: success.data.users});
        });

        EliteAPI.STR.Product.search({take: 1000, include_classes: 'user', status: 'WON'}, success => {
            //console.log(success.data.models[0]);
            this.setState({products: success.data.models});
        });
    }

    handleShippingAddressSubmit() {
        this.props.handleClose()
        this.addressSelect.getAddress((address) => {

            if (address === undefined) return

            this.state.shippingAddress.address_id = address.address_id;
            this.state.shippingAddress.address = address;
            this.state.shippingAddress.save((success) => {
                alert('Your information has been successfully updated');
                this.forceUpdate();
                //console.log(this.state.shippingAddress.address);
            })
        });
    }


    render() {
        let clients = this.state.users.map(user => <Picker.Item key={user.id} label={user.full_name + ' - ' + user.email} value={user}/>)
        let products = this.state.products.map(product => <Picker.Item key={product.product_id} label={product.name} value={product}/>)

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
                        {products}
               </Picker>

               <Text style = {STYLES.textStyle}>Client</Text>
               <Picker
                    selectedValue={this.state.productSelect}
                    style={STYLES.pickerStyle}
                    onValueChange={(itemValue, itemIndex) => this.setState({clientSelect: itemValue})}>
                        <Picker.Item label="-- Nothing Selected --" value="default" />
                        {clients}
               </Picker>

               <Text style={STYLES.textStyle}>Employee Role</Text>
               <Picker
                    selectedValue={this.state.productSelect}
                    style={STYLES.pickerStyle}
                    onValueChange={(itemValue, itemIndex) => this.setState({emplyeeSelect: itemValue})}>
                        <Picker.Item label="-- Nothing Selected --" value="default" />
               </Picker>

               <AddressSelect ref={e => this.addressSelect = e}/>


               <Text style = {STYLES.textStyle}>Scheduled Date</Text>
               <DatePicker
                   style={STYLES.datePickerContainer}
                   date={this.state.selectedDay}
                   showIcon={false}
                   onDateChange={(date) => {this.setState({selectedDay: new Date(date)} )}}
                   confirmBtnText="Confirm"
                   cancelBtnText="Cancel"
                   format="MM/DD/YYYY"
               />


               <TouchableOpacity
                   style={STYLES.addButton}
                   onPress={this.handleShippingAddressSubmit}>
                   <Text style={STYLES.whiteText}>Add</Text>
               </TouchableOpacity>




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
    datePickerContainer: {
        margin: 10,
    },
    addButton: {
        width: '90%',
        backgroundColor: EliteWorksOrange,
        padding: 15,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        marginVertical: 15,
        borderRadius: 5,
    },
    whiteText: {
        color: 'white',
        fontSize: 16
    }
}


// address={this.props.shippingAddress.address}
