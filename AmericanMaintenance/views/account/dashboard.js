import React from 'react';
import {Text, StyleSheet, View, ScrollView, TextInput, TouchableOpacity, Dimensions, Animated, Switch,Picker, RefreshControl, Platform} from 'react-native';
import DealCard from '../../components/deal-card.js';
import FilterSpringContent from '../../components/filter-spring-content.js';
import Icon from 'react-native-vector-icons/FontAwesome';
import SelectPicker from 'react-native-picker-select';
import {EliteWorksOrange, AccountContentGrey, AccountMenuGrey, Blueberry, AppleCore} from '../../assets/styles/constants';

export default class Dashboard extends React.Component {


    constructor(props)
    {
        super(props)

        this.state = {
            deals: [],
            zones: [],
            refreshing: false,
            selectedZone: '',
        }
        this.handleFilterDeals = this.handleFilterDeals.bind(this);
        this.onRefresh = this.onRefresh.bind(this);
        this.handleFilterPanel = this.handleFilterPanel.bind(this);
    }

    componentDidMount() {
        this.onRefresh();
    }

    onRefresh() {
        this.setState({refreshing: true, deals: []});
        EliteAPI.CRM.Zone.search({take: 1000, include_classes: 'user', status: 'WON'}, success => {
            //console.log(success.data.models);
            this.setState({zones: success.data.models})
        });
        EliteAPI.CRM.Deal.search({take: 1000, include_classes: 'user,address', status: 'WON'}, success => {
            //console.log(success.data.models);
            this.setState({deals: success.data.models, refreshing: false})
        });
    }


    handleFilterDeals(value){
        this.setState({selectedZone: value});
        let args = {take: 1000, include_classes: 'user,address', status: 'WON'}
        if (value != 'no_filter') args.zone_id = value
        console.log(value)
        EliteAPI.CRM.Deal.search(args, success => {
            this.setState({deals: success.data.models})
        });
    }

    handleFilterPanel(){
        this.props.onShowSidePanel(
            "Filter",
            <FilterSpringContent
                onComplete={this.props.onComplete}
                selectedValue={this.state.selectedZone}
                onFilterDeals={this.handleFilterDeals}
                zones={this.state.zones}/>
        )
    }

    render() {

        let deals = this.state.deals.map(deal =>
            <DealCard
                key={deal.deal_id}
                deal={deal}
                onComplete={this.props.onComplete}
                onShowCameraPanel={this.props.onShowCameraPanel}
                onShowSpringPanel={this.props.onShowSpringPanel}
                onShowSidePanel={this.props.onShowSidePanel}/>);


        return (
            <View style={STYLES.container}>
                <View style={STYLES.searchContainer}>

                    <View style={STYLES.innerSearchContainer}>
                        <View style={STYLES.iconContainer}>
                            <Icon name='search' size= {20}/>
                        </View>

                        <TextInput
                            placeholder='Search'
                            style={STYLES.textInputContainer}
                            onChangeText={(text) => this.setState({text})}
                            value={this.state.text}/>
                    </View>


                    <TouchableOpacity onPress={this.handleFilterPanel} style={STYLES.filterContainer}>
                        <Icon name='filter' color='white' size= {20}/>
                    </TouchableOpacity>



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
    zoneTextContainer: {
        borderBottomWidth: 2
    },
    zoneTouchableOpacity: {
        paddingVertical: 10,
        marginVertical: 10
    },
    innerSearchContainer: {
        flexDirection: 'row',
        borderWidth: 1,
        borderRadius: 5,
        width: '80%'
    },
    filterContainer: {
        borderRadius: 2,
        backgroundColor: 'black',
        padding: 6,
        marginLeft: 10
    },
    selectPicker: {
        height: 100,
        width: 200
    },
    textInputStyle: {
        width: '100%',
        borderBottomWidth: 2,
        borderColor: '#6B7A8F'
    },
    pickerStyle: {
        height: 40,
        width: 200
    },
    searchContainer: {
        height: 30,
        width: '100%',
        flexDirection: 'row',
        marginHorizontal: 20,
        marginVertical: 10,
        justifyContent: 'center',
        alignItems: Platform.OS === 'ios' ? 'flex-start' : 'center',
    },
    scrollViewContainer: {
        flex: 1,
        width: '100%'
    },
    iconContainer: {
        justifyContent: 'flex-start',
        alignItems: 'center',
        padding: 5
    },
    textInputContainer: {
        justifyContent: 'flex-start',
        alignItems: 'center',
        //borderWidth: 1,
        //borderColor: '#c4c4c4',
        zIndex: 0,
        width: '60%',
        height: 30,
        padding: 5
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
