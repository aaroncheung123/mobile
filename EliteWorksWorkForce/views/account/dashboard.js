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
            deals: [],
            drivingSwitch: false,
            jobSwitch: false,
        }
        this.springValue = new Animated.Value(0);
        this.screenHeight = Dimensions.get('window').height;
        this.handleSpringPanel = this.handleSpringPanel.bind(this);
        this.handleCloseSpringPanel = this.handleCloseSpringPanel.bind(this);
    }

    componentDidMount() {
        EliteAPI.CRM.Deal.search({take: 1000}, success => {
            console.log(success);
        })
    }

    handleSpringPanel() {
        Animated.spring(
            this.springValue,
            {
                toValue: this.screenHeight - 160,
                friction: 6
            }
        ).start()
    }

    handleCloseSpringPanel(){
        this.springValue.setValue(0);
    }

    toggleDriving = (value) => {
        this.setState({drivingSwitch: value})
    }

    toggleJob = (value) => {
        this.setState({jobSwitch: value})
    }

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

                <TouchableOpacity
                    onPress={this.handleSpringPanel}>
                    <Text>Click Me!</Text>
                </TouchableOpacity>

                <View style={STYLES.scrollViewContainer}>
                    <ScrollView>
                        <View style={STYLES.transparentFiller}>
                            <DealCard/>
                            <DealCard/>
                            <DealCard/>
                        </View>
                    </ScrollView>
                </View>


                <Animated.View style={[STYLES.springContainer, {height: this.springValue}]}>
                    <Icon name='times' size= {35} style={STYLES.iconX} onPress={this.handleCloseSpringPanel}/>
                    <View style={STYLES.innerSpringContainer}>
                        <Text style={STYLES.springContainerText}>Snow Removal</Text>

                        <View style={STYLES.toggleContainer}>
                            <Text style={STYLES.toggleText}>Stop Driving</Text>

                                <Switch
                                    onTintColor = '#F7882F'
                                    thumbTintColor = 'white'
                                    style = {STYLES.switchStyle}
                                    onValueChange = {this.toggleDriving}
                                    value = {this.state.drivingSwitch}/>

                                <Text style={STYLES.toggleText}>Start Driving</Text>
                        </View>


                        <View style={STYLES.toggleContainer}>
                            <Text style={STYLES.toggleText}>Stop Job</Text>

                                <Switch
                                    onTintColor = '#F7882F'
                                    thumbTintColor = 'white'
                                    style = {STYLES.switchStyle}
                                    onValueChange = {this.toggleJob}
                                    value = {this.state.jobSwitch}/>

                                <Text style={STYLES.toggleText}>Start Job</Text>
                        </View>


                    </View>

                </Animated.View>

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
        flex: 1,
        position: 'absolute',
        bottom: 0,
        width: '100%',
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Blueberry,
        opacity: .9
    },
    innerSpringContainer: {
        flex: 1,
        margin: 20,
        justifyContent: 'flex-start',
        alignItems: 'center'
    },
    iconX: {
        color: 'white',
        position: 'absolute',
        right: 0,
        top: 0,
        margin: 15
    },
    springContainerText: {
        color: 'white',
        fontSize: 24,
        fontWeight: 'bold',
        borderBottomWidth: 2,
        marginBottom: 20,
        paddingBottom: 20,
        borderColor: 'white',
    },
    toggleOutsideContainer: {
        flex: 1
    },
    toggleContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 20
    },
    toggleText: {
        color: 'white',
        fontSize: 18
    },
    switchStyle: {
        marginHorizontal: 10,
    },
}
