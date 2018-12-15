import React from 'react';
import {View, Text, Animated, ScrollView, Dimensions, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

export default class SidePanel extends React.Component {

	constructor(props){
		super(props);
		this.state = {
			open: false
		}
		this.springValue = new Animated.Value(0);
		this.screenWidth = Dimensions.get('window').width;
		this.screenHeight= Dimensions.get('window').height - 160;
		this.open = this.open.bind(this);
		this.handleClose = this.handleClose.bind(this);
	}

	open() {
		this.setState({open: true}, () => {
			Animated.spring(
				this.springValue,
				{
					toValue: this.screenWidth,
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
			<Animated.View style={{...STYLES.springContainer, width: this.springValue, height: this.screenHeight}}>
				<TouchableOpacity style={STYLES.backArrowContainer} onPress={this.handleClose}>
					<Icon name='angle-left' size= {30} style={STYLES.backArrow}/>
				</TouchableOpacity>

				<View style={STYLES.innerSpringContainer}>
					<View style={STYLES.innerSpringContainer1}>
						<Text style={STYLES.springContainerText}>{this.props.title}</Text>
					</View>


					<View style={STYLES.contentContainer}>
						{this.props.content}
					</View>
				</View>
			</Animated.View>
		);
	}
}


const STYLES = {
	contentContainer: {
		flex: 1
	},
	springContainer: {
		position: 'absolute',
		bottom: 0,
		right: 0,
		borderTopLeftRadius: 10,
		borderTopRightRadius: 10,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: '#f4f4f4',
		overflow: 'hidden',
		width: '100%'
	},
	springContainerText: {
		color: 'black',
		fontWeight: 'bold',
		fontSize: 20,
		marginTop: 20,
		paddingHorizontal: 20
	},
	toggleText: {
		color: 'white',
		fontSize: 16
	},
	innerSpringContainer: {
		justifyContent: 'flex-start',
		alignItems: 'center',
	},
	innerSpringContainer1: {
		height: 70
	},
	backArrow: {
		color: 'black',
	},
	backArrowContainer: {
		position: 'absolute',
		left: 0,
		top: 0,
		padding: 20,
		zIndex: 1
	}
}
