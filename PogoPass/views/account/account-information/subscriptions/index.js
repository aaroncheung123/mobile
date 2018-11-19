import React from 'react';
import {View, Text, TouchableOpacity, ScrollView} from 'react-native';
import TopMenu from '../top-menu';
import SubscriptionCard from './subscription-card';

export default class Subscriptions extends React.Component {

    constructor(props)
    {
        super(props);
        this.state = {
            subscriptions: []
        }
        this.updatePath = this.updatePath.bind(this);
    }

    componentDidMount(){
        Service.User.get(user => {
            EliteAPI.STR.Subscription.search({
                user_id: user.id,
                include_classes: 'account,shippingaddress,address,subscriptionrenewal'
            },
            success => {
                //console.log(success);
                console.log(success.data.models[0]);
                this.setState({subscriptions: success.data.models});
            },
            failure => {
                console.log(failure.error_message);
            })
        })
    }

    updatePath(path) {
        this.props.history.push(path);
    }

    render() {
        let subscriptionCard = this.state.subscriptions.map(subscription =>
            <SubscriptionCard key={subscription.subscription_id} subscription={subscription} />)

        return (
            <View>
                <TopMenu title= 'Subscriptions' onPress={() => this.updatePath('/account-main')}/>
                <ScrollView>
                    <View style={STYLES.filler}>
                        {subscriptionCard}
                    </View>
                </ScrollView>



            </View>
        );
    }
}

const STYLES = {
    filler: {
        marginBottom: 150
    }
}
