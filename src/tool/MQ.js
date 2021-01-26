import Stomp from 'stompjs';
import global from './global';

const connectMQ = (navigation) => {
    if(global.mqClient.clientId){return;}
    global.mqClient.clientId = createUUID();
    // let ws = new WebSocket("ws://10.1.55.208/ws");
    // global.mqClient.client = Stomp.over(ws);
    global.mqClient.client = Stomp.client('ws://10.1.55.208/ws');
    var onconnect = function(){
        console.info('MQ连接成功...' + new Date());
        //订阅公共频道receive_viscommon
        global.mqClient.client.subscribe('/topic/receive_viscommon', function (message) {
            var CommandID = message.headers['CommandID'];
            var CallID = message.headers['CallID'];
            var ClientID = message.headers['ClientID'];
            var SessionID = message.headers['SessionID'];
            if(global.mqClient.clientId == ClientID && CommandID == 'COMMAND_USER_LOGIN' && CallID){
                global.mqClient.callId = CallID; //全局存储的CallID
                alert('登录成功');
                navigation.navigate('Home',{
                    onGoBack: () => this.refresh()
                });
                global.mqClient.client.subscribe('/topic/receive_vis_' + global.mqClient.callId, function (msg) {
                    console.log(msg);
                });
            }
        });

        //订阅消息频道receive_vismessage
        global.mqClient.client.subscribe('/topic/receive_vismessage', function(msg){
            console.log(msg);
        });
    
        //存在callId则也订阅callId
        if(global.mqClient.callId){
            global.mqClient.client.subscribe('/topic/receive_vis_' + global.mqClient.callId, function(msg){
            console.log(msg);
          });
        }
    }
    let headers = {
        login: '',
        passcode: '',
        'client-id': global.mqClient.clientId,
        host: 'ws://10.1.55.208/ws'
    };
    global.mqClient.client.connect(headers, onconnect);
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
};
const sendCommon = (CommandID, messageBody, headers) => {
    headers = headers || {};
    headers['client-id'] = global.mqClient.clientId;

    if(!global.mqClient.client){
      console.warn('MQ未连接，消息发送失败.');
      return;
    }
    
    headers['CommandID'] = CommandID;
    headers['ClientID'] = global.mqClient.clientId;
    headers['WallID'] = '';
    headers['SessionID'] = '' + Date.now() + parseInt(Math.random() * 100);

    global.mqClient.client.send('/topic/send_viscommon', headers, messageBody);
    return headers['SessionID'];
};
const loginFun = (username, password) => {
    const COMMAND = 'COMMAND_USER_LOGIN';
    let cmd = {
        'version': '1',
        'to': {
            'name': {},
            'devs': {},
            'attr': {}
        },
        'from': {
            'name': {},
            'devs': {},
            'attr': {}
        },
        'body': {
            'type': {
                'textContent': 'BT_REQUEST'
            },
            'data': [{
                'userName': {
                    'textContent': 'admin'
                },
                'ownerUsr': {
                    'textContent': 'admin'
                },
                'type': {
                    'textContent': 'ucsServer'
                },
                'port': {
                    'textContent': '7050'
                },
                'passWord': {
                    'textContent': 'admin'
                },
                'ip': {
                    'textContent': '127.0.0.1'
                },
                'ICVPWallName': {
                    'textContent': '小屏门户'
                },
                'ICVPWallID': {
                    'textContent': 'xxxxx'
                },
                'ClientVersion': {},
                'clientType': {
                    'textContent': '4'
                }
            }]
        }
    };
    cmd.body.data[0].userName.textContent = username;
    cmd.body.data[0].passWord.textContent = password;
    cmd.body.data[0].ownerUsr.textContent = username;
    var SessionID = sendCommon(COMMAND, JSON.stringify(cmd));
    return SessionID;
};
export {connectMQ, loginFun, sendCommon};