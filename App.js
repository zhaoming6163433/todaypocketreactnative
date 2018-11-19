/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import { Image, FlatList, Platform, StyleSheet, Text, View} from 'react-native';
import { createStackNavigator } from 'react-navigation'
import RouteConfig from './app/RouteConfig'
import StackNavigatorConfig from './app/StackNavigatorConfig'
import { Provider } from 'react-redux';
import configureStore from './app/store/Store';


const store = configureStore();
const Navigator = createStackNavigator(RouteConfig, StackNavigatorConfig);

export default class App extends Component {
    constructor(props){
        super(props);
        this.state = {
            loaded:false
        };
        //es6如果再自定义函数中使用this关键字需要进行绑定操作，否则this指向会变空
        this.fetchData = this.fetchData.bind(this);
    }
    fetchData(){

    }
    
  render() {
    return (
        <Provider store={store}>
            <Navigator/>
        </Provider>
    );
  }
  
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  list: {
      color:'red'
  }
});
