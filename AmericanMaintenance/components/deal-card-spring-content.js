import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {EliteWorksOrange, AccountContentGrey, AccountMenuGrey, Blueberry, AppleCore} from '../assets/styles/constants';
import WorkOrderCard from './work-order-card';
import AddWorkOrderForm from './add-work-order-form';

export default class DealCardSpringContent extends React.Component {

    constructor(props)
    {
        super(props)
        this.state = {
					workOrders: []
        }
				this.handleAddWorkOrder = this.handleAddWorkOrder.bind(this);
    }

	componentDidMount(){
		//console.log(this.props.workOrders);
		this.setState({
			workOrders: this.props.workOrders
		})
	}

	handleAddWorkOrder() {
			this.props.onShowSidePanel(
					"Add Work Order",
					<AddWorkOrderForm
						onComplete={this.props.onComplete}
						deal={this.props.deal}
						onShowSidePanel={this.props.onShowSidePanel}
						onWorkOrderAdd={this.handleWorkOrderAdd}/>
			)
	}

    render() {
		let workOrders = this.state.workOrders.map(workOrder =>
	        <WorkOrderCard
							onComplete={this.props.onComplete}
	            workOrder={workOrder}
	            key={workOrder.work_order_id}
							onShowCameraPanel={this.props.onShowCameraPanel}
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
		backgroundColor: EliteWorksOrange,
		padding: 15,
		margin: 10,
		marginBottom: 20,
		justifyContent: 'center',
		alignItems: 'center',
		width: '100%',
		alignSelf: 'center'
	},
}
