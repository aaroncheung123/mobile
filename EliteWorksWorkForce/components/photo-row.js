import React from 'react';
import {View, Text} from 'react-native';

export default class PhotoRow extends React.Component {

    constructor(props)
    {
        super(props)
        this.state = {
        }
    }

    render() {
        return (
            <View>
                <Text style={STYLES.toggleTextTitle}>Before Photos</Text>
                <View style={STYLES.photoRow}>
                    <ScrollView horizontal={true}>
                        {beforePhotos}
                        <TouchableOpacity
                            style={STYLES.photoAddContainer}
                            onPress={this.handleCameraDisplay}>
                            <Icon name='plus' size={30} color='white'/>
                        </TouchableOpacity>

                    </ScrollView>
                </View>
            </View>
        );
    }
}

const STYLES = {
    container: {
        backgroundColor: ‘white'
    },
    toggleTextTitle: {
        color: 'white',
        fontSize: 20,
        fontWeight: 'bold'
    },
}
