

import React from 'react';

import {View, Text, Picker, TextInput} from 'react-native';


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


const MERGE_STYLES = (styleObject, styleObject2) =>
{
  let styles = styleObject ? {...styleObject} : {};
  if (styleObject2) styles = {...styles, ...styleObject2};
  return styles;
}

export default class AddressSelect extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      address: this.props.address ? new EliteAPI.Models.CRM.Address(this.props.address) : new EliteAPI.Models.CRM.Address({state: 'AL'}),
      setCoordinates: false,
      addressValidating: false
    };

    if (GlobalUtil.inputToBool(this.props.soft)) this.state.address.soft = true;

    this.handleChange = this.handleChange.bind(this);
    this.getAddress = this.getAddress.bind(this);
    this.handleValidatePress = this.handleValidatePress.bind(this);
    let states = GlobalUtil.Form.states;
    this.stateList = Object.keys(states).map(state => <Picker.Item key={state} label={states[state]} value={state} />);
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

  getAddress(callback) {
    if (this.state.address.address_id === undefined) {
      if (GlobalUtil.inputToBool(this.props.soft)) this.state.address.soft = 1;
      this.state.address.save(
        success => {
          this.state.address = success.data.address;
          this.forceUpdate();
          callback(this.state.address)
        },
        failure => {
          alert(failure.error_message);
          callback();
        }
      );
    }
    else callback(this.state.address);
  }

  handleValidatePress() {
    let address = this.getAddress();
    if (address.address_id === undefined) {
      alert("Unable to validate address");
    }
    else {
      this.setState({addressValidating: true}, () => {
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
      <View style={MERGE_STYLES(STYLES.container, this.props.stylesContainer)}>
        <BasicAddressInput {...this.props} label="Street 1" value={this.state.address.street_1} onChangeText={this.handleChange.bind(this, 'street_1')}/>
        <BasicAddressInput {...this.props} label="Street 2 (Apt, Suite #)" value={this.state.address.street_2} onChangeText={this.handleChange.bind(this, 'street_2')}/>
        <BasicAddressInput {...this.props} label="City" value={this.state.address.city} onChangeText={this.handleChange.bind(this, 'city')}/>

        <View style={MERGE_STYLES(STYLES.inputGroupContainer, this.props.stylesInputGroupContainer)}>
          <View style={MERGE_STYLES(STYLES.labelContainer, this.props.stylesLabelContainer)}>
            <Text style={MERGE_STYLES(STYLES.label, this.props.stylesLabel)}>State</Text>
          </View>
          <View style={MERGE_STYLES(STYLES.inputContainer, this.props.stylesInputContainer)}>
            <Picker
              iosHeader="Select State"
              style={MERGE_STYLES(STYLES.pickerInput, this.props.stylesPickerInput)}
              selectedValue={this.state.address.state ? this.state.address.state : ""}
              onValueChange={this.handleChange.bind(this, 'state')}
            >
              {this.stateList}
            </Picker>
          </View>
        </View>

        <BasicAddressInput {...this.props} label="Zipcode" value={this.state.address.zipcode} onChangeText={this.handleChange.bind(this, 'zipcode')}/>
        {GlobalUtil.inputToBool(this.props.showCoordinates) ? (
          <BasicAddressInput {...this.props} label="Longitude" value={this.state.address.longitude} onChangeText={this.handleChange.bind(this, 'longitude')}/>
        ) : null}
        {GlobalUtil.inputToBool(this.props.showCoordinates) ? (
          <BasicAddressInput {...this.props} label="Latitude" value={this.state.address.latitude} onChangeText={this.handleChange.bind(this, 'latitude')}/>
        ) : null}

        {/*GlobalUtil.inputToBool(this.props.showValidate) ? (
          <View className={MERGE_STYLES(STYLES.buttonContainer, this.props.stylesButtonContainer)}>
             <Button
              onPress={this.handleValidatePress}
              title="Validate Address"
              accessibilityLabel="Validate Address"
              buttonStyle={MERGE_STYLES(STYLES.button, this.props.stylesButton)}
              loading={this.state.loadingClockIn}
            />
          </View>
        ) : null*/}
      </View>
    );
  }
}

const BasicAddressInput = (props) => {

  return (
    <View style={MERGE_STYLES(STYLES.inputGroupContainer, props.stylesInputGroupContainer)}>
      <View style={MERGE_STYLES(STYLES.labelContainer, props.stylesLabelContainer)}>
        <Text style={MERGE_STYLES(STYLES.label, props.stylesLabel)}>{props.label}</Text>
      </View>
      <View style={MERGE_STYLES(STYLES.inputContainer, props.stylesInputContainer)}>
        <TextInput
          style={MERGE_STYLES(STYLES.input, props.stylesInput)}
          underlineColorAndroid="transparent"
          value={props.value ? props.value : ""}
          onChangeText={props.onChangeText}
        />
      </View>
    </View>
  )
}

const STYLES = {
  container: {

  },
  inputGroupContainer: {

  },
  inputContainer: {

  },
  input: {
    height: 40,
    paddingLeft: 20,
    borderWidth: 1,
    borderRadius: 5
  },
  labelContainer: {

  },
  label: {
    fontSize: 16,
    paddingTop: 10,
  },
  buttonContainer: {

  },
  button: {

  },
  pickerInput: {
    borderWidth: 1,
    borderRadius: 5
  }
}
