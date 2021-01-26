import React, { Component } from 'react';
import {Platform, View} from 'react-native';
import WebView from 'react-native-webview';
import AnimateBox from '../comp/aminateComp';

export default class WebviewScreen extends Component {
    render(){
        let isPC = Platform.OS == "web" ? true : false;
        let url = 'http://www.baidu.com';
        return(
            <>
            {isPC ? (
                <iframe style={{width: '100%', height: '100%', border: 'none'}} src={url}></iframe>
            ) : (
                <WebView source={{uri:url}}/>
            )}
                <View style={{
                        position: 'absolute',
                        left: 50,
                        top: 200,
                        opacity: 0.5
                    }} pointerEvents='none'>
                    <AnimateBox />
                </View>
            </>
        )
    }
}
