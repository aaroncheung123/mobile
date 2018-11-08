import React from 'react';
import {View, Text, TouchableOpacity, Animated, Button, Image, TextInput} from 'react-native';
import {EliteWorksOrange, AccountContentGrey, AccountMenuGrey, Blueberry, DarkBlueberry, AppleCore} from '../assets/styles/constants';
import WorkOrderCard from './work-order-card';


export default class DealCard extends React.Component {

    constructor(props){
      super(props);

      this.icons = {
          'up'    : require('../assets/images/icons/up_arrow.png'),
          'down'  : require('../assets/images/icons/down_arrow.png'),
      };

      this.state = {
        title       : props.title,
        expanded    : true,
        animation   : new Animated.Value(),
        };
    }
    componentDidMount(){
    }

    _setMaxHeight(event){
        this.setState({
            maxHeight   : event.nativeEvent.layout.height + 45
        });
    }

    _setMinHeight(event){
        this.setState({
            minHeight   : event.nativeEvent.layout.height + 45
        });
    }

    toggle(){

        let initialValue= this.state.expanded? this.state.maxHeight + this.state.minHeight : this.state.minHeight,
            finalValue= this.state.expanded? this.state.minHeight : this.state.maxHeight + this.state.minHeight;

        this.setState({
            expanded : !this.state.expanded
        });

        this.state.animation.setValue(initialValue);
        Animated.spring(
            this.state.animation,
            {
                toValue: finalValue
            }
        ).start();
    }

    render(){
        let icon = this.icons['up'];

        if(this.state.expanded){
            icon = this.icons['down'];
        }
        return(
            <Animated.View style={[STYLES.container,{height: this.state.animation}]}>
                <TouchableOpacity style={STYLES.elevatedContainer} onLayout={this._setMinHeight.bind(this)} onPress={this.toggle.bind(this)}>
                        <View>
                            <View style={STYLES.textContainer}>
                                <Text style={STYLES.textStyle1}>Snow Removal Test</Text>
                                <Text style={STYLES.textStyle}>Client: Logan Connors</Text>
                                <Text style={STYLES.textStyle}>Status: Opportunity</Text>
                                <Text style={STYLES.textStyle}>Date: 10/31/18</Text>
                            </View>
                            <View style={STYLES.arrowContainer}>
                                <Image
                                  style={STYLES.arrow}
                                  source={icon}>
                                </Image>
                            </View>
                        </View>
                </TouchableOpacity>

                <View style={STYLES.hiddenBody} onLayout={this._setMaxHeight.bind(this)}>
                    <View style={STYLES.descriptionContainer}>
                        <Text style={STYLES.textStyle2}>Description:</Text>
                        <Text style={STYLES.textStyle3}>This is a test for our meeting</Text>
                    </View>

                    <View>
                        <Text style={STYLES.textStyle2}>Work Orders</Text>
                        <WorkOrderCard onPressDetails={this.props.onPressDetails}/>
                        <WorkOrderCard onPressDetails={this.props.onPressDetails}/>
                    </View>

                </View>

            </Animated.View>

        );
    }
}

const STYLES = {
    container: {
        padding: 30,
        width: '100%',
        flex: 1,
        backgroundColor: 'transparent'
    },
    hiddenBody: {
        width: '100%',
        backgroundColor: 'white',
        marginTop: 2,
        padding: 20,
        borderRadius: 10,
        elevation: 10,
        shadowOffset: { height: 1, width: 1 }, // IOS
        shadowOpacity: 2, // IOS
        shadowRadius: 2, //IOS
    },
    elevatedContainer: {
        flex: 1,
        backgroundColor: Blueberry,
        borderRadius: 5,
        shadowOffset: { height: 1, width: 1 }, // IOS
        shadowOpacity: 2, // IOS
        shadowRadius: 2, //IOS
        elevation: 10, // Android
        paddingHorizontal: 40,
        paddingVertical: 20,
        width: '100%',
        marginBottom: 25
    },
    textStyle: {
        color: 'white'
    },
    textStyle1: {
        width: '100%',
        color: 'white',
        fontSize: 18,
        marginBottom: 15,
        paddingBottom: 15,
        borderBottomWidth: 2,
        borderColor: 'white',
        fontWeight: 'bold'
    },
    textStyle2: {
        fontSize: 18,
        color: 'black'
    },
    textStyle3: {
        color: 'black'
    },
    textContainer: {
        justifyContent: 'center',
        alignItems: 'flex-start',
    },
    buttonImage: {
        height: 40,
        width: 40
    },
    arrow : {
        width: 12,
        height: 8,
        opacity: .3
    },
    arrowContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20
    },
    descriptionContainer: {
        flex: 1,
        marginBottom: 20
    }
}
