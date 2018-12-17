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
            selectedProducts: [],
            notes: ''
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
            console.log(success);
            success.data.models.map(model => {
                this.state.selectedProducts.push({...model.product, price: model.price});
            })
            this.forceUpdate();
        }, f => console.log(f))
    }

    componentDidUpdate(prevProps)
    {
        if (prevProps.deal.deal_id != this.props.deal.deal_id) 
        {
            this.state.selectedProducts = [];
            this.forceUpdate();
            EliteAPI.CRM.DealProduct.search({take: 1000, include_classes: 'product', deal_id: this.props.deal.deal_id}, (success) => {
                console.log(success);
                success.data.models.map(model => {
                    this.state.selectedProducts.push({...model.product, price: model.price});
                })
                this.forceUpdate();
            }, f => console.log(f))
        }
    }

    handleShippingAddressSubmit() {
        this.props.onComplete()

        Service.User.get(user => {
            EliteAPI.STR.WorkOrder.add({
                model_id: this.props.deal.model_id,
                class_key: this.props.deal.class_key,
                zone_id: this.props.deal.zone_id,
                deal_id: this.props.deal.deal_id,
                assigned_role_id: user.role_id,
                assigned_user: user.id,
                name: this.state.workOrderName,
                address_id: this.props.deal.address_id,
                scheduled_at: GlobalUtil.convertDateToMysql(this.state.selectedDay),
                notes: this.state.notes
            }, (success) => {

                let workOrder = success.data.model;
                workOrder.work_order_products = [];

                let numberOfProdutsToAdd = this.state.selectedProducts.length;
                if (numberOfProdutsToAdd)
                this.state.selectedProducts.forEach((product) => {
                    let workOrderProduct = new EliteAPI.Models.STR.WorkOrderProduct({
                        work_order_id: workOrder.work_order_id,
                        product_id: product.product_id,
                        name: product.name,
                        price: (product.price_current) ? product.price_current.price : (product.price ? product.price : 0),
                        quantity: 1,
                        notes: ''
                    })
                    workOrderProduct.save((success) => {
                        workOrder.work_order_products.push(success.data.model)
                        //console.log(numberOfProdutsToAdd);
                        if (numberOfProdutsToAdd == workOrder.work_order_products.length) {
                            if (this.props.onWorkOrderAdd) this.props.onWorkOrderAdd(workOrder);
                        }
                    });
                })

                this.setState({
                    workOrderName: '',
                    selectedProducts: [],
                    products: [],
                    searchText: '',
                    notes: ''
                })

            }, (failure) => {
            })
        })



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
        let ProductRow = this.state.selectedProducts.map((product, i) =>
            <ProductSelectRow key={i} product={product} onRemoveProduct={this.handleRemoveProduct}/>
        )

        return (
            <View style={STYLES.container}>
                <Text style = {STYLES.textStyle}>Work Order Name</Text>
                <TextInput style = {STYLES.textInputContainer}
                   underlineColorAndroid = "transparent"
                   onChangeText = {(text) => this.setState({workOrderName: text})}
                   value={this.state.workOrderName}/>


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
                          {/*}<Text style={[STYLES.selectedBoxTitle,STYLES.flexBox2]}>QUANTITY</Text>*/}
                      </View>
                      <View style={STYLES.selectedBoxBody}>
                          {ProductRow}
                      </View>
                  </View> : null
              }

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
        flex: 4
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
        borderRadius: 5,
        height: 35,
        width: 300,
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
        width: '95%'
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
