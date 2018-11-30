import React from 'react';
import {View, Text, Animated, ScrollView, Dimensions, Platform} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

export default class SpringPanel extends React.Component {

	constructor(props){
		super(props);
		this.state = {
			open: false
		}
		this.springValue = new Animated.Value(0);
		this.screenHeight = Dimensions.get('window').height;
		this.open = this.open.bind(this);
		this.handleClose = this.handleClose.bind(this);
	}

	open() {
		this.setState({open: true}, () => {
			Animated.spring(
				this.springValue,
				{
					toValue: this.screenHeight - 80,
					friction: 6
				}
			).start()
		})
	}

	handleClose() {
		Animated.timing(
			this.springValue,
			{
				toValue: 0,
				duration: 400
			}
		).start()

		setTimeout(() => {
			this.props.onClose();
		}, 400)
	}

	render() {

		if (!this.state.open) return null;

		return (
			<Animated.View style={{...STYLES.springContainer, height: this.springValue}}>
				<Icon name='times' size= {20} style={STYLES.icon} onPress={this.handleClose}/>
				<View style={STYLES.innerSpringContainer}>
					<View style={STYLES.titleContainer}>
						<Text style={STYLES.springContainerText}>{this.props.title}</Text>
					</View>


					<ScrollView style={STYLES.scrollViewContainer}>
						{this.props.content}
					</ScrollView>
				</View>
			</Animated.View>
		);
	}
}


const STYLES = {
	springContainer: {
		position: 'absolute',
		bottom: 0,
		width: '100%',
		borderTopLeftRadius: 20,
		borderTopRightRadius: 20,
		justifyContent: 'flex-start',
		alignItems: 'center',
		backgroundColor: 'black',
		opacity: .85,
		overflow: 'hidden',
	},
	scrollViewContainer: {
		width: '100%'
	},
    titleContainer: {
        height: 100,
        width: '70%',
        justifyContent: 'center',
        alignItems: 'center',
        //marginTop: Platform.OS === 'ios' ? 30 : 60,
    },
	springContainerText: {
		color: 'white',
		fontSize: 18,
		borderBottomWidth: 2,
		marginBottom: 20,
		padding: 20,
		borderColor: 'white',
	},
	toggleText: {
		color: 'white',
		fontSize: 16
	},
	innerSpringContainer: {
		margin: 10,
		justifyContent: 'flex-start',
		alignItems: 'center',
		width: '100%',
	},
	icon: {
		color: 'white',
		position: 'absolute',
		right: 0,
		top: 0,
		padding: 15
	}
}
