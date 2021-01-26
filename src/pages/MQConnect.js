import React, {Component} from 'react';
import * as encoding from 'text-encoding';
import {Platform, SafeAreaView, Text, Button, View} from 'react-native';
import Stomp from 'stompjs';
Object.assign(global, { WebSocket: require('websocket').w3cwebsocket });

export default class MQScreen extends Component{
    constructor(props) {
        super(props)
        this.state = {
          status: 'Not Connected',
        }
    }
    componentDidMount(){
        const _this = this;
        let ws = new WebSocket("ws://192.168.101:61614");
        let client = Stomp.over(ws);
        // let client = Stomp.client("ws://10.1.56.72/ws");
        client.clientId = createUUID();
        let headers = {
            login: '',
            passcode: '',
            'client-id': client.clientId 
        };
        client.connect(headers,function(){
            _this.setState({status: 'Connected'})
        });
        function createUUID(){
            var CHARS = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split('');
            var chars = CHARS
                , uuid = new Array(36)
                , rnd = 0
                , r;
            for (var i = 0; i < 36; i++) {
                if (i == 8 || i == 13 || i == 18 || i == 23) {
                    uuid[i] = '-';
                }
                else if (i == 14) {
                    uuid[i] = '4';
                }
                else {
                    if (rnd <= 0x02) rnd = 0x2000000 + (Math.random() * 0x1000000) | 0;
                    r = rnd & 0xf;
                    rnd = rnd >> 4;
                    uuid[i] = chars[(i == 19) ? (r & 0x3) | 0x8 : r];
                }
            }
            return uuid.join('');
        }
    }
    render(){
        return(
            <View style={{flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#ffffff'}}>
                <View><Text>Status: {this.state.status}</Text></View>
            </View>
        )
    }
}
