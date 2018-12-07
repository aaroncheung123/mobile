import React from 'react';
import {Text, StyleSheet, View, ScrollView, TextInput, TouchableOpacity, Dimensions, Animated, Switch,Picker, RefreshControl} from 'react-native';
import DealCard from '../../components/deal-card.js';
import Icon from 'react-native-vector-icons/FontAwesome';
import {EliteWorksOrange, AccountContentGrey, AccountMenuGrey, Blueberry, AppleCore} from '../../assets/styles/constants';

export default class Dashboard extends React.Component {


    constructor(props)
    {
        super(props)

        this.state = {
            searchText: '',
            deals: [],
            zones: [],
            refreshing: false,
        }
        this.filterDeals = this.filterDeals.bind(this);
        this.onRefresh = this.onRefresh.bind(this);
    }

    componentDidMount() {
        this.onRefresh();
    }

    onRefresh() {
        this.setState({refreshing: true});
        EliteAPI.CRM.Zone.search({take: 1000, include_classes: 'user', status: 'WON'}, success => {
            //console.log(success.data.models);
            this.setState({zones: success.data.models})
        });
        EliteAPI.CRM.Deal.search({take: 1000, include_classes: 'user', status: 'WON'}, success => {
            //console.log(success.data.models);
            this.setState({deals: success.data.models, refreshing: false})
        });
    }


    filterDeals(item){
        //console.log(item);
        if(item != 'no_filter'){
            EliteAPI.CRM.Deal.search({zone_id: item, take: 1000, include_classes: 'user', status: 'WON'}, success => {
                //console.log(success.data.models);
                this.setState({searchText: item, deals: success.data.models})
                //this.setState({deals: success.data.models})
            })
        }
        else{
            this.setState({searchText: item})
            EliteAPI.CRM.Deal.search({take: 1000, include_classes: 'user', status: 'WON'}, success => {
                this.setState({deals: success.data.models})
            });
        }
    }

    render() {

        let deals = this.state.deals.map(deal =>
            <DealCard
                key={deal.deal_id}
                deal={deal}
                onComplete={this.props.onComplete}
                onShowSpringPanel={this.props.onShowSpringPanel}
                onShowSidePanel={this.props.onShowSidePanel}/>);

        let zones = this.state.zones.map(zone =>
            <Picker.Item
                key={zone.zone_id}
                label={zone.name}
                value={zone.zone_id} />)

        return (
            <View style={STYLES.container}>
                <View style={STYLES.searchContainer}>
                    <View style={STYLES.iconContainer}>
                        <Icon name='search' size= {20}/>
                    </View>
                    <View style={STYLES.textInputContainer}>
                        <Picker
                          selectedValue={this.state.searchText}
                          style={STYLES.pickerStyle}
                          onValueChange={(itemValue, itemIndex) => this.filterDeals(itemValue)}>
                          <Picker.Item label="Search by zone - no filter" value="no_filter" />
                          {zones}
                        </Picker>
                    </View>
                </View>

                <View style={STYLES.scrollViewContainer}>
                    <ScrollView refreshControl={<RefreshControl refreshing={this.state.refreshing} onRefresh={this.onRefresh}/>}>

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
    pickerStyle: {
        height: 50,
        width: 200
    },
    searchContainer: {
        height: 30,
        width: '80%',
        flexDirection: 'row',
        marginHorizontal: 20,
        marginVertical: 30,
        justifyContent: 'center',
        alignItems: 'center'
    },
    scrollViewContainer: {
        flex: 1,
        width: '100%'
    },
    iconContainer: {
        justifyContent: 'flex-start',
        alignItems: 'center',
        marginRight: 20
    },
    textInputContainer: {
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
