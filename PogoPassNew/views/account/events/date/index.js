import React from 'react';
import {View, Text, ScrollView} from 'react-native';
import DatePicker from 'react-native-datepicker';
import DateEventCard from './date-event-card';

export default class Date extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			date:"11/14/2018"
		}
	}

	render() {
    	return (
            <View style={STYLES.container}>
				<View style={STYLES.dateContainer}>
					<DatePicker
					  style={STYLES.datePickerContainer}
					  date={this.state.date}
					  mode="date"
					  placeholder="select date"
					  format="MM/DD/YYYY"
					  minDate="2018-11-01"
					  maxDate="2018-12-01"
					  confirmBtnText="Confirm"
					  cancelBtnText="Cancel"
					  customStyles={{
						dateIcon: {
						  position: 'absolute',
						  left: 0,
						  top: 4,
						  marginLeft: 0
						},
						dateInput: {
						  marginLeft: 36
						}
					  }}
					  onDateChange={(date) => {this.setState({date: date})}}
					/>
				</View>

				<ScrollView>
					<DateEventCard/>
					<DateEventCard/>
					<DateEventCard/>
					<DateEventCard/>
					<DateEventCard/>
				</ScrollView>
			</View>

        );
    }
}

const STYLES = {
	container: {
		alignItems: 'center'
	},
	dateContainer: {
		backgroundColor: 'white',
		borderRadius: 10,
		paddingVertical: 20,
		paddingHorizontal: 30,
		justifyContent: 'center',
		alignItems: 'center',
		opacity: .9,
		marginBottom: 20
	}
}
