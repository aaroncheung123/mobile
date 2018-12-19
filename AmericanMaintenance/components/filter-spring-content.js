import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import SelectPicker from 'react-native-picker-select';
import {EliteWorksOrange, AccountContentGrey, AccountMenuGrey, Blueberry, AppleCore} from '../assets/styles/constants';

export default class FilterSpringContent extends React.Component {

    constructor(props)
    {
        super(props)
        this.state = {
            selectedValue: this.props.selectedValue ? this.props.selectedValue : 'no_filter',
            zones: [{
                label: 'No Filter',
                value: 'no_filter',
            }]
        }

        console.log('props', this.props);
        this.handleFilter = this.handleFilter.bind(this);

        this.props.zones.map(zone => this.state.zones.push({
            label: zone.name,
            value: Number(zone.zone_id),
            zone: zone
        }))

    }


    handleFilter(value, index){
        console.log("value: ", value);
        this.setState({selectedValue: value});
        this.props.onFilterDeals(value);
    }

    render() {

        console.log('selected', this.state.selectedValue)
        return (
            <View style={STYLES.container}>
                <Text style={STYLES.title}>Zone</Text>
                <View style={STYLES.selectPickerContainer}>
                    <SelectPicker
                        placeholder={{}}
                        value={Number(this.state.selectedValue)}
                        items={this.state.zones}
                        hideDoneBar={true}
                        hideIcon={true}
                        onValueChange={this.handleFilter}/>
                </View>

                <TouchableOpacity onPress={this.props.onComplete} style={STYLES.applyButton}>
                    <Text style={STYLES.text}>Apply</Text>
                </TouchableOpacity>
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
    text: {
        color: 'white'
    },
    selectPickerContainer: {
        borderWidth: 1,
        borderRadius: 5,
        width: '100%',
        padding: 5
    },
    applyButton: {
        marginTop: 20,
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        padding: 15,
        backgroundColor: EliteWorksOrange
    }
}
