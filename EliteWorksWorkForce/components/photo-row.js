import React from 'react';
import {View, Text, ScrollView, TouchableOpacity, Image} from 'react-native';
import Camera from './camera-component';
import {EliteWorksOrange, AccountContentGrey, AccountMenuGrey, Blueberry, AppleCore} from '../assets/styles/constants';
import Icon from 'react-native-vector-icons/FontAwesome';

export default class PhotoRow extends React.Component {

    constructor(props)
    {
        super(props)
        this.state = {
            photos: []
        }
        this.handleCameraDisplay = this.handleCameraDisplay.bind(this);
    }

    componentDidMount(){
        EliteAPI.GEN.ModelFile.search({
			take: 1000,
			model_id: this.props.workOrder.work_order_id,
			class_key: 'workorder',
			type: this.props.type,
            include_classes: 'sitefile'
		}, (success) => {
			console.log(success.data.models[0].site_file.proxy_url_full);
            this.setState({
                photos: success.data.models
            });
		}, (failure) => {
			console.log('failure');
		});
    }

    handleCameraDisplay() {
        this.props.onShowSidePanel(
            'Camera',
            <View>
                <Camera></Camera>
            </View>
        )
    }

    render() {
        let photos = this.state.photos.map(photo => <PhotoCard
            key={photo.model_id}
            onPress={ () => this.setState({
                showPictureModal: true,
                selectedImage: [{url: photo.site_file.proxy_url_full}]
                })
            }
            photo={photo}/>);
        return (
            <View>
                <Text style={STYLES.toggleTextTitle}>{this.props.title}</Text>
                <View style={STYLES.photoRow}>
                    <ScrollView horizontal={true}>
                        {photos}
                        <TouchableOpacity
                            style={STYLES.photoAddContainer}
                            onPress={this.handleCameraDisplay}>
                            <Icon name='plus' size={30} color='white'/>
                        </TouchableOpacity>

                    </ScrollView>
                </View>
            </View>
        );
    }
}

const PhotoCard = (props) => {
    return (
        <TouchableOpacity onPress= {props.onPress}>
            <Image
              style={STYLES.photoCardContainer}
              source={{uri: props.photo.site_file.proxy_url_full}}
            />
        </TouchableOpacity>
    );
}

const STYLES = {
    toggleTextTitle: {
        color: 'white',
        fontSize: 20,
        fontWeight: 'bold'
    },
    photoRow: {
        flexDirection: 'row'
    },
    photoAddContainer: {
        height: 120,
        width: 100,
        borderRadius: 5,
        borderStyle: 'dashed',
        borderColor: 'white',
        borderWidth: 2,
        margin: 15,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Blueberry
    },
	photoCardContainer: {
		height: 120,
		width: 100,
		margin: 15,
		borderRadius: 5,
		borderWidth: 2,
		borderColor: 'white'
	},
}
