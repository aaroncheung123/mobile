 

import React from 'react';
import {View, Text, TouchableOpacity, Animated, Switch, ScrollView, TextInput} from 'react-native';
import {EliteWorksOrange, AccountContentGrey, AccountMenuGrey, Blueberry, AppleCore} from '../assets/styles/constants';

export default class WorkOrderSpringContent extends React.Component {

	constructor(props)
	{
		super(props);

		this.state = {

		}
	}

	render() {
		return (

			<View>
				<View style={STYLES.toggleContainer}>
					<Text style={STYLES.toggleText}>Stop Driving</Text>
					<Switch
						onTintColor = '#F7882F'
						thumbTintColor = 'white'
						style = {STYLES.switchStyle}
						/*onValueChange = {this.toggleDriving}
						value = {this.state.drivingSwitch}*//>

					<Text style={STYLES.toggleText}>Start Driving</Text>
				</View>

				<View style={STYLES.toggleContainer}>
					<Text style={STYLES.toggleText}>Stop Job</Text>
					<Switch
						onTintColor = '#F7882F'
						thumbTintColor = 'white'
						style = {STYLES.switchStyle}
						/*onValueChange = {this.toggleJob}
						value = {this.state.jobSwitch}*//>

					<Text style={STYLES.toggleText}>Start Job</Text>
				</View>

				<View style={STYLES.outsidePhotoContainer}>
					<Text style={STYLES.toggleText}>Before Photos</Text>
					<View style={STYLES.photoRow}>
						<View style={STYLES.photoContainer}></View>
						<View style={STYLES.photoContainer}></View>
						<View style={STYLES.photoContainer}></View>
					</View>
					<Text style={STYLES.toggleText}>After Photos</Text>
					<View style={STYLES.photoRow}>
						<View style={STYLES.photoContainer}></View>
						<View style={STYLES.photoContainer}></View>
						<View style={STYLES.photoContainer}></View>
					</View>
				</View>

				<View style={STYLES.notesContainer}>
					<TextInput
						style={STYLES.textInputStyle1}
						placeholder = "Enter notes here"
						underlineColorAndroid = "transparent"/>
				</View>
				<TouchableOpacity
					style={STYLES.saveNotes}
					onPress={this.handleSpringPanel}>
					<Text style={STYLES.toggleText}>Save</Text>
				</TouchableOpacity>
			</View>
		)
	}
}

				

const STYLES = {

    toggleContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 10
    },
    toggleText: {
        color: 'white',
        fontSize: 16
    },
    switchStyle: {
        marginHorizontal: 10,
    },
    notesContainer: {
        width: 300,
        height: 300,
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 10,
        marginTop: 30
    },
    saveNotes: {
        backgroundColor: EliteWorksOrange,
        padding: 15,
        margin: 10,
        borderRadius: 5,
        alignSelf: 'flex-end'
    },
    photoContainer: {
        height: 80,
        width: 60,
        borderRadius: 5,
        backgroundColor: 'white',
        margin: 15
    },
    photoRow: {
        flexDirection: 'row'
    },
    outsidePhotoContainer: {
        marginVertical: 20
    }
}