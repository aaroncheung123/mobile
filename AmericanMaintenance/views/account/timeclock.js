
import React from 'react';
import {StyleSheet, View, TextInput, Switch, Image, Keyboard, TouchableWithoutFeedback, Text, Animated, TouchableHighlight, ScrollView, Platform} from 'react-native';
import SelectPicker from 'react-native-picker-select';
import {Button} from 'react-native-elements';
import {EliteWorksOrange, AccountContentGrey, AccountMenuGrey, Blueberry} from '../../assets/styles/constants';

export default class TimeClock extends React.Component {

	constructor(props) {
		super(props);

		let startOfWeek = new Date().getStartOfWeek();
		let endOfWeek = new Date().getEndOfWeek();

		let historyOption = {
			start: startOfWeek,
			end: endOfWeek,
			label: `${startOfWeek.formatDate('n/d/Y')} - ${endOfWeek.formatDate('n/d/Y')}`,
			value: `${startOfWeek.formatDate('n/d/Y')} - ${endOfWeek.formatDate('n/d/Y')}`
		}

		this.state = {
			currentTime: '',
			timeClocksThisWeek: [],
			weekClockedInLoading: true,
			weekClockedInHours: 0,
			weekClockedInMinutes: 0,

			historyWeekDropdownData: [historyOption],
			historyWeekDropdownSelected: historyOption,
			historyTimeClocks: [],
			clockIn: false
		}
	}

	componentDidMount() {
		this.updateTime();
		this.populateData();
	}

	updateTime = () => {
		let date = new Date();
		this.setState({currentTime: date.formatDate('H:m A')})

		this.updateThisWeekTime();

		this.timeUpdater = setTimeout(this.updateTime, 5000)
	}


	updateThisWeekTime = () => {
		let totalTime = 0;
		this.state.timeClocksThisWeek.forEach((time_clock) =>{
			if (GlobalUtil.isEmpty(time_clock.end)) return;
			let startDate = GlobalUtil.convertMysqlToDate(time_clock.start);
			let endDate = GlobalUtil.convertMysqlToDate(time_clock.end);
			totalTime += endDate - startDate;
		});

		if (this.state.clockedInStatus === 'IN')
		{
			let startDate = GlobalUtil.convertMysqlToDate(this.state.clockedInTimeClock.start);
			let endDate = new Date();
			totalTime += endDate - startDate;
		}

		let minutesClockedIn = totalTime / 1000 / 60;
		let hoursClockedIn = Math.floor(minutesClockedIn / 60);
		let leftoverMinutesClockedIn = minutesClockedIn - (60 * hoursClockedIn);

		this.setState({weekClockedInHours: hoursClockedIn, weekClockedInMinutes: Math.floor(leftoverMinutesClockedIn), weekClockedInLoading: false})
	}

	componentWillUnmount() {
		if (this.timeUpdater) clearTimeout(this.timeUpdater)
	}

	populateData = () => {
		EliteAPI.CRM.TimeClock.status({}, (success) => {
			this.setState({clockedInStatus: success.data.status, clockedInTimeClock: success.data.time_clock}, () => {
				this.state.clockedInStatus === 'IN' ? this.setState({clockIn: true}) : this.setState({clockIn: false})
			})
		}, failure => {
			alert(failure.error_message)
		});

		// get all time clocks in the last week
		let start = new Date().getStartOfWeek();
		Service.User.get((user) => {
			EliteAPI.CRM.TimeClock.search({user_id: user.id, take: 1000, start_start: GlobalUtil.convertDateToMysql(start)}, (success) => {

				this.setState({timeClocksThisWeek: success.data.time_clocks}, () => {
					this.updateThisWeekTime();
				})

			}, failure => {
				alert(failure.error_message)
			})


			EliteAPI.CRM.TimeClock.search({take: 1, sort_columns: 'start ASC', user_id: user.id}, (success) => {
				if (success.data.time_clocks.length > 0)
				{
					let firstStart = GlobalUtil.convertMysqlToDate(success.data.time_clocks[0].start);

					// collect all the date ranges
					let dateRanges = [];

					let startOfWeek = new Date().getStartOfWeek();
					let endOfWeek = new Date().getEndOfWeek();

					dateRanges.push({
						start: startOfWeek,
						end: endOfWeek,
						value: `${startOfWeek.formatDate('n/d/Y')} - ${endOfWeek.formatDate('n/d/Y')}`,
						label: `${startOfWeek.formatDate('n/d/Y')} - ${endOfWeek.formatDate('n/d/Y')}`
					})


					while(startOfWeek > firstStart)
					{
						startOfWeek = new Date(startOfWeek);
						endOfWeek = new Date(endOfWeek);

						startOfWeek.setDate(startOfWeek.getDate() - 7);
						endOfWeek.setDate(endOfWeek.getDate() - 7);

						dateRanges.push({
							start: startOfWeek,
							end: endOfWeek,
							value: `${startOfWeek.formatDate('n/d/Y')} - ${endOfWeek.formatDate('n/d/Y')}`,
							label: `${startOfWeek.formatDate('n/d/Y')} - ${endOfWeek.formatDate('n/d/Y')}`
						})
					}

					this.setState({historyWeekDropdownData: dateRanges});

				}
			});


			let historyStart = GlobalUtil.convertDateToMysql(this.state.historyWeekDropdownSelected.start);
			let historyEnd = GlobalUtil.convertDateToMysql(this.state.historyWeekDropdownSelected.end);

			EliteAPI.CRM.TimeClock.search({take: 1000, start_start: historyStart, start_end: historyEnd, user_id: user.id}, (success) => {
				this.setState({historyTimeClocks: success.data.time_clocks});
			});
		})
	}

	handleClockIn = () => {
		if (this.state.loadingClockIn) return;
		this.setState({loadingClockIn: true}, () => {
			EliteAPI.CRM.TimeClock.in({}, (success) => {
				this.populateData();
				this.setState({loadingClockIn: false})
			}, (failure) => {
				this.setState({loadingClockIn: false})
				alert(failure.error_message);
			})
		});
	}

	handleClockOut = () => {
		if (this.state.loadingClockOut) return;
		this.setState({loadingClockOut: true}, () => {
			EliteAPI.CRM.TimeClock.out({}, (success) => {
				this.populateData();
				this.setState({loadingClockOut: false})
			}, () => {
				this.setState({loadingClockOut: false})
				alert(failure.error_message);
			})
		})
	}

	toggleClockInStatus = (value) => {
			if(value){
				this.handleClockIn();
			}
			else{
				this.handleClockOut();
			}
			this.setState({clockIn: value});
	}

	render() {

		let ClockedStatusMessage = (this.state.clockedInStatus === 'IN') ?
			'CLOCKED IN - ' + GlobalUtil.convertMysqlToDate(this.state.clockedInTimeClock.start).formatDate('H:m A') :
			'CLOCKED OUT'

		return (
			<View style={PANEL.tester}>

				<View style={PANEL.toggleContainer}>
						<Text style={PANEL.toggleText}>Clock Out</Text>
						<Switch
								trackColor = '#F7882F'
								_thumbColor = 'white'
								style = {PANEL.switchStyle}
								onValueChange = {this.toggleClockInStatus}
								value = {this.state.clockIn}/>

							<Text style={PANEL.toggleText}>Clock In</Text>
				</View>




				<ScrollView>
					<View style={PANEL.filler}>
						<View style={PANEL.container}>


							<View style={PANEL.sectionContainer}>
									<View style={PANEL.innerContainer}>
										<Text style={PANEL.headerText}>Current Time:</Text>
									</View>
									<View style={PANEL.innerContainer1}>
										<Text style={PANEL.headerText}>{this.state.currentTime}</Text>
									</View>
							</View>

							<View style={PANEL.sectionContainer}>
								<View style={PANEL.innerContainer}>
									<Text style={PANEL.headerText}>Week Total:</Text>
								</View>
								<View style={PANEL.innerContainer1}>
									<Text style={PANEL.headerText}>{`${this.state.weekClockedInHours} Hours - ${this.state.weekClockedInMinutes} Minutes`}</Text>
								</View>
							</View>

							<View style={PANEL.sectionContainer}>
									<View style={PANEL.innerContainer}>
										<Text style={PANEL.headerText}>Status:</Text>
									</View>
									<View style={PANEL.innerContainer1}>
										<Text style={PANEL.headerText}>{ClockedStatusMessage}</Text>
									</View>
							</View>


						</View>

						<View style={PANEL.container}>
							<Text style={PANEL.headerHistoryText}>History</Text>

							<View style={PANEL.historySelectPickerContainer}>
								<SelectPicker
									placeholder={{}}
									style={PANEL.historySelectPicker}
									label='Week'
									value={this.state.historyWeekDropdownSelected.value}
									items={this.state.historyWeekDropdownData}
									hideDoneBar={true}
									hideIcon={true}
									onValueChange={(value, index) => {this.setState({historyWeekDropdownSelected: this.state.historyWeekDropdownData[index]}, this.populateData)}}
								/>
							</View>




							<View style={PANEL.historyTableContainer}>
								{ this.state.historyTimeClocks.map( (timeClock) => <TimeClockHistoryRow key={timeClock.time_clock_id} timeClock={timeClock}/> ) }
							</View>
						</View>
					</View>
				</ScrollView>






			</View>



		)
	}

}


const TimeClockHistoryRow = (props) => {

	if (GlobalUtil.isEmpty(props.timeClock.end)) return null;

	let startDate = GlobalUtil.convertMysqlToDate(props.timeClock.start);
	let endDate = GlobalUtil.convertMysqlToDate(props.timeClock.end);

	let totalHours = ((endDate - startDate) / 1000 / 60 / 60).toFixed(2);

	return (
		<View style={TIME_CLOCK_HISTORY_ROW.container}>
			<TimeClockRowCell value={startDate.formatDate('n/d')} header={'Date'} showBorder={true} width="20%"/>
			<TimeClockRowCell value={startDate.formatDate('H:m A')} header={'In'} showBorder={true} width="30%"/>
			<TimeClockRowCell value={endDate.formatDate('H:m A')} header={'Out'} showBorder={true} width="30%"/>
			<TimeClockRowCell value={totalHours} header={'Hours'} showBorder={false} width="20%"/>
		</View>
	)
}

const TimeClockRowCell = (props) => {
	let containerStyle = {width: props.width}
	if (props.showBorder)
	{
		containerStyle.borderRightColor = '#eeeeee';
		containerStyle.borderRightWidth = 2;
	}
	return (

		<View style={TIME_CLOCK_HISTORY_ROW.containerStyle}>
			<Text style={TIME_CLOCK_HISTORY_ROW.cellHeaderText}>{props.header}</Text>
			<Text style={TIME_CLOCK_HISTORY_ROW.cellValue}>{props.value}</Text>
		</View>
	)
}

const TIME_CLOCK_HISTORY_ROW = {
	containerStyle: {
		marginRight: 5
	},
	cellHeaderText: {
		color: 'black',
		width: '100%',
		textAlign: 'left'
	},
	cellValue: {
		color: 'black',
		width: '100%',
		textAlign: 'left',
		fontSize: 16,
	},

	container: {
		padding: 10,
		margin: 5,
		backgroundColor: 'white',
		width: '100%',
		borderRadius: 5,
		flexDirection: 'row',
		justifyContent: 'space-evenly'
	}
}

const PANEL = {
	container: {
		backgroundColor: Blueberry,
		borderRadius: 10,
		alignItems: 'flex-start',
		margin: 10,
		padding: 25
	},
	sectionContainer: {
		flexDirection: 'row',
	},
	innerContainer: {
		flex: 2
	},
	innerContainer1: {
		flex: 3
	},
	toggleContainer: {
			flexDirection: 'row',
			justifyContent: 'center',
			alignItems: 'center',
			marginVertical: 30
	},
	toggleText: {
			color: 'black',
			fontSize: 16
	},
	switchStyle: {
			marginHorizontal: 10,
	},
	filler: {
		marginBottom: 200
	},
	headerText: {
		color: 'white',
		fontSize: 16,
	},
	headerHistoryText: {
		color: 'white',
		fontSize: 16,
		borderColor: 'white',
		width: '50%',
		marginBottom: 10
	},
	timeText: {
		marginBottom: 15,
		color: 'white',
		fontSize: 12
	},
	statusText: {
		marginBottom: 15,
		fontSize: 25
	},
	clockInButtonContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		marginBottom: 15
	},
	clockInButton: {
		height: 50,
		borderRadius: 15,
		width: 125
	},
	historySelectPickerContainer: {
		padding: Platform.OS === 'ios'? 15 : 0,
		borderWidth: 1,
		borderColor: 'white',
		borderRadius: 5,
		width: '100%',
		marginHorizontal: 5,
		marginBottom: 10
	},
	historySelectPicker: {
		inputAndroid: {
			color: 'white',
			borderColor: 'white'
		},
		inputIOS: {
			color: 'white',
			borderColor: 'white'
    },
	}
}







// <View style={PANEL.container}>
// 	<Text style={PANEL.headerText}>Clock-In Status</Text>
// 	{
// 		this.state.clockedInStatus ?
// 		<Text style={{...PANEL.statusText, color: ((this.state.clockedInStatus === 'IN') ? 'green' : '#222222')}}>{ClockedStatusMessage}</Text> : null
// 	}
// 	<View style={PANEL.clockInButtonContainer}>
// 		<Button
// 			onPress={this.handleClockIn}
// 			title="Clock In"
// 			color="white"
// 			accessibilityLabel="Clock In"
// 			disabled={!this.state.clockedInStatus || this.state.clockedInStatus === 'IN'}
// 			buttonStyle={{...PANEL.clockInButton, backgroundColor: 'green'}}
// 			loading={this.state.loadingClockIn}
// 		/>
// 		<Button
// 			onPress={this.handleClockOut}
// 			title="Clock Out"
// 			color="white"
// 			accessibilityLabel="Clock Out"
// 			disabled={!this.state.clockedInStatus || this.state.clockedInStatus === 'OUT'}
// 			buttonStyle={{...PANEL.clockInButton, backgroundColor: '#cc4444'}}
// 			loading={this.state.loadingClockOut}
// 		/>
// 	</View>
// </View>
