import React from 'react';
import {View, Text, TouchableOpacity, Animated, Button, Image, Dimensions, ScrollView} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import UpcomingEventCard from './upcoming-event-card';

export default class VenueEventCard extends React.Component {

    constructor(props){
      super(props);

      this.icons = {
          'up'    : require('../../../../assets/images/icons/up_arrow.png'),
          'down'  : require('../../../../assets/images/icons/down_arrow.png')
      };

      this.state = {
        title       : props.title,
        expanded    : false,
        };
    }
    componentDidMount(){
        this.setState({
            minHeight   : 90,
            animation   : new Animated.Value(90)
        });
    }

    setMaxHeight(event){
        this.setState({
            maxHeight   :  400
        });
    }

    setMinHeight(event){
        this.setState({
            minHeight   : 90
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
        let icon = this.icons['down'];

        if(this.state.expanded){
            icon = this.icons['up'];
        }


        let logoUrl = 'https://www.pogopass.com/global/assets/images/unavailable.png';
        if (this.props.venue.logo_site_file) {
            if (GlobalUtil.inputToBool(this.props.venue.logo_site_file.images_resized)) logoUrl = this.props.venue.logo_site_file.image_urls.s100;
            else logoUrl = this.props.venue.logo_site_file.image_urls.url;
        }


        let now = new Date();
        let upcomingEvents = this.props.venue.events.filter(x => GlobalUtil.convertMysqlToDateRaw(x.start) > now).sort((a, b) => {
            return GlobalUtil.convertMysqlToDateRaw(a.start) > GlobalUtil.convertMysqlToDateRaw(b.start);
        });


        let eventCards = upcomingEvents.map(event => <UpcomingEventCard key={event.event_id} event={event} onRegister={this.props.onRegister}/>)


        return(

            <Animated.View style={[STYLES.outsideContainer,{height: this.state.animation}]}>

                <TouchableOpacity onPress={this.toggle.bind(this)}>
                    <View style={STYLES.venueContainer} onLayout={this.setMinHeight.bind(this)}>
                        <View style={STYLES.leftVenueContainer}>
                            <Image
                                style={{width: 50, height: 50}}
                                source={{uri: logoUrl}}
                            />
                        </View>
                        <View style={STYLES.rightVenueContainer}>
                            <Text style={STYLES.textStyle}>{this.props.venue.name}</Text>

                            <Image
                              style={STYLES.buttonImage}
                              source={icon}>
                            </Image>
                        </View>
                    </View>
                </TouchableOpacity>


                <View style={STYLES.hiddenBody} onLayout={this.setMaxHeight.bind(this)}>
                    <Text style={STYLES.upcomingEventsText}>Upcoming Events (scroll to see future events): </Text>
                    <ScrollView style={STYLES.eventScrollView}>
                        {eventCards}
                    </ScrollView>
                </View>

            </Animated.View>



        );
    }
}

const STYLES = {
    outsideContainer: {
        marginBottom: 20,
        backgroundColor: 'transparent',
        overflow: 'hidden',
        width: '100%'
    },
    hiddenBody: {
        width: '90%',
        backgroundColor: 'white',
        opacity: .9,
        marginTop: 2,
        marginLeft: 17,
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
        height: 80,
        width: '90%',
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
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
    eventScrollView: {
        height: 250
    }
}
