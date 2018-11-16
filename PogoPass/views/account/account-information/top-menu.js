import React from 'react';
import {View, Text, TouchableWithoutFeedback} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

export default class TopMenu extends React.Component {

	constructor(props)
	{
		super(props);
		this.updatePath = this.updatePath.bind(this);
	}

	updatePath(path) {
			this.props.history.push(path);
			this.forceUpdate();
	}

	render() {
      return (
				<View style={STYLES.topMenu}>
						<TouchableWithoutFeedback onPress={this.props.onPress}>
							<View style={STYLES.touchableBack}>
								<Icon name='arrow-left' size= {25} color='white'/>
								<Text style={STYLES.textStyle}>{this.props.title}</Text>
							</View>
						</TouchableWithoutFeedback>
			  </View>




      );
		}
}


const STYLES = {
	topMenu: {
		flexDirection: 'row',
		justifyContent: 'flex-start',
		alignItems: 'center',
		width:'100%',
		backgroundColor: 'rgba(0, 0, 0, 0.6)',
		opacity: .95
	},
	touchableBack: {
		padding: 15,
		flexDirection: 'row'
	},
	textStyle: {
		fontSize: 20,
		color: 'white',
		marginLeft: 20
	},
}
