import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';

export default class FilterSpringContent extends React.Component {

    constructor(props)
    {
        super(props)
        this.state = {
        }
    }

    render() {
        return (
            <View style={STYLES.container}>
                <TouchableOpacity style={STYLES.filterContainer}>
                    <Text style={STYLES.title}>Zone</Text>
                </TouchableOpacity>
                <TouchableOpacity style={STYLES.filterContainer}>
                    <Text style={STYLES.title}>Zone</Text>
                </TouchableOpacity>

                <TouchableOpacity style={STYLES.filterContainer}>
                    <Text style={STYLES.title}>Zone</Text>
                </TouchableOpacity>


            </View>
        );
    }
}

const STYLES = {
    container: {
        flexDirection: 'row',
        flexWrap: 'wrap'
    },
    title: {
        fontSize: 16,
        fontWeight: 'bold'
    },
    filterContainer: {
        height:150,
        width: 150,
        backgroundColor: '#c4c4c4',
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        margin: 10
    }
}
