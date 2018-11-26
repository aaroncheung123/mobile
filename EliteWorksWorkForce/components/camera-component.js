import React from 'react';
import {View, Text, TouchableOpacity, Dimensions} from 'react-native';
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
        this.handleSnap = this.handleSnap.bind(this);
    }

    async componentWillMount(){
        const{ status } = await Permissions.askAsync(Permissions.CAMERA);
        this.setState({hasCameraPermission: status == 'granted'})
    }

    async handleSnap(){
        console.log("handleSnap");
        if (this.camera) {
            let photo = await this.camera.takePictureAsync();
            console.log('photo', photo);
        }
    }

    render() {
        const {hasCameraPermission} = this.state
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
                        <TouchableOpacity
                            onPress={this.handleSnap}
                            style={STYLES.cameraButton}>
                        </TouchableOpacity>
                        <View style={STYLES.footerContainer}>
                            <Icon name='photo' size={30} color='white'/>
                        </View>

                    </Camera>

                </View>
            )
        }
    }
}

const STYLES = {
    container: {
        backgroundColor: 'white'
    },
    cameraContainer: {
        height: Dimensions.get('window').height - 250,
				width: Dimensions.get('window').width - 40
    },
    headerContainer: {
        position: 'absolute',
        backgroundColor: 'transparent',
        left: 0,
        top: 0,
        right: 0,
        zIndex: 100
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
        marginBottom: 30
    }
}
