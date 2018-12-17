import React from 'react';
import {View, Text, TextInput, Picker, TouchableOpacity, Switch} from 'react-native';
import AddressSelect from '../../EliteWorksLibrary/components/address/address-select';
import DatePicker from 'react-native-datepicker';
import {EliteWorksOrange, AccountContentGrey, AccountMenuGrey, Blueberry, AppleCore} from '../assets/styles/constants';
import SearchableDropdown from 'react-native-searchable-dropdown';
import ProductSelectRow from './product-select-row';

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
            products: [],
            searchText: '',
            selectedProducts: []
        }
        this.handleShippingAddressSubmit = this.handleShippingAddressSubmit.bind(this);
        this.handleDropdownOnChangeText = this.handleDropdownOnChangeText.bind(this);
        this.renderDropdown = this.renderDropdown.bind(this);
        this.handleRemoveProduct = this.handleRemoveProduct.bind(this);
    }

    componentDidMount(){
        EliteAPI.CRM.User.search({take: 1000, include_classes: 'user', status: 'WON'}, success => {
            //console.log(success.data.users);
            this.setState({users: success.data.users});
        });
        EliteAPI.CRM.DealProduct.search({take: 1000, include_classes: 'product', deal_id: this.props.deal.deal_id}, (success) => {
          success.data.models.map(model => {
            this.state.selectedProducts.push({...model.product, price: model.price});
          })
        })
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

    handleDropdownOnChangeText(text){
        this.setState({searchText: text})
        EliteAPI.STR.Product.search({query_search: text, take: 1000, include_classes: 'productprice', status: 'WON'}, success => {
            //console.log(success.data.models[0]);
            this.setState({products: success.data.models});
        });
    }

    handleDropdownPress(product){
        //console.log(product);
        this.setState({
            searchText: '',
            products: []
        });
        this.state.selectedProducts.push(product);
    }

    renderDropdown(product) {
        return (
            <TouchableOpacity
                key={product.product_id}
                onPress={() => this.handleDropdownPress(product)}
                style={STYLES.dropdownText}>
                <Text>
                    {product.name}
                </Text>
            </TouchableOpacity>

        )
    }

    handleRemoveProduct(product){
        let myArray = this.state.selectedProducts.filter(item => item != product);
        this.setState({
            selectedProducts: myArray
        })
    }

    render() {
        let clients = this.state.users.map(user => <Picker.Item key={user.id} label={user.full_name + ' - ' + user.email} value={user}/>)
        let dropdownMenu = this.state.products.map(product => {return this.renderDropdown(product)});
        let ProductRow = this.state.selectedProducts.map(product =>
            <ProductSelectRow key={product.product_id} product={product} onRemoveProduct={this.handleRemoveProduct}/>
        )

        return (
            <View style={STYLES.container}>
                <Text style = {STYLES.textStyle}>Work Order Name</Text>
                <TextInput style = {STYLES.textInputContainer}
                   underlineColorAndroid = "transparent"
                   onChangeText = {(text) => this.setState({workOrderName: text})}
                   value={this.state.workOrderName}/>


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


               {/*---------------------------------------------------------------------------------

                  Products searchable drop down

                  ---------------------------------------------------------------------------------*/}
              <Text style={STYLES.textStyle}>Products</Text>
              <TextInput style={STYLES.dropdownTextInput}
                  underlineColorAndroid = "transparent"
                  autoCapitalize = "none"
                  onChangeText = {(text) => this.handleDropdownOnChangeText(text)}
                  value={this.state.searchText}/>

              {
                  this.state.products.length > 0 ?
                  <View style={STYLES.dropdownMenu}>
                      {dropdownMenu}
                  </View> : null
              }

              {
                  this.state.selectedProducts.length > 0 ?
                  <View>
                      <View style={STYLES.selectedBox}>
                          <Text style={[STYLES.selectedBoxTitle,STYLES.nameContainer]}>NAME</Text>
                          <Text style={[STYLES.selectedBoxTitle,STYLES.flexBox1]}>PRICE</Text>
                          <Text style={[STYLES.selectedBoxTitle,STYLES.flexBox2]}>QUANTITY</Text>
                      </View>
                      <View style={STYLES.selectedBoxBody}>
                          {ProductRow}
                      </View>
                  </View> : null
              }






               <AddressSelect ref={e => this.addressSelect = e}/>


               <View style = {STYLES.dateContainer}>
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
               </View>



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
    selectedBoxTitle: {
        color: 'white'
    },
    flexBox1: {
        flex: 1
    },
    flexBox2: {
        flex: 2
    },
    nameContainer: {
        width: 100
    },
    selectedBox: {
        flexDirection: 'row',
        backgroundColor: 'black',
        padding: 10,
        borderTopLeftRadius: 5,
        borderTopRightRadius: 5,
        marginTop: 10
    },
    selectedBoxBody: {
        padding: 10,
        borderBottomLeftRadius: 5,
        borderBottomRightRadius: 5,
        borderWidth: 1
    },
    dropdownTextInput: {
        padding: 5,
        borderWidth: 1,
        borderColor: 'black',
        borderRadius: 5
    },
    dropdownMenu: {
        backgroundColor: '#eaeaea',
        padding: 10,
        borderRadius: 5
    },
    dropdownText: {
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
    },
    dateContainer: {
        marginTop: 10
    }
}
