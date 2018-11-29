import React from 'react';
import {View, Text, ScrollView} from 'react-native';
import UpcomingEventCard from './upcoming-event-card';

export default class EventPanel extends React.Component {

    constructor(props)
    {
        super(props)
        this.state = {
        }
    }

    render() {
        let now = new Date();
        let upcomingEvents = this.props.venue.events.filter(x => GlobalUtil.convertMysqlToDateRaw(x.start) > now).sort((a, b) => {
            return GlobalUtil.convertMysqlToDateRaw(a.start) > GlobalUtil.convertMysqlToDateRaw(b.start);
        });
        let eventCards = upcomingEvents.map(event => <UpcomingEventCard key={event.event_id} event={event} onRegister={this.props.onRegister}/>)

        return (
            <ScrollView>
                <View style={STYLES.container}>
                    {eventCards}
                </View>

            </ScrollView>
        );
    }
}

const STYLES = {
    container: {
        marginBottom: 60
    }
}
