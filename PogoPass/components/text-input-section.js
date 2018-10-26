import React from 'react';
import {View, Text, TextInput} from 'react-native';

export default class TextInputSection extends React.Component {
    constructor(props)
    {
        super(props);
        this.state = {
            information: undefined
        }
        this.handleTextChange = this.handleTextChange.bind(this);
    }

    componentDidMount() {
        console.log("information: ", this.props.information);
        //this.setState(information: {this.props.information})
    }

    handleTextChange(property, value) {
        let information = this.state.information;
        information[property] = value;
        this.setState({information: information});
    }

    render() {
        return (
            <View>
                <Text style={STYLES.textStyle}>{this.props.title}</Text>
                <TextInput
                    style={STYLES.textInputStyle}
                    underlineColorAndroid = "transparent"
                    value={this.props.first_name}
                    onChangeText = {(value) => this.handleTextChange('first_name', value)}/>
            </View>
        );
    }
}

const STYLES = {
    textStyle: {
        fontSize: 16,
        paddingTop: 10,
    },
    textInputStyle: {
        height: 40,
        paddingLeft: 20,
        borderWidth: 1,
        borderRadius: 5
    }
}
