/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  FlatList,
  Platform,
  StyleSheet,
  Text,
  Image,
  View,

} from 'react-native';
import './static/utils/utils.js'
import Header from './component/head/index.js'

var moment = require('moment')


const baseurl = 'https://free-api.heweather.com/s6/weather/forecast'
const key = 'a1741215403d4f13a7923c2780961ae8'
// var REQUEST_URL = 'http://api.douban.com/v2/movie/in_theaters'
export default class App extends Component {
  constructor(props){
    super(props)
    this.state = {
      data:[],
      ydata:[],
      ndata:[],
      loaded:false,
      s:'',
      hastime:false,
    }
    this.fetchData = this.fetchData.bind(this)
    this.getLocation=this.getLocation.bind(this)
    this.isTodayData=this.isTodayData.bind(this)
    this.Savestorage = this.Savestorage.bind(this)
  }
  componentDidMount(){
    this.getLocation(baseurl,key)
  }
  fetchData(url,params){
    if (params) {
         let paramsArray = [];
         //拼接参数
         Object.keys(params).forEach(key => paramsArray.push(key + '=' + params[key]))
         if (url.search(/\?/) === -1) {
             url += '?' + paramsArray.join('&')
         } else {
             url += '&' + paramsArray.join('&')
         }
     }
    console.log(url)
    fetch(url)
    .then((response)=>response.json())
    .then((responseData)=>{
      this.setState({
        loaded:true,
      });
      this.fetchCallback(responseData)
    })
  }
  getLocation(url,key){
    navigator.geolocation.getCurrentPosition(
     	(position) =>{
        var initialPosition = JSON.stringify(position);
        // var ab = JSON.parse(initialPosition)
        var loc = JSON.parse(initialPosition).coords.longitude + ','+JSON.parse(initialPosition).coords.latitude
        this.setState({loc});
        var options ={
          key:key,
          location:loc,
        }
        this.fetchData(url,options)

     	},
     	(error) => console.log(error.message),
     	{timeout: 20000, maximumAge: 1000}
     );
  }
  Savestorage(){
    global.storage.save({
      key:'14',
      id:'1001',
      data:{a:12,b:13},
    })
    console.log('save');
  }
  isTodayData(b){
    console.log('check');
    global.storage.load({
      key:'14',
      id:'1001',
    }).then((ret)=>{
      console.log(ret);
      console.log('y');
      this.setState({
        data:ret
      })
      // return true
    }).catch(err=>{
      console.log(err);
      // return false
    })
  }
  fetchCallback(adata){
    var starttime = moment().startOf('day')
    var endtime = moment().endOf('day')
    var timetamp = moment()
    var key = moment().date()
    this.Savestorage()
    this.isTodayData(key)
    console.log(this.state.data);
    // if (this.isTodayData(key)) {
    //   global.storage.load({
    //     key:key
    //   }).then((rsy)=>{
    //     console.log(rsy);
    //     this.setState({
    //       data:rsy.concat(adata.HeWeather6),
    //       ydata:rsy,
    //     })
    //   })
    // }else {
    //   global.storage.save({
    //     key:key,
    //     data:adata,
    //   })
    //   this.setState({
    //     data:this.state.data.concat(adata.HeWeather6),
    //     ndata:this.state.ndata.concat(adata.HeWeather6),
    //   })
    // }

  }
  _onPressButton(){
    console.log("You tapped the button!");

  }
  render() {
    if (!this.state.loaded) {
      return this.renderLoadingView();
    }
    return (
      <View>
        <Header/>
        <FlatList
         data = {this.state.data}
         renderItem= {this.renderMovie}
         style={styles.list}
         />
      </View>
    );
  }
  renderLoadingView(){

    return (
      <View style={styles.container1}>
        <Text>
          Loading weather...
        </Text>
      </View>
    )
  }
  renderMovie({item}){
    var a = item.update.loc.split(' ')
    var d = a[0].split('-')
    var s2 = d[1]+'月'+d[2]+'日'+a[1]
    return (
    <View style={styles.container}>
      <View>
        <Text style={styles.largeText}>昨日</Text>
        <Text style={styles.baseText}>{item.basic.location}/{item.basic.parent_city?item.basic.admin_area:''}</Text>
        <Text style={styles.largeText}>{item.daily_forecast[0].tmp_min}℃ ~ {item.daily_forecast[0].tmp_max}℃ </Text>
        <Text style={styles.baseText}>{item.daily_forecast[0].cond_txt_d}/{item.daily_forecast[0].cond_txt_n}</Text>
      </View>
      <View style= {styles.right}>
        <Image source = {{uri:'http://onklxoiqv.bkt.clouddn.com/'+ global.Imgsrc[item.daily_forecast[0].cond_txt_d] +'.png'}}
        style={{width: 60, height: 60,marginRight:20,marginBottom:10,}} />
        <Text style={styles.smallText}>最后更新:{s2}</Text>

      </View>
    </View>
  );
  }

}

const styles = StyleSheet.create({
  container1:{
    flex: 1,
    alignItems: 'center',
    justifyContent:'center',
    backgroundColor:'#f5f5f5',
  },

  container: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fcb442',
    margin:10,
    marginBottom: 5,
    borderRadius:7,
    flexDirection: 'row',
    paddingLeft:20,
    paddingRight:10,
    padding:10,
  },
  baseText:{
    color:'#ffffff',
    fontSize:14,
  },
  largeText:{
    color:'#ffffff',
    fontSize:17,
    fontWeight:'500',
  },
  smallText:{
    color:'#ffffff',
    fontSize:11,
  },
  right:{
    flex: 1,
    justifyContent:'center',
    alignItems: 'flex-end',
  },
  header:{
    flexDirection:'row',
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
  rightContainer: {
    flex: 1,
  },

});
