import React from 'react';
import {View, Text, ScrollView} from 'react-native';
import UpcomingEventCard from './upcoming-event-card';
import RegisterModal from './register-modal';

export default class EventPanel extends React.Component {

    constructor(props)
    {
        super(props)
        this.state = {
        }
        this.handleShowRegisterEvent = this.handleShowRegisterEvent.bind(this);
    }

    handleShowRegisterEvent(availability) {
        this.props.onShowSidePanel(
            'Register',
            <RegisterModal accounts={this.props.accounts} availability={availability}/>
        );
    }

    render() {
        let now = new Date();
        let upcomingEvents = this.props.venue.events.filter(x => GlobalUtil.convertMysqlToDateRaw(x.start) > now).sort((a, b) => {
            return GlobalUtil.convertMysqlToDateRaw(a.start) > GlobalUtil.convertMysqlToDateRaw(b.start);
        });
        let eventCards = upcomingEvents.map(event =>
            <UpcomingEventCard key={event.event_id} event={event} onRegister={this.handleShowRegisterEvent}/>)

        return (
            <ScrollView style={STYLES.scrollViewContainer}>
                <View style={STYLES.container}>
                    {eventCards}
                </View>

            </ScrollView>
        );
    }
}

const STYLES = {
    container: {
        width: '100%',
        marginBottom: 60,
        justifyContent: 'center',
        alignItems: 'center'
    },
    scrollViewContainer: {
        width: '100%'
    }
}
