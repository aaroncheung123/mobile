import React from 'react';
import {AppRegistry,StyleSheet,Text,ScrollView, View,TouchableHighlight, Image, Animated} from 'react-native';

export default class Blurb extends React.Component {

	constructor(props){
			super(props);

			this.icons = {     //Step 2
					'up'    : require('../../assets/images/icons/up_arrow.png'),
					'down'  : require('../../assets/images/icons/down_arrow.png')
			};

			this.state = {       //Step 3
					title       : props.title,
					expanded    : true,
					animation   : new Animated.Value()
			};
	}

	toggle(){
			//Step 1
			let initialValue    = this.state.expanded? this.state.maxHeight + this.state.minHeight : this.state.minHeight,
					finalValue      = this.state.expanded? this.state.minHeight : this.state.maxHeight + this.state.minHeight;

			this.setState({
					expanded : !this.state.expanded  //Step 2
			});

			this.state.animation.setValue(initialValue);  //Step 3
			Animated.spring(     //Step 4
					this.state.animation,
					{
							toValue: finalValue
					}
			).start();  //Step 5
	}

	_setMaxHeight(event){
			this.setState({
					maxHeight   : event.nativeEvent.layout.height
			});
	}

	_setMinHeight(event){
			this.setState({
					minHeight   : event.nativeEvent.layout.height
			});
	}
  render() {
		let icon = this.icons['down'];

		if(this.state.expanded){
				icon = this.icons['up'];   //Step 4
		}

    return (
			<View style={STYLES.blurbSection}>
				<View style={STYLES.orangeTab}>
				</View>

				<View style={STYLES.textBox}>
					<Text style={STYLES.textStyle}> {this.props.post.name} </Text>
				</View>
			</View>


    );
  }
}



const STYLES = {
  blurbSection: {
		height: 85,
		minWidth: '80%',
    backgroundColor:'white',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor:'white',
    borderRadius: 20,
    opacity: 0.9,
		marginTop: 5
  },
  orangeTab: {
    height:'100%',
    flex: 1,
    backgroundColor: 'orange',
    borderTopLeftRadius: 20,
    borderBottomLeftRadius: 20
  },
  textBox:{
    flex:9,
    alignItems: 'center',
    justifyContent: 'center',
  },
	dateTextBox:{
    color:'white'
  },
  textStyle:{
    textAlign:'center',
    fontSize: 15
  }
}



    // <View stlye={STYLES.orangeTab}>
    //   <Text stlye={STYLES.textStyle}>Hi</Text>
    // </View>
//{this.props.}

// <Text style={STYLES.textStyle}>
// 	{posts}
// </Text>
