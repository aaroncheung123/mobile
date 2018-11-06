import React from 'react';
import {View, Text, TouchableOpacity, Animated, Button, Image, TextInput} from 'react-native';
import {EliteWorksOrange, AccountContentGrey, AccountMenuGrey, Blueberry, DarkBlueberry} from '../assets/styles/constants';


export default class DealCard extends React.Component {

    constructor(props){
      super(props);

      this.icons = {
          'up'    : require('../assets/images/icons/up_arrow.png'),
          'down'  : require('../assets/images/icons/down_arrow.png'),
          'snowflake'  : require('../assets/images/icons/snowflake.png')
      };

      this.state = {
        title       : props.title,
        expanded    : true,
        animation   : new Animated.Value(),
        };
    }
    componentDidMount(){
    }

    _setMaxHeight(event){
        this.setState({
            maxHeight   : event.nativeEvent.layout.height + 10
        });
    }

    _setMinHeight(event){
        this.setState({
            minHeight   : event.nativeEvent.layout.height + 10
        });
    }

    toggle(){

        let initialValue= this.state.expanded? this.state.maxHeight + this.state.minHeight : this.state.minHeight,
            finalValue= this.state.expanded? this.state.minHeight : this.state.maxHeight + this.state.minHeight;

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

    render(){
        let icon = this.icons['up'];

        if(this.state.expanded){
            icon = this.icons['down'];
        }
        return(
            <View style={STYLES.container}>

                <View style={STYLES.elevatedContainer}>

                    <Text style={STYLES.textStyle1}>Snow Removal Test</Text>
                    <Text style={STYLES.textStyle}>Client: Logan Connors</Text>
                    <Text style={STYLES.textStyle}>Status: Opportunity</Text>
                    <Text style={STYLES.textStyle}>Date: 10/31/18</Text>
                    <View style={STYLES.arrowContainer}>
                        <Image
                          style={STYLES.arrow}
                          source={icon}>
                        </Image>
                    </View>

                </View>
            </View>






        );
    }
}

const STYLES = {
    container: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    elevatedContainer: {
        flex: 1,
        backgroundColor: Blueberry,
        justifyContent: 'center',
        alignItems: 'flex-start',
        borderRadius: 5,
        shadowOffset: { height: 1, width: 1 }, // IOS
        shadowOpacity: 2, // IOS
        shadowRadius: 2, //IOS
        elevation: 10, // Android
        padding: 20,
        borderWidth: 2,
        borderColor: Blueberry
    },
    leftContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
        borderRadius: 50,
        padding: 5,
        margin: 5,
        height: 70,
        width: 70,
    },
    rightContainer: {
        flex: 2,
        marginHorizontal: 10,
        borderLeftWidth: 2,
        borderColor: 'white',
        paddingHorizontal: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    textStyle: {
        color: 'white'
    },
    textStyle1: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
        marginVertical: 10
    },
    textStyle2: {
        fontSize: 24,
        fontWeight: 'bold',
    },
    buttonImage: {
        height: 40,
        width: 40
    },
    arrow : {
        width: 12,
        height: 8,
        opacity: .3
    },
    arrowContainer: {
        justifyContent: 'center',
        alignItems: 'center'
    }
}
