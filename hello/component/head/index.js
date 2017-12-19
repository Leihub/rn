import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  Image,
  View
} from 'react-native';

const baseurl = 'https://free-api.heweather.com/s6/weather/forecast'
const key = 'a1741215403d4f13a7923c2780961ae8'
export default class Header extends Component{
    constructor(props){
      super(props)
      this.state={
        baseurl:props.baseurl,
        key:props.key,
      }
    }
    _onPressButton(){
      console.log('click',global);
    }
    render(){
      return(
        <View style={styles.header}>
          <Text style={styles.baseText}>我的天气</Text>
          <Text style={styles.baseText} onPress={this._onPressButton}>刷新</Text>
        </View>
      )
    }
}
const styles = StyleSheet.create({
  header:{
    flexDirection:'row',
    justifyContent:'space-between',
    padding:10,
    borderBottomWidth:0.5,

  },
  baseText:{
    color:'#7e6e99',
    fontSize:16,
  },
})
