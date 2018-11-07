import React from 'react';


import {View, Text} from 'react-native'

// purpose
//   inputs for address editing fields
// args
//   address_id (optional) (model will pull from this address id) (overrides address)
//   address (address model)
//   showValidate (shows validation Button)
//   showCoordinates (shows coordinate fields)
//   soft (allows address to not have all fields)
//   labelSizeSmall (how wide the label is (1 - 12))
//   labelSizeMedium (how wide the label is on medium devices (1 - 12))
//   labelSizeLarge (how wide the label is on large devices (1 - 12))
//   labelTextClasses (classes you can pass to the label to stylize it)
//   inputSizeSmall (how wide the input is (1 - 12))
//   inputSizeMedium (how wide the input is on medium devices (1 - 12))
//   inputSizeLarge (how wide the input is on large devices (1 - 12))
// events
//   onBlur (runs ever time a blur happens)
// returns
//   component for editing addresses

export default class AddressSelect extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      address: this.props.address ? new EliteAPI.Models.CRM.Address(this.props.address) : new EliteAPI.Models.CRM.Address(),
      setCoordinates: false
    };

    if (GlobalUtil.inputToBool(this.props.soft)) this.state.address.soft = true;

    this.handleChange = this.handleChange.bind(this);
    this.getAddress = this.getAddress.bind(this);
    this.validate = this.validate.bind(this);
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
  handleChange(e) {
    this.state.address[e.target.name] = e.target.value;
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

  validate() {
    var address = this.getAddress();
    if (address.address_id === undefined) {
      alert("Unable to validate address");
    } else {
      EliteAPI.CRM.Address.validate(
        { address_id: address.address_id },
        success => {
          this.setState({ address: success.data.address });
          alert("Validated successfully");
        },
        failure => {
          alert("Unable to validate address");
        }
      );
    }
  }

  render() {
    let states = GlobalUtil.Form.states;
    let stateList = Object.keys(states).map(state => {
      return (
        <option key={state} value={state}>
          {states[state]}
        </option>
      );
    });

    return (
      <View style={{STYLES.container, ...this.props.stylesContainer}}>
       
        <View style={{STYLES.inputContainer, ...this.props.stylesInputContainer}}>
          <View style={{STYLES.labelContainer, ...this.props.stylesLabelContainer}}>
            <Text style={{STYLES.label, ...this.props.stylesLabel}}>Street 2</Text>
          </View>
          <View style={{STYLES.inputContainer, ...this.props.stylesInputContainer}}>
            <input
              className="form-control"
              type="text"
              id="shippingStreet2"
              name="street_2"
              value={this.state.address.street_2 ? this.state.address.street_2 : ""}
              onChange={this.handleChange}
            />
          </View>
        </View>
        <View style={{STYLES.inputContainer, ...this.props.stylesInputContainer}}>
          <View style={{STYLES.labelContainer, ...this.props.stylesLabelContainer}}>
            <Text style={{STYLES.label, ...this.props.stylesLabel}}>City</Text>
          </View>
          <View style={{STYLES.inputContainer, ...this.props.stylesInputContainer}}>
            <input
              className="form-control"
              type="text"
              id="shippingCity"
              name="city"
              value={this.state.address.city ? this.state.address.city : ""}
              onChange={this.handleChange}
            />
          </View>
        </View>
        <View style={{STYLES.inputContainer, ...this.props.stylesInputContainer}}>
          <View style={{STYLES.labelContainer, ...this.props.stylesLabelContainer}}>
            <Text style={{STYLES.label, ...this.props.stylesLabel}}>State</Text>
          </View>
          <View style={{STYLES.inputContainer, ...this.props.stylesInputContainer}}>
            <select
              className="form-control"
              name="state"
              id="shippingState"
              value={this.state.address.state ? this.state.address.state : ""}
              onChange={this.handleChange}
            >
              <option value="" disabled>
                --- Select State ---
              </option>
              {stateList}
            </select>
          </View>
        </View>
        <View style={{STYLES.inputContainer, ...this.props.stylesInputContainer}}>
          <View style={{STYLES.labelContainer, ...this.props.stylesLabelContainer}}>
            <Text style={{STYLES.label, ...this.props.stylesLabel}}>Zipcode</Text>
          </View>
          <View style={{STYLES.inputContainer, ...this.props.stylesInputContainer}}>
            <input
              className="form-control"
              type="text"
              id="shippingZipcode"
              name="zipcode"
              value={this.state.address.zipcode ? this.state.address.zipcode : ""}
              onChange={this.handleChange}
            />
          </View>
        </View>
        {GlobalUtil.inputToBool(this.props.showCoordinates) ? (
          <View style={{STYLES.inputContainer, ...this.props.stylesInputContainer}}>
            <View style={{STYLES.labelContainer, ...this.props.stylesLabelContainer}}>
              <Text style={{STYLES.label, ...this.props.stylesLabel}}>Longitude</Text>
            </View>
            <View style={{STYLES.inputContainer, ...this.props.stylesInputContainer}}>
              <input
                className="form-control"
                type="text"
                id="shippingLongitude"
                name="longitude"
                value={this.state.address.longitude ? this.state.address.longitude : ""}
                onChange={this.handleChange}
                onBlur={this.props.onBlur}
              />
            </View>
          </View>
        ) : null}
        {GlobalUtil.inputToBool(this.props.showCoordinates) ? (
          <View style={{STYLES.inputContainer, ...this.props.stylesInputContainer}}>
            <View style={{STYLES.labelContainer, ...this.props.stylesLabelContainer}}>
              <Text style={{STYLES.label, ...this.props.stylesLabel}}>Latitude</Text>
            </View>
            <View style={{STYLES.inputContainer, ...this.props.stylesInputContainer}}>
              <input
                className="form-control"
                type="text"
                id="shippingLatitude"
                name="latitude"
                value={this.state.address.latitude ? this.state.address.latitude : ""}
                onChange={this.handleChange}
                onBlur={this.props.onBlur}
              />
            </View>
          </View>
        ) : null}
        {GlobalUtil.inputToBool(this.props.showValidate) ? (
          <View>
            <View className={inputClasses}>
              <button id="addressValidateCheck" type="button" className="btn btn-info" onClick={this.validate}>
                Validate Address
              </button>
            </View>
          </View>
        ) : null}
      </View>
    );
  }
}

const BasicAddressInput = (props) => {
  <View style={{STYLES.inputContainer, ...props.stylesInputContainer}}>
    <View style={{STYLES.labelContainer, ...props.stylesLabelContainer}}>
      <Text style={{STYLES.label, ...props.stylesLabel}}>Street 1</Text>
    </View>
    <View style={{STYLES.inputContainer, ...props.stylesInputContainer}}>
      <input
        style={{STYLES.input, ...props.stylesInput}}
        value={props.value ? props.value : ""}
        onChange={props.onChange}
      />
    </View>
  </View>
}






const STYLES = {
  container: {

  },
  inputContainer: {

  },
  labelContainer: {

  },
  label: {

  },

}