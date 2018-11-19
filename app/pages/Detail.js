import React, {Component} from 'react';
import { Button } from 'react-native-elements'
import { Loading,EasyLoading } from 'react-native-easy-loading'
import { Image, FlatList, Platform, StyleSheet, Text, View, WebView} from 'react-native';

export default class Detail extends Component{

    constructor(props){
        super(props);
        this.state = {
            url:this.props.navigation.state.params.url
        }
    }
    componentDidMount() {
		EasyLoading.show('Loading...', 1000);
	}
	render() {
		return (
            <View style={{flex:1}}>
                <WebView
                    style={styles.container}
                    scrollEnabled={false} 
                    javaScriptEnabled={true}  
                    domStorageEnabled={true}
                    scalesPageToFit={true}
                    source={{uri: this.state.url}}
                ></WebView>
				<Loading />
			
			</View>
		);
	}
    
}
const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#F5FCFF',
    }
});