import React, { PureComponent } from 'react' 
import {
    Platform,
    Dimensions,
    StyleSheet,
    View,
    Text,
    TouchableOpacity,
    Easing
}from 'react-native'

export default class Live extends PureComponent {
    
    constructor(props) {
        super(props);
        
    }

    render(){
        return(
            <View style={styles.container}><Text>个人分类</Text></View>
        )
    }
    
}
const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: '#f8f8f8',
        paddingTop: 10,
    },
    tabViewItemContainer: {
        flex: 1,
        backgroundColor: '#FFCCCC',
        justifyContent: 'center',
        alignItems: 'center'
    },
})