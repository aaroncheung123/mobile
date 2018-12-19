import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import SelectPicker from 'react-native-picker-select';

export default class FilterSpringContent extends React.Component {

    constructor(props)
    {
        super(props)
        this.state = {
            selectedValue: '',
            items: [
            {
                label: 'Red',
                value: 'red',
            },
            {
                label: 'Orange',
                value: 'orange',
            },
            {
                label: 'Blue',
                value: 'blue',
            },
        ]
        }
    }


    componentDidMount(){
        console.log(this.state.items[0].value);
    }

    render() {
        return (
            <View style={STYLES.container}>
                <Text style={STYLES.title}>Zone</Text>
                <View style={STYLES.selectPickerContainer}>
                    <SelectPicker
                        placeholder={{}}
                        style={STYLES.selectPicker}
                        value={this.state.selectedValue.value}
                        items={this.state.items}
                        hideDoneBar={true}
                        hideIcon={true}
                        onValueChange={(value, index) => {this.setState({selectedValue: this.state.items[index]})}}
                    />
                </View>
            </View>
        );
    }
}

const STYLES = {
    container: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        width: '100%',
    },
    title: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 5,
        marginTop: 15
    },
    selectPickerContainer: {
        borderWidth: 1,
        borderRadius: 5,
        width: '100%',
        padding: 5
    }
}
