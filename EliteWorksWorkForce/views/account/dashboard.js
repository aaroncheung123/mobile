import React from 'react';
import {Text, StyleSheet, View, ScrollView, TextInput, TouchableOpacity, Dimensions, Animated} from 'react-native';
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
                    <View style={STYLES.innerSpringContainer}>
                        <Icon name='times' size= {35} style={STYLES.iconX} onPress={this.handleCloseSpringPanel}/>

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
        margin: 20
    },
    iconX: {
        color: 'white',
        position: 'absolute',
        right: 0
    },
}
