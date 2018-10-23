import React from 'react';
import {AppRegistry,StyleSheet,Text,ScrollView, View,TouchableHighlight, Image, Animated, WebView} from 'react-native';

export default class Blurb extends React.Component {

	constructor(props){
			super(props);

			this.icons = {
					'up'    : require('../../assets/images/icons/up_arrow.png'),
					'down'  : require('../../assets/images/icons/down_arrow.png')
			};

			this.state = {
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
					expanded : !this.state.expanded
			});

			this.state.animation.setValue(initialValue);
			Animated.spring(
					this.state.animation,
					{
							toValue: finalValue
					}
			).start();
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
				icon = this.icons['up'];
		}

    return (


			<TouchableHighlight
					style={STYLES.button}
					onPress={this.toggle.bind(this)}
					underlayColor= 'transparent'>
					<Animated.View style={[STYLES.blurbSection ,{height: this.state.animation}]}>
						<View style={STYLES.titleContainer} onLayout={this._setMinHeight.bind(this)}>
								<Text style={STYLES.textStyle}>
									{this.props.post.name}
								</Text>
								<Image
	                  style={STYLES.buttonImage}
	                  source={icon}>
								</Image>

						</View>

						<View style={STYLES.body} onLayout={this._setMaxHeight.bind(this)}>

							<Text> {this.props.post.content} </Text>
						</View>
					</Animated.View>
			</TouchableHighlight>





    );
  }
}



const STYLES = {
	container   : {
    backgroundColor: '#fff',
    margin:10,
    overflow:'hidden'
  },
  blurbSection: {
    backgroundColor:'white',
    borderRadius: 20,
    opacity: 0.9,
		marginTop: 5,
		borderLeftWidth: 40,
		borderColor: 'orange',
		overflow:'hidden'
  },
	dateTextBox:{
    color:'white'
  },
  textStyle:{
    textAlign:'center',
    fontSize: 18,
		padding: 30,
		overflow:'hidden'
  },
	buttonImage : {
		width: 12,
		height: 8,
		opacity: .3,
		marginRight: 30
	},
	button: {
		justifyContent: 'center'
	},
	titleContainer : {
			flexDirection: 'row',
			justifyContent: 'space-between',
			alignItems: 'center'
	},
	body: {
		padding: 30
  }
}



    // <View stlye={STYLES.orangeTab}>
    //   <Text stlye={STYLES.textStyle}>Hi</Text>
    // </View>
//{this.props.}

// <Text style={STYLES.textStyle}>
// 	{posts}
// </Text>

//{this.props.post.name}

// blurbSection: {
// 	minHeight: 85,
// 	minWidth: '80%',
// 	backgroundColor:'white',
// 	flexDirection: 'column',
// 	alignItems: 'center',
// 	justifyContent: 'center',
// 	backgroundColor:'white',
// 	borderRadius: 20,
// 	opacity: 0.9,
// 	marginTop: 5,
// 	borderLeftWidth: 40,
// 	borderColor: 'orange'
// },


//<Text> {this.props.post.content} </Text>
