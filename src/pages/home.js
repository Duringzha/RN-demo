import React, {useCallback} from 'react';
import {Platform, SafeAreaView, Text, Button, View} from 'react-native';
import styles from '../styles';

const HomeScreen = ({navigation}) => {
    return (
      // <>
      //   {!logined ? (
      //       <SafeAreaView style={styles.flexContainer}>
      //           <Text style={styles.welcome}>please login</Text>
      //           <Button onPress={() => {
      //             navigation.push("Login");
      //           }} title='login' />
      //     </SafeAreaView>
      //   ) : (
      //       <SafeAreaView style={ styles.flexContainer }>
      //           <View style={styles.btnStyle}>
      //               <Button onPress={useCallback(() => {
      //                       navigation.push("Webview");
      //                   }, [])} title="webview组件" />
      //           </View>
      //           <View style={styles.btnStyle}>
      //               <Button style={styles.btnStyle} onPress={useCallback(() => {
      //                       navigation.push("WebGL");
      //                   }, [])} title='3D地球' />
      //           </View>
      //       </SafeAreaView>
      //   )}
      // </>
        <SafeAreaView style={ styles.flexContainer }>
            <View style={styles.btnStyle}>
                <Button onPress={useCallback(() => {
                        navigation.push("MQConnect");
                    }, [])} title="MQ连接测试" />
            </View>
            <View style={styles.btnStyle}>
                <Button onPress={useCallback(() => {
                        navigation.push("Webview");
                    }, [])} title="webview组件" />
            </View>
            <View style={styles.btnStyle}>
                <Button style={styles.btnStyle} onPress={useCallback(() => {
                        navigation.push("WebGL");
                    }, [])} title='Three.js 3D地球' />
            </View>
            <View style={styles.btnStyle}>
                <Button style={styles.btnStyle} onPress={useCallback(() => {
                        navigation.push("GLModel");
                    }, [])} title='3D模型' />
            </View>
            <View style={styles.btnStyle}>
                <Button style={styles.btnStyle} onPress={useCallback(() => {
                        navigation.push("AnimateBox");
                    }, [])} title='原生动画' />
            </View>
        </SafeAreaView>
    )
  }
export default HomeScreen;