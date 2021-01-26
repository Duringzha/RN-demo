import {StyleSheet} from 'react-native';
const styles =  StyleSheet.create({
    flexContainer: {
        flex: 1,
        alignContent: 'center',
        justifyContent: 'center'
    },
    flexText: {
        color: '#000000',
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center'
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
    instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5,
    },
    loginButtonStyle: {
        // 尺寸
        height:44,
        // 背景色
        backgroundColor:'green',
        // 居中对齐
        justifyContent:'center',
        alignItems:'center'
    },
    opacity: {
        opacity: 0.5
    },
    btnStyle: {
        margin: 5,
    },
  })
  export default styles;