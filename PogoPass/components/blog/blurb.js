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
					expanded    : false
			};
	}

	componentDidMount(){
			this.setState({
					minHeight   : 80,
					animation   : new Animated.Value(80)
			});
	}

	toggle(){
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
					maxHeight   : event.nativeEvent.layout.height + 100
			});
	}

	_setMinHeight(event){
			this.setState({
					minHeight   : 80
			});
	}

	//The handling method of the event onNavigationChange
	onNavigationChange(event) {
		if (event.title) {
	    const htmlHeight = Number(event.title)
	    this.setState({Height:htmlHeight});
		}
  }

  render() {
		let icon = this.icons['up'];

		if(this.state.expanded){
				icon = this.icons['down'];
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

						<View style={STYLES.hiddenBody} onLayout={this._setMaxHeight.bind(this)}>
							<Text>Hello</Text>
							<WebView
								source={{html:this.props.post.content}}
								style={STYLES.webViewStyle}
								scrollEnabled={false}
								/>

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
    borderRadius: 10,
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
		height: 80,
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center'
	},
	hiddenBody: {
		flex: 1,
		padding: 30
  },
	webViewStyle: {
		height: 200,
		width: 200
	}
}
