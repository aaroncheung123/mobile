import React from 'react';
import {View, Text, TouchableOpacity, ScrollView, WebView, Dimensions} from 'react-native';
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
                <View style={STYLES.container}>
                    <WebView
                        source = {{ uri: this.props.loginLink + '&url=https://www.pogopass.com/user/account/subscriptions#user-subscription' }}
                    />
                </View>



            </View>
        );
    }
}

const STYLES = {
    container: {
         height: Dimensions.get('window').height,
    },
    filler: {
        marginBottom: 150
    }
}


// <ScrollView>
//     <View style={STYLES.filler}>
//         {subscriptionCard}
//     </View>
// </ScrollView>
