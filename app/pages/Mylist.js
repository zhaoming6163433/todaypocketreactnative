import React, {Component} from 'react';
import { Image, FlatList, Platform, StyleSheet, Text, View,TouchableOpacity} from 'react-native';
import { Actions } from 'react-native-router-flux';
import { util } from '../utils/util';
import { api_public_article } from '../model/api'
import { commonstyles } from '../common/styles'
import { setSpText, scaleSizeW, scaleSizeH } from '../common/scalescreen'
import appConfigs from '../configs'
import Toast from 'react-native-root-toast'

export default class Mylist extends Component{
    constructor(props){
        super(props);
        this.state = {
            pageNum:1,
            pageSize:10,
            isRefresh:false,
            data:[],//展示用都数组
            lastlist:[],//最后一次的集合
            totalist:[]//总返回的集合
        };
        //es6如果再自定义函数中使用this关键字需要进行绑定操作，否则this指向会变空
        this.fetchData = this.fetchData.bind(this);
        this.arrivedbottom = this.arrivedbottom.bind(this);
        this.onRefresh = this.onRefresh.bind(this);
    }
    fetchData(isrefresh){
        var params = {
            pageNum:this.state.pageNum,pageSize:this.state.pageSize
        }
        api_public_article(params)
            .then((responseJson) => {
                console.log(responseJson.result)
                this.lastlist = responseJson.result;
                this.state.totalist = this.state.totalist.concat(this.lastlist);
                this.setState({
                    data:this.state.totalist
                },function(){

                });
                if(isrefresh=="refresh"){
                    Toast.show('刷新成功',{
                        duration:Toast.durations.LONG,
                        position:Toast.positions.BOTTOM,
                        animation:true,
                        shadow:true
                    });
                }
            })
            .catch((error) =>{
                console.log(error);
            });
        
    }
    //保证每个item都有个Key提高速度解除警告
    _extraUniqueKey(item ,index){
        return "index"+index+item;
    }
    //滚动到底了
    arrivedbottom(){
        this.state.pageNum++;
        this.fetchData();
    }
    //下拉刷新
    onRefresh(){
        if(!this.state.isRefresh){
            this.state.pageNum = 1;
            this.state.totalist = [];
            this.fetchData('refresh');
        }
    }
    renderMovie({item}){
        return(
            <TouchableOpacity onPress={()=>{ this.gotolistdetail(item) }}>
                <View style={styles.containerin} >
                        <View style={styles.rightContainer}>
                            <Text style={styles.middelsize} numberOfLines={2}>{this.titlef(item)}</Text>
                            <Text style={styles.domain}>{item.domain}</Text>
                            <Text style={styles.updatime}>更新时间 {this.timeago(item.systemtime,item.publictime)}</Text>
                        </View>
                        <Image style={styles.rightimg} source={item._urlinfo&&item._urlinfo.logoimg?{uri:item._urlinfo&&item._urlinfo.logoimg}:require("../../assets/images/graylogo.png")}/>
                </View>
            </TouchableOpacity>
        )
    }
    componentDidMount(){
        this.fetchData();
    }
    render(){
        timeago = (systemtime,publictime) =>{
            return util.timeago(systemtime,publictime);
        };
        titlef = (val) =>{
            try{
                if(val._urlinfo){
                    return val._urlinfo.readability ? val._urlinfo.title : val._urlinfo.url;
                }else{
                    return val.url;
                }
            }catch(e){
                return "";
            }
        };
        gotolistdetail = (item) =>{
            this.props.navigation.push('Detail',{'url':item.url});
        };
        return(
            <View style={commonstyles.whitebackground}>
                <FlatList 
                    keyExtractor = {this._extraUniqueKey}
                    data={this.state.data}
                    renderItem={this.renderMovie}
                    onEndReachedThreshold={0.1}
                    onEndReached={this.arrivedbottom}
                    onRefresh={this.onRefresh}
                    refreshing={this.state.isRefresh}
                    style={styles.list}
                />
            </View>
        )
    }
}
const styles = StyleSheet.create({
    containerin: {
      flex: 1,
      paddingLeft:12,
      paddingTop:5,
      paddingBottom:5,
      flexDirection:'row',
      justifyContent: 'center',
      alignItems: 'center',
      flexWrap:'wrap',
      backgroundColor: '#ffffff',
      borderBottomColor:'#ededed',
      borderBottomWidth:1
    },
    rightContainer:{
        flex:1,
        flexWrap:'wrap',
        height:scaleSizeH(200),
        paddingLeft:scaleSizeW(10),
        paddingRight:scaleSizeW(10)
    },
    rightimg:{
        width:scaleSizeW(200),
        height:scaleSizeH(120),
        marginRight:scaleSizeW(20)
    },
    middelsize: {
        marginTop:scaleSizeH(30),
        fontSize:setSpText(30)
    },
    domain:{
        fontSize:setSpText(20),
        marginTop: scaleSizeH(5),
        color:"#999"
    },
    updatime:{
        fontSize:setSpText(18),
        color:"#999",
        marginTop: scaleSizeH(5)
    }
});