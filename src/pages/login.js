import React, { Component } from 'react';
import {View, Text, TextInput, Button} from 'react-native';
import {connectMQ, loginFun} from '../tool/MQ';
import styles from  '../styles';
export default class LoginScreen extends Component{
    constructor(props) {
        super(props);
        this.inputChangeUsername = this.inputChangeUsername.bind(this);
        this.inputChangePassword = this.inputChangePassword.bind(this);
        this.state = { 
            username: "",
            password: ""
        };
    }
    loginClick(){
        let username = this.state.username;
        let password = this.state.password;
        loginFun(username, password);
    }
    inputChangeUsername(username){
	    this.setState({username: username});
    }
    inputChangePassword(password){
	    this.setState({password: password});
    }
    render(){
        connectMQ(this.props.navigation);
        return(
            <View style={styles.flexContainer}>
                <View>
                    <Text>用户名：</Text>
                    <TextInput ref="username" onChangeText={this.inputChangeUsername} placeholder='请填写用户名'></TextInput>
                    <Text>密码：</Text>
                    <TextInput ref="password" onChangeText={this.inputChangePassword} placeholder='请填写密码'></TextInput>
                </View>
                <View style={styles.btnStyle}>
                    <Button onPress={() => this.loginClick()} title="登 录" />
                </View>
            </View>
        );
    }
}