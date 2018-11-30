import React from 'react';
import {View, Text, TouchableOpacity, Animated, Button, Image, Dimensions, ScrollView} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import UpcomingEventCard from './upcoming-event-card';
import EventPanel from './event-panel';

export default class VenueEventCard extends React.Component {

    constructor(props){
        super(props);

        this.icons = {
            'down'  : require('../../../../assets/images/icons/down_arrow.png')
        };

        this.state = {
            title       : props.title,
        };
        this.handleCardPress = this.handleCardPress.bind(this);
    }

    handleCardPress(){
        this.props.onShowSpringPanel(
            this.props.venue.name,
            <EventPanel venue={this.props.venue} accounts={this.props.accounts} onShowSidePanel={this.props.onShowSidePanel}/>
        )
    }


    render(){
        let icon = this.icons['down'];

        let logoUrl = 'https://www.pogopass.com/global/assets/images/unavailable.png';
        if (this.props.venue.logo_site_file) {
            if (GlobalUtil.inputToBool(this.props.venue.logo_site_file.images_resized)) logoUrl = this.props.venue.logo_site_file.image_urls.s100;
            else logoUrl = this.props.venue.logo_site_file.image_urls.url;
        }
        return(

            <View style={STYLES.outsideContainer}>

                <TouchableOpacity onPress={this.handleCardPress}>
                    <View style={STYLES.venueContainer}>
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



            </View>
        );
    }
}

const STYLES = {
    outsideContainer: {
        marginBottom: 20,
        backgroundColor: 'transparent',
        overflow: 'hidden',
        width: Dimensions.get('window').width
    },
    venueContainer: {
        flexDirection: 'row',
        height: 90,
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
        textAlign: 'center',
        marginTop: 10
    },
    buttonImage : {
        width: 12,
        height: 8,
        opacity: .3,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10
    }
}
