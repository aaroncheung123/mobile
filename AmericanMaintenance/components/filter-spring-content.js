import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import SelectPicker from 'react-native-picker-select';

export default class FilterSpringContent extends React.Component {

    constructor(props)
    {
        super(props)
        this.state = {
            selectedValue: '',
            zones: [{
                label: 'No Filter',
                value: 'no_filter',
            },
        ]
        }
        this.handleFilter = this.handleFilter.bind(this);
    }


    componentDidMount(){
        this.props.zones.map(zone => this.state.zones.push({
            label: zone.name,
            value: zone
        }))

    }

    handleFilter(value, index){
        console.log("value: ", value);
        this.setState({selectedValue: this.state.zones[index]})
        this.props.onFilterDeals(value);
    }

    render() {
        return (
            <View style={STYLES.container}>
                <Text style={STYLES.title}>Zone</Text>
                <View style={STYLES.selectPickerContainer}>
                    <SelectPicker
                        placeholder={{}}
                        value={this.state.selectedValue.value}
                        items={this.state.zones}
                        hideDoneBar={true}
                        hideIcon={true}
                        onValueChange={(value, index) => this.handleFilter(value, index)}/>
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
