import React from 'react';
import {View, Text, TouchableOpacity, Animated, Button, Image} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import UpcomingEventCard from './upcoming-event-card';

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
            maxHeight   : event.nativeEvent.layout.height + 10
        });
    }

    _setMinHeight(event){
        this.setState({
            minHeight   : event.nativeEvent.layout.height + 10
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

            <Animated.View style={[STYLES.outsideContainer,{height: this.state.animation}]}>

                <TouchableOpacity onPress={this.toggle.bind(this)}>
                    <View style={STYLES.venueContainer} onLayout={this._setMinHeight.bind(this)}>
                        <View style={STYLES.leftVenueContainer}>
                            <Icon name='slideshare' size= {45}/>
                        </View>
                        <View style={STYLES.rightVenueContainer}>
                            <Text style={STYLES.textStyle}>Enchanted Island</Text>
                            <Image
                              style={STYLES.buttonImage}
                              source={icon}>
                            </Image>
                        </View>
                    </View>
                </TouchableOpacity>


                <View style={STYLES.hiddenBody} onLayout={this._setMaxHeight.bind(this)}>
                    <Text style={STYLES.upcomingEventsText}>Upcoming Events: </Text>
                    <UpcomingEventCard/>
                    <UpcomingEventCard/>
                    <UpcomingEventCard/>
                    <UpcomingEventCard/>
                </View>

            </Animated.View>



        );
    }
}

const STYLES = {
    outsideContainer: {
        flex: 1,
        marginBottom: 20,
        backgroundColor: 'transparent'
    },
    hiddenBody: {
        width: '90%',
        backgroundColor: 'white',
        opacity: .9,
        marginTop: 2,
        marginLeft: 23,
        padding: 20,
        borderRadius: 10
    },
    upcomingEventsText: {
        paddingTop: 10,
        paddingBottom: 20,
        borderBottomWidth: 2,
        borderColor: '#bfbfbf',
        marginBottom: 20
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
        opacity: .9,
        marginTop: 5
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
        fontSize: 14,
        fontWeight: 'bold',
        textAlign: 'center'
    },
    buttonImage : {
        width: 12,
        height: 8,
        opacity: .3,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 15
    },
}
