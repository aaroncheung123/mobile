import React from 'react';
import {StyleSheet, View, ScrollView, TextInput} from 'react-native';
import DealCard from '../../components/deal-card.js';
import Icon from 'react-native-vector-icons/FontAwesome';

export default class Dashboard extends React.Component {

    render() {
        return (
            <View style={STYLES.container}>
                <View style={STYLES.searchContainer}>
                    <View style={STYLES.iconContainer}>
                        <Icon name='search' size= {20}/>
                    </View>
                    <View style={STYLES.textInputContainer}>
                        <TextInput
                            style={STYLES.textInputStyle}
                            placeholder = "Search Deals by Zone"
                            underlineColorAndroid = "transparent"/>
                    </View>

                </View>

                <View style={STYLES.scrollViewContainer}>
                    <ScrollView>
                        <DealCard/>
                    </ScrollView>
                </View>


            </View>
        )
    }

}

const STYLES = {
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    textInputStyle: {
        width: '100%',
        borderBottomWidth: 2,
        borderColor: 'gray'
    },
    searchContainer: {
        flex: 1,
        width: '80%',
        flexDirection: 'row',
        marginHorizontal: 20,
        marginVertical: 30
    },
    scrollViewContainer: {
        flex: 14
    },
    iconContainer: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        marginRight: 5
    },
    textInputContainer: {
        flex: 9,
        justifyContent: 'flex-start',
        alignItems: 'center'
    }
}
