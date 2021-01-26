import React, {useCallback} from 'react';
import {Platform} from 'react-native';
import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import JPush from 'jpush-react-native';

// 页面引入
import HomeScreen from './src/pages/home';
import LoginScreen from './src/pages/login';
import WebviewScreen from './src/pages/webview';
import WebglScreen from './src/pages/webgl';
import GLModelScrees from './src/pages/glmodel';
import MQScreen from './src/pages/MQConnect';
import AnimateBox from './src/comp/aminateComp';

const AppNavigator = createStackNavigator(
    {
        Home: {
            screen: HomeScreen
        },
        Login: {
            screen: LoginScreen
        },
        Webview: {
            screen: WebviewScreen
        },
        WebGL: {
            screen: WebglScreen
        },
        GLModel: {
            screen: GLModelScrees
        },
        MQConnect: {
            screen: MQScreen
        },
        AnimateBox: {
            screen: AnimateBox
        }
    },
    //初始化页面
    {
        initialRouteName: 'Home'
    }
)
const AppContainer = createAppContainer(AppNavigator);
const App = () => {
    if(Platform.OS == "android"){
        JPush.init();
    }
    const onNavigationStateChange = useCallback((prevState, newState, action) => {
        //页面跳转后回调
        console.log(prevState, newState, action);
    });
    return <AppContainer onNavigationStateChange={onNavigationStateChange} />;
}
export default App;
