import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import AddressSelect from '../../../../../EliteWorksLibrary/components/address/address-select';

export default class SpringPanelAddress extends React.Component {

    constructor(props){
        super(props);
        this.handleSave = this.handleSave.bind(this);
    }

    handleSave(){

    }

    render() {
        return (
            <View style={STYLES.container}>
                <AddressSelect ref={e => this.addressSelect = e}/>
                <TouchableOpacity
                    style={STYLES.saveContainer}
                    onPress={this.handleSave}>
                        <Text>Save</Text>
                </TouchableOpacity>
            </View>
        );
    }
}

const STYLES = {
    container: {
        width: 225
    },
    saveContainer: {
        backgroundColor: 'orange',
        padding: 10,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 20
    }
}
