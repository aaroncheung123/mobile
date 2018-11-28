import React from 'react';
import {Text, StyleSheet, View, ScrollView, TextInput, TouchableOpacity, Dimensions, Animated, Switch} from 'react-native';
import DealCard from '../../components/deal-card.js';
import Icon from 'react-native-vector-icons/FontAwesome';
import {EliteWorksOrange, AccountContentGrey, AccountMenuGrey, Blueberry, AppleCore} from '../../assets/styles/constants';

export default class Dashboard extends React.Component {


    constructor(props)
    {
        super(props)

        this.state = {
            deals: []
        }
    }

    componentDidMount() {
        EliteAPI.CRM.Deal.search({take: 1000, include_classes: 'user', status: 'WON'}, success => {
            this.setState({deals: success.data.models})
        })
    }

    render() {

        let deals = this.state.deals.map(deal => <DealCard deal={deal} key={deal.deal_id} onShowSpringPanel={this.props.onShowSpringPanel} onShowSidePanel={this.props.onShowSidePanel}/>);

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
                        <View style={STYLES.transparentFiller}>
                            {deals}
                        </View>
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
        borderColor: '#6B7A8F'
    },
    searchContainer: {
        width: '80%',
        flexDirection: 'row',
        marginHorizontal: 20,
        marginVertical: 30
    },
    scrollViewContainer: {
        flex: 1,
        width: '100%'
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
    },
    transparentFiller: {
        marginBottom: 200,
    },
    springContainer: {
        position: 'absolute',
        bottom: 0,
        width: '100%',
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Blueberry,
        opacity: .9
    }
}
