import React from 'react';
import {View, Text, Animated, ScrollView, Dimensions} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {EliteWorksOrange, AccountContentGrey, AccountMenuGrey, Blueberry, AppleCore} from '../assets/styles/constants';

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
	                toValue: this.screenHeight - 160,
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
	}

    render() {

    	if (!this.state.open) return null;

        return (
	        <Animated.View style={{...STYLES.springContainer, height: this.springValue}}>
	            <Icon name='times' size= {35} style={STYLES.iconX} onPress={this.handleClose}/>
	            <View style={STYLES.innerSpringContainer}>
	                <Text style={STYLES.springContainerText}>{this.props.title}</Text>
	                <ScrollView>
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
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Blueberry,
        opacity: .9,
        overflow: 'hidden'
    },
    springContainerText: {
        color: 'white',
        fontSize: 24,
        fontWeight: 'bold',
        borderBottomWidth: 2,
        marginBottom: 20,
        paddingBottom: 20,
        borderColor: 'white',
    },
    toggleText: {
        color: 'white',
        fontSize: 16
    },
    innerSpringContainer: {
        flex: 1,
        margin: 20,
        justifyContent: 'flex-start',
        alignItems: 'center'
    },
    iconX: {
        color: 'white',
        position: 'absolute',
        right: 0,
        top: 0,
        margin: 15
    }
}
