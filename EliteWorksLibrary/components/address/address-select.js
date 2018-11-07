

import React from 'react';
import SelectPicker from 'react-native-picker-select';

import {View, Text} from 'react-native';
import {Button} from 'react-native-elements';

// purpose
//   inputs for address editing fields
// args
//   address_id (optional) (model will pull from this address id) (overrides address)
//   address (address model)
//   soft (allows address to not have all fields)

//   showValidate (shows validation Button)
//   showCoordinates (shows coordinate fields)

//   stylesContainer (optional)
//   stylesInputGroupContainer (optional)
//   stylesLabelContainer (optional)
//   stylesLabel (optional)
//   stylesInputContainer (optional)
//   stylesInput (optional)
//   stylesButtonContainer (optional)
//   stylesButton (optional)

// returns
//   component for editing addresses

export default class AddressSelect extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      address: this.props.address ? new EliteAPI.Models.CRM.Address(this.props.address) : new EliteAPI.Models.CRM.Address(),
      setCoordinates: false,
      addressValidating: false
    };

    if (GlobalUtil.inputToBool(this.props.soft)) this.state.address.soft = true;

    this.handleChange = this.handleChange.bind(this);
    this.getAddress = this.getAddress.bind(this);
    this.handleValidatePress = this.handleValidatePress.bind(this);



    let states = GlobalUtil.Form.states;
    this.stateList = Object.keys(states).map(state => {
      return {
        value: state,
        label: states[state]
      }
    });
  }

  componentDidMount() {
    if (this.props.address_id) {
      EliteAPI.CRM.Address.get({ address_id: this.props.address_id }, success => {
        this.setState({ address: success.data.address });
      });
    }
  }

  componentDidUpdate(prevProps) {
    if (prevProps.address != this.props.address && prevProps.address) {
      if (GlobalUtil.inputToBool(prevProps.soft)) prevProps.address.soft = true;
      this.setState({
        address: this.props.address ? new EliteAPI.Models.CRM.Address(this.props.address) : new EliteAPI.Models.CRM.Address()
      });
    }
  }
  handleChange(property, value) {
    this.state.address[property] = value;
    delete this.state.address.address_id;
    this.forceUpdate();
  }

  getAddress() {
    if (this.state.address.address_id === undefined) {
      if (GlobalUtil.inputToBool(this.props.soft)) this.state.address.soft = 1;
      this.state.address.save(
        success => {
          this.state.address = success.data.address;
          this.forceUpdate();
        },
        failure => {
          alert(failure.error_message);
        },
        true
      );
    }
    return this.state.address;
  }

  handleValidatePress() {
    let address = this.getAddress();
    if (address.address_id === undefined) {
      alert("Unable to validate address");
    }
    else {
      this.setState({addressValidating: true} () => {
        EliteAPI.CRM.Address.validate(
          { address_id: address.address_id },
          success => {
            this.setState({address: success.data.address, addressValidating: false});
            alert("Validated successfully");
          },
          failure => {
            this.setState({addressValidating: false})
            alert("Unable to validate address");
          }
        );
      })
    }
  }

  render() {

    return (
      <View style={{STYLES.container, ...this.props.stylesContainer}}>
        <BasicAddressInput {...props} title="Street 1" value={this.state.address.street_1} onChangeText={this.state.handleChange.bind(this, 'street_1')}/>
        <BasicAddressInput {...props} title="Street 2 (Apt, Suite #)" value={this.state.address.street_2} onChangeText={this.state.handleChange.bind(this, 'street_2')}/>
        <BasicAddressInput {...props} title="City" value={this.state.address.city} onChangeText={this.state.handleChange.bind(this, 'city')}/>
      
        <View style={{STYLES.inputGroupContainer, ...this.props.stylesInputGroupContainer}}>
          <View style={{STYLES.labelContainer, ...this.props.stylesLabelContainer}}>
            <Text style={{STYLES.label, ...this.props.stylesLabel}}>State</Text>
          </View>
          <View style={{STYLES.inputContainer, ...this.props.stylesInputContainer}}>
            <SelectPicker
              placeholder={{}}
              style={{STYLES.input, ...props.stylesInput}}
              label='State'
              value={this.state.address.state ? this.state.address.state : ""}
              items={this.stateList}
              hideDoneBar={true}
              hideIcon={true}
              onValueChange={this.state.handleChange.bind(this, 'state')}
            />
          </View>
        </View>

        <BasicAddressInput {...props} title="Zipcode" value={this.state.address.zipcode} onChangeText={this.state.handleChange.bind(this, 'zipcode')}/>
        {GlobalUtil.inputToBool(this.props.showCoordinates) ? (
          <BasicAddressInput {...props} title="Longitude" value={this.state.address.longitude} onChangeText={this.state.handleChange.bind(this, 'longitude')}/>
        ) : null}
        {GlobalUtil.inputToBool(this.props.showCoordinates) ? (
          <BasicAddressInput {...props} title="Latitude" value={this.state.address.latitude} onChangeText={this.state.handleChange.bind(this, 'latitude')}/>
        ) : null}

        {GlobalUtil.inputToBool(this.props.showValidate) ? (
          <View className={{STYLES.buttonContainer, ...this.props.stylesButtonContainer}}>
             <Button
              onPress={this.handleValidatePress}
              title="Validate Address"
              accessibilityLabel="Validate Address"
              buttonStyle={{STYLES.button, ...this.props.stylesButton}}
              loading={this.state.loadingClockIn}
            />
          </View>
        ) : null}
      </View>
    );
  }
}

const BasicAddressInput = (props) => {
  <View style={{STYLES.inputGroupContainer, ...props.stylesInputGroupContainer}}>
    <View style={{STYLES.labelContainer, ...props.stylesLabelContainer}}>
      <Text style={{STYLES.label, ...props.stylesLabel}}>{props.label}</Text>
    </View>
    <View style={{STYLES.inputContainer, ...props.stylesInputContainer}}>
      <TextInput
        style={{STYLES.input, ...props.stylesInput}}
        underlineColorAndroid="transparent"
        value={props.value ? props.value : ""}
        onChangeText={props.onChangeText}
      />
    </View>
  </View>
}

const STYLES = {
  container: {

  },
  inputGroupContainer: {

  },
  inputContainer: {

  },
  input: {

  },
  labelContainer: {

  },
  label: {

  },
  buttonContainer: {

  },
  button: {

  }
}