import React from 'react';
import {View, Text, ScrollView, WebView, Dimensions} from 'react-native';
import TopMenu from '../top-menu';
import OrderCard from './order-card';

export default class Orders extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            orders: []
        }
    }

    componentDidMount() {
        Service.User.get( user => {
            EliteAPI.STR.Order.search({take: 1000, user_id: user.id, include_classes: 'orderproduct'}, (success) => {
                this.setState({orders: success.data.models});
            })
        })
    }

    updatePath(path) {
        this.props.history.push(path);
    }


    render() {
        //let orderComponents = this.state.orders.map(order => <OrderCard key={order.order_id} order={order}/>)
        return (
            <View>
                <TopMenu title= 'Orders' onPress={() => this.updatePath('/account-main')}/>
                <WebView
                    source = {{ uri: this.props.loginLink + '&url=https://www.pogopass.com/user/account/orders#user-order' }}
                />
            </View>
        );
    }
}

const STYLES = {
    container: {
         height: Dimensions.get('window').height,
    },
    transparentFiller: {
        marginBottom: 200
    }
}

// <ScrollView>
//     <View style={STYLES.transparentFiller}>
//         {orderComponents}
//     </View>
// </ScrollView>
