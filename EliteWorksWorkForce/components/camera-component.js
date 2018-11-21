import React from 'react';
import {View, Text} from 'react-native';
import {Camera, Permissions} from 'expo';
import {Container, Content, Header, Item, Icon, Input, Button} from 'native-base';

export default class CameraComponent extends React.Component {

    constructor(props)
    {
        super(props)
        this.state = {
            hasCameraPermission: null,
            type: Camera.Constants.Type.back
        }
    }

    async componentWillMount(){
        const{ status } = await Permissions.askAsync(Permissions.CAMERA);
        this.setState({hasCameraPermission: status == 'granted'})
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
                    <Camera style={STYLES.cameraContainer} type={this.state.type}/>
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
        height: 300,
        width: 300
    }
}
