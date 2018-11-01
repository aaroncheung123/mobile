import React from 'react';
import {View, Text, TouchableOpacity, Animated, Button} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

export default class VenueEventCard extends React.Component {

    constructor(props){
      super(props);

      this.icons = {
          'up'    : require('../../assets/images/icons/up_arrow.png'),
          'down'  : require('../../assets/images/icons/down_arrow.png')
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
            maxHeight   : event.nativeEvent.layout.height
        });
    }

    _setMinHeight(event){
        this.setState({
            minHeight   : event.nativeEvent.layout.height
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
        return(

            <Animated.View style={[STYLES.outsideContainer,{height: this.state.animation}]}>

                <TouchableOpacity onPress={this.toggle.bind(this)}>
                    <View style={STYLES.venueContainer}>
                        <View style={STYLES.leftVenueContainer}>
                            <Icon name='slideshare' size= {45}/>
                        </View>
                        <View style={STYLES.rightVenueContainer}>
                            <Text style={STYLES.textStyle}>Enchanted Island</Text>
                        </View>
                    </View>
                </TouchableOpacity>


                <View style={STYLES.hiddenBody} onLayout={this._setMaxHeight.bind(this)}>
                    <Text>Placed At: 03/06/2018 12:10 PM</Text>
                    <Text>Order # c6f12e6935</Text>
                </View>

            </Animated.View>



        );
    }
}

const STYLES = {
    outsideContainer: {
        flexDirection: 'column',
        flex: 1,
        backgroundColor: 'transparent'
    },
    hiddenBody: {
        backgroundColor: 'white',
        opacity: .9,
        marginLeft: 25,
        marginTop: 2,
        padding: 20
    },
    venueContainer: {
        flexDirection: 'row',
        height: 120,
        width: 300,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: 'rgba(0,0,0, .4)', // IOS
        shadowOffset: { height: 1, width: 1 }, // IOS
        shadowOpacity: 1, // IOS
        shadowRadius: 1, //IOS
        elevation: 5, // Android
        margin: 10,
        opacity: .9
    },
    leftVenueContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fcfcfc',
        height: '100%',
        borderTopLeftRadius: 10,
        borderBottomLeftRadius: 10,
    },
    rightVenueContainer: {
        flex: 2,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#e0e0e0',
        height: '100%',
        borderTopRightRadius: 10,
        borderBottomRightRadius: 10
    },
    textStyle: {
        fontSize: 14
    }
}
