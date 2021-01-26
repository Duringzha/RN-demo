import React, {Component} from 'react';
import {StyleSheet, Text, View, Animated, TouchableOpacity, Easing} from 'react-native';
import iconImage from '../../assets/favicon.png';
export default class AnimateBox extends Component {
    constructor(props) {
        super(props);
        this.spinValue = new Animated.Value(0)
    }
    componentDidMount () {
        this.spin()
    }
    spin () {
        this.spinValue.setValue(0)
        Animated.timing(
            this.spinValue,
            {
                toValue: 1,
                duration: 4000,
                useNativeDriver: true,
                easing: Easing.linear
            }
        ).start(() => this.spin())
    }

    render(){
        const spin = this.spinValue.interpolate({
            inputRange: [0,1],
            outputRange: ['0deg', '360deg']
        })
        return (
            <View style={styles.container}>
                <Animated.Image style={{
                        width: 227,
                        height: 200,
                        transform: [{rotate: spin}]}} source={iconImage}/>
            </View>
        );
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    button: {
        marginTop: 20,
        backgroundColor:'#808080',
        height:35,
        width:140,
        borderRadius:5,
        justifyContent: 'center',
        alignItems: 'center',
    },
});