import React from 'react';
import {View, Text, TouchableOpacity, Dimensions, Animated} from 'react-native';
import {Camera, Permissions} from 'expo';
import {Container, Content, Header, Item, Input, Button} from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome';


export default class CameraComponent extends React.Component {

    constructor(props)
    {
        super(props)
        this.state = {
            hasCameraPermission: null,
            type: Camera.Constants.Type.back
        }
				this.animatedValue = new Animated.Value(0)
        this.handleSnap = this.handleSnap.bind(this);
				this.animate = this.animate.bind(this);
    }


    async componentWillMount(){
        const{ status } = await Permissions.askAsync(Permissions.CAMERA);
        this.setState({hasCameraPermission: status == 'granted'})
    }


    async handleSnap(){
				//AUDIO
				const soundObject = new Expo.Audio.Sound();
				try {
				  await soundObject.loadAsync(require('../assets/audio/camera_shutter.mp3'));
				  await soundObject.playAsync();
				} catch (error) {
					console.log(error);
				}

				//VISUAL
				this.animate()

				//SERVER
        if (this.camera) {

						//LOADING SCREEN
						if(this.props.onSnapStart){
							this.props.onSnapStart()
						}
            let photo = await this.camera.takePictureAsync();
						let data = new FormData();
						data.append('file_upload', {
							uri: photo.uri,
							type: 'image/jpeg',
							name: 'CameraUpload'
						});
            data.append('private', 1);
            data.append('site_file_parent_id', -1);
            EliteAPI.CMS.SiteFile.add(data, (success) => {
               if (this.props.onSnap) this.props.onSnap(success.data.site_file);
            });
        }
    }

		animate () {
		  this.animatedValue.setValue(0)
		  Animated.timing(
		    this.animatedValue,
		    {
		      toValue: 1,
		      duration: 1500
		    }
		  ).start()
		}



    render() {

				let opacity = this.animatedValue.interpolate({
			    inputRange: [0, 0.05, .1],
			    outputRange: [0, .3, 0]
			  })

        let {hasCameraPermission} = this.state
        if(hasCameraPermission === null){
            return  <View/>
        }
        else if(hasCameraPermission === false){
            return <Text>No access to camera</Text>
        }
        else{
            return(
                <View style={STYLES.cameraContainer}>
                    <Camera ref = {e => this.camera = e} style={STYLES.cameraContainer} type={this.state.type}>
												<Animated.View style={{...STYLES.flashContainer, opacity}} />
                    </Camera>
										<TouchableOpacity
												onPress={this.handleSnap}
												style={STYLES.cameraButton}>
										</TouchableOpacity>
                </View>
            )
        }
    }
}

const STYLES = {
    container: {
        backgroundColor: 'white'
    },
		flashContainer: {
				position: 'absolute',
				top: 0,
				left: 0,
				height: Dimensions.get('window').height,
				width: Dimensions.get('window').width,
				backgroundColor: 'white'
		},
    cameraContainer: {
        height: Dimensions.get('window').height - 225,
				width: Dimensions.get('window').width,
				zIndex: 0
    },
    footerContainer: {
        position: 'absolute',
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 10,
        bottom: 0,
        right: 0
    },
    cameraButton: {
        position: 'absolute',
        bottom: 0,
        alignSelf: 'center',
        borderColor: 'white',
        backgroundColor: 'transparent',
        borderRadius: 50,
        borderWidth: 5,
        height: 50,
        width: 50,
        padding: 10,
        marginBottom: 30,
				zIndex: 1
    }
}
