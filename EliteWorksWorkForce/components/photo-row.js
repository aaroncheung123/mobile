import React from 'react';
import {View, Text, ScrollView, TouchableOpacity, Image, Modal, ActivityIndicator} from 'react-native';
import Camera from './camera-component';
import {EliteWorksOrange, AccountContentGrey, AccountMenuGrey, Blueberry, AppleCore} from '../assets/styles/constants';
import Icon from 'react-native-vector-icons/FontAwesome';

export default class PhotoRow extends React.Component {

    constructor(props)
    {
        super(props)
        this.state = {
            photos: [],
            loadingCards: 0
        }
        this.handleCameraDisplay = this.handleCameraDisplay.bind(this);
        this.handleSnap = this.handleSnap.bind(this);
        this.onStartLoadingBox = this.onStartLoadingBox.bind(this);
        this.onStopLoadingBox = this.onStopLoadingBox.bind(this);
        this.handleDeletePhoto = this.handleDeletePhoto.bind(this);
    }

    componentDidMount(){
        EliteAPI.GEN.ModelFile.search({
					take: 1000,
			    model_id: this.props.workOrder.work_order_id,
					class_key: 'workorder',
					type: this.props.type,
          include_classes: 'sitefile'
		}, (success) => {
			//console.log(success.data.models[0]);
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
                <Camera onSnap={this.handleSnap} onSnapStart={this.onStartLoadingBox}></Camera>
            </View>
        )
    }

    onStartLoadingBox(){
        this.setState({
            loadingCards: this.state.loadingCards + 1
        });
    }

    onStopLoadingBox(){
        this.setState({
            loadingCards: this.state.loadingCards - 1
        });
    }

    handleSnap(siteFile) {
        EliteAPI.GEN.ModelFile.add({
            model_id: this.props.workOrder.work_order_id,
            class_key: 'workorder',
            type: this.props.type,
            site_file_id: siteFile.site_file_id,
            include_classes: 'sitefile'
        }, (success) => {
            let photos = this.state.photos;
            photos.push(success.data.model_file);
            this.setState({photos: photos}, () => {
                this.onStopLoadingBox();
            });
        }, (failure) => {
            console.log(failure);
        })
    }

    handleDeletePhoto(photo){
        console.log('test: ', photo);
        photo.delete((success) => {
            console.log('success');
            this.setState({
                photos: this.state.photos.filter(x => x.model_file_id != photo.model_file_id)
            })
        }, failure => {
            console.log('failed')
        })
    }

    render() {

      let photos = this.state.photos.map(photo => <PhotoCard
          key={photo.site_file_id}
	      photo={photo}
          onDelete={this.handleDeletePhoto}
          onPress={ () => {
              this.props.onPress({photo});
          }
      }/>);

      let loadingCards = [];
      for(let i = 0; i < this.state.loadingCards; i++){
          loadingCards.push(<Loader key={i}/>);
      }

        return (
            <View>
                <Text style={STYLES.textTitle}>{this.props.title}</Text>
                <View style={STYLES.photoRow}>
                    <ScrollView horizontal={true}>
                        {photos}
                        {loadingCards}
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
        <View>
            <TouchableOpacity onPress= {props.onPress}>
                <Image
                  style={STYLES.photoCardContainer}
                  source={{uri: props.photo.site_file.proxy_url_full}}
                />
            </TouchableOpacity>
            <TouchableOpacity
                style={STYLES.deletePhotoButton}
                onPress={() => props.onDelete(props.photo)}>
                <Icon name='times' size={12} color='white'/>
            </TouchableOpacity>
        </View>

    );
}

const Loader = props => {
	return (
         <View style={STYLES.modalBackground}>
             <View style={STYLES.ActivityIndicatorContainer}>
                 <ActivityIndicator animating={true} />
             </View>
        </View>
	 )
}

const STYLES = {
    textTitle: {
        color: 'black',
        fontSize: 16,
        fontWeight: 'bold'
    },
    deletePhotoButton: {
        position: 'absolute',
        top: 0,
        right: 0,
        backgroundColor: 'red',
        opacity: .9,
        paddingHorizontal: 8,
        paddingVertical: 6,
        borderRadius: 50,
        margin: 5
    },
    photoRow: {
        flexDirection: 'row'
    },
    photoAddContainer: {
        height: 120,
        width: 100,
        borderRadius: 5,
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
		borderColor: Blueberry
	},
    modalBackground: {
        flex: 1,
        alignItems: 'center',
        flexDirection: 'column',
        justifyContent: 'space-around'
    },
    ActivityIndicatorContainer: {
        height: 120,
        width: 100,
        margin: 15,
        borderRadius: 5,
        backgroundColor:'white',
        justifyContent: 'center',
        alignItems: 'center',
    },
}
