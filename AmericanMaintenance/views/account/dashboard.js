import React from 'react';
import {Text, StyleSheet, View, ScrollView, TextInput, TouchableOpacity, Dimensions, Animated, Switch,Picker, RefreshControl, Platform, Modal} from 'react-native';
import DealCard from '../../components/deal-card.js';
import Icon from 'react-native-vector-icons/FontAwesome';
import SelectPicker from 'react-native-picker-select';
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
            pickerSelected: '',
            modalVisible: false,
        }
        this.filterDeals = this.filterDeals.bind(this);
        this.onRefresh = this.onRefresh.bind(this);
        this.handleFilter = this.handleFilter.bind(this);
        this.handleZoneFilterPress = this.handleZoneFilterPress.bind(this);

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

    handleFilter(){
        console.log(this.state.modalVisible);
        this.setState({ modalVisible: !this.state.modalVisible });
    }

    handleZoneFilterPress(){
        console.log('zone filter: ');
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

        let zones = this.state.zones.map(zone =>
            <View key={zone.zone_id} style={STYLES.zoneTextContainer}>
                <TouchableOpacity onPress={this.handleZoneFilterPress} style={STYLES.zoneTouchableOpacity}>
                    <Text style={STYLES.zoneText}>{zone.name}</Text>
                </TouchableOpacity>
            </View>)

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


                    <TouchableOpacity onPress={this.handleFilter} style={STYLES.filterContainer}>
                        <Icon name='filter' color='white' size= {20}/>
                    </TouchableOpacity>

                    <Modal
                        animationType = {"slide"}
                        transparent = {true}
                        visible = {this.state.modalVisible}
                        onRequestClose = {() => { console.log("Modal has been closed.") } }>

                       <View style={STYLES.modal}>
                           <Text style={STYLES.modalTitle}>Select a zone</Text>

                           <ScrollView>
                               {zones}
                           </ScrollView>

                           <TouchableOpacity
                             style={STYLES.myButton}
                             onPress ={this.handleFilter}>
                                 <Text style={STYLES.zoneCancel}>Cancel</Text>
                           </TouchableOpacity>
                       </View>
                    </Modal>

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
    modalTitle: {
        fontSize: 16,
        fontWeight: 'bold'
    },
    zoneTextContainer: {
        borderBottomWidth: 2
    },
    zoneTouchableOpacity: {
        paddingVertical: 10,
        marginVertical: 10
    },
    zoneCancel: {
        marginVertical: 15
    },
    modal: {
        backgroundColor:'#c4c4c4',
        marginHorizontal: 50,
        marginVertical: 150,
        borderRadius: 5,
        padding: 10,
        opacity: .95
    },
    myButton: {

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


{/*<View style={STYLES.textInputContainer}>
    <Picker
      selectedValue={this.state.searchText}
      style={STYLES.pickerStyle}
      onValueChange={(itemValue, itemIndex) => this.filterDeals(itemValue)}>
      <Picker.Item label="Search by zone - no filter" value="no_filter" />
      {zones}
    </Picker>
</View>*/}


// <Picker.Item
//     key={zone.zone_id}
//     label={zone.name}
//     value={zone.zone_id} />
