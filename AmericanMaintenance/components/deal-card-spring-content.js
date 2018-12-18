import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import WorkOrderCard from './work-order-card';

export default class DealCardSpringContent extends React.Component {

    constructor(props)
    {
        super(props)
        this.state = {
			workOrders: []
        }
    }

	componentDidMount(){
		console.log('compo: ', this.props.workOrders);
		this.setState({
			workOrders: this.props.workOrders
		})
	}

    render() {
		let workOrders = this.state.workOrders.map(workOrder =>
	        <WorkOrderCard
				onComplete={this.props.onComplete}
	            workOrder={workOrder}
	            key={workOrder.work_order_id}
	            onShowSpringPanel={this.props.onShowSpringPanel}
	            onShowSidePanel={this.props.onShowSidePanel}/>)

        return (
            <View style={STYLES.hiddenBody}>
                <View style={STYLES.descriptionContainer}>
                    <Text style={STYLES.textStyle2}>Description:</Text>
                    <Text style={STYLES.textStyle3}>{GlobalUtil.htmlTextStripper(this.props.deal.description)}</Text>
                </View>

                <TouchableOpacity onPress={this.handleAddWorkOrder} style={STYLES.addButton}>
                    <Text style={STYLES.textStyle}>+ Work Order</Text>
                </TouchableOpacity>

                {
                    this.state.workOrders.length > 0 ?
                    <View>
                        <Text style={STYLES.textStyle2}>Work Orders</Text>
                        {workOrders}
                    </View> : null
                }
            </View>
        );
    }
}

const STYLES = {
	hiddenBody: {
		width: '100%',
		backgroundColor: 'white',
		padding: 20,
		marginBottom: 20
	},
	descriptionContainer: {
		marginBottom: 20
	},
	textStyle: {
		color: 'white'
	},
	textStyle2: {
		fontSize: 18,
		color: 'black'
	},
	textStyle3: {
		color: 'black'
	},
	addButton: {
		borderRadius: 5,
		backgroundColor: 'orange',
		padding: 10,
		margin: 10,
		marginBottom: 20,
		justifyContent: 'center',
		alignItems: 'center',
		width: '50%',
		alignSelf: 'center'
	},
}
