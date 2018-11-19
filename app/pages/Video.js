import React, { PureComponent } from 'react' 
import {
    NativeModules,
    View,
    StyleSheet,
    Platform
    
}from 'react-native'
import { util } from '../utils/util';
import { api_get_tuling_bot } from '../model/api'
import IMUI from 'aurora-imui-react-native';
import { connect } from 'react-redux'
import { actionGetTalkTime } from '../actions/GetWeatherAction'

var MessageList = IMUI.MessageList;
var ChatInput = IMUI.ChatInput;
const AuroraIMUIModule = NativeModules.AuroraIMUIModule;
const AuroraIMUIController = IMUI.AuroraIMUIController;

class Video extends PureComponent {
    
    constructor(props) {
        super(props);
        this.state = {
            talktime:'',
            inputLayoutHeight:100,
            isDismissMenuContainer:false,
            messageListLayout: { flex: 1, width: window.width, margin: 0 },
            chatInputStyle:{width:window.width,height:100}
        };
        this.showinfo = this.showinfo.bind(this);
        this.onSendText = this.onSendText.bind(this);
        this.fetchData = this.fetchData.bind(this);
        this.appendinfo = this.appendinfo.bind(this);
        this.onSwitchToEmojiMode = this.onSwitchToEmojiMode.bind(this);
    }
    //当props发生变化时执行
    componentWillReceiveProps(nextProps){
        this.setState({
            talktime:nextProps.getTalkTime.bean
        });
    }
    componentDidMount(){
        if (Platform.OS === "android") {
            this.refs["ChatInput"].setMenuContainerHeight(316)
          }
    }
    appendinfo(text,userid,isOutgoing,name){
        let date = new Date();
        let time = util.formatDateTime(date);
        this.props.dispatch(actionGetTalkTime(time));
        let oldtime = new Date(Date.parse(this.state.talktime.replace(/-/g,"/"))).getTime();
        let difftime = date.getTime()-oldtime;
        if(difftime>60000&&userid=='1'||this.state.talktime==''){
        }else{
            time = '';
        }
        let messages = [{
            msgId: userid,
            status: "send_succeed",
            msgType: "text",
            text: text,
            isOutgoing: isOutgoing,
            fromUser: {
              userId: userid,
              displayName: name||"我",
              avatarPath: ""
            },
            timeString: time
          }];
          AuroraIMUIController.appendMessages(messages);
    }
    fetchData(text,userid){
        var params = {
            info:text,userid:userid
        }
        api_get_tuling_bot(params)
            .then((responseJson) => {
                console.log(responseJson);
                this.appendinfo(responseJson.text,userid,false,'问问');
            })
            .catch((error) =>{
                console.log(error);
            });
        
    }
    //展示消息到屏幕上
    showinfo(text){
        this.appendinfo(text,"1",true)
        this.fetchData(text,"2");
    }
    //底部表情等菜单改变时
    onInputViewSizeChange = (size) => {
        console.log("onInputViewSizeChange height: " + size.height + " width: " + size.width)
        if (this.state.inputLayoutHeight != size.height) {
        this.setState({
            inputLayoutHeight: size.height,
            chatInputStyle: { width: window.width, height: size.height<100?100:size.height },
            messageListLayout: { flex: 1, width: window.width, margin: 0 }
        })
        }
    }
    onFullScreen = () => {
        console.log("on full screen")
        this.setState({
            messageListLayout: { flex: 0, width: 0, height: 0 },
            inputViewLayout: { flex: 1, width: window.width, height: window.height },
            navigationBar: { height: 0 }
        })
    }
    //点击消息气泡触发
    onMsgClick(){

    }
    //长按消息
    onMsgLongClick(){

    }
    //点击头像
    onAvatarClick(){

    }
    //点击消息状态按钮
    onStatusViewClick(){

    }
    //点击消息列表
    onTouchMsgList(){

    }
    //滚动MessageList到顶部时，下拉触发
    onPullToRefresh(){

    }
    //输入文字后发送
    onSendText(text){
        this.showinfo(text);
    }
    //选中视频或图片后点击发送
    onSendGalleryFiles(){

    }
    //点击拍照按钮
    onTakePicture(){

    }
    //点击录制视频按钮
    onStartRecordVideo(){

    }
    //完成录制视频
    onFinishRecordVideo(){

    }
    //取消录制视频
    onCancelRecordVideo(){

    }
    //点击录音按钮
    onStartRecordVoice(){

    }
    //录音完成后松开手指
    onCancelRecordVoice(){

    }
    //点击菜单栏麦克风按钮
    onSwitchToMicrophoneMode(){
        AuroraIMUIModule.scrollToBottom(true);
    }
    //点击表情
    onSwitchToEmojiMode(){
        AuroraIMUIModule.scrollToBottom(true);
    }
    //点击菜单栏图片按钮
    onSwitchToGalleryMode(){
        AuroraIMUIModule.scrollToBottom(true);
    }
    //点击菜单栏拍照按钮
    onSwitchToCameraMode(){
        AuroraIMUIModule.scrollToBottom(true);
    }
    //点击输入框
    onTouchEditText(){

    }
    render(){
        return(
            <View style = { styles.container }>
                <MessageList
                    style={this.state.messageListLayout}
                    onMsgClick = {this.onMsgClick}
                    onMsgLongClick = {this.onMsgLongClick}
                    onAvatarClick = {this.onAvatarClick} 
                    onStatusViewClick = {this.onStatusViewClick}
                    onTouchMsgList = {this.onTouchMsgList}
                    onPullToRefresh = {this.onPullToRefresh}
                    sendBubble = {{imageName:"send_msg", padding: 10}}
                    receiveBubbleTextColor = {'#ffffff'}
                    isShowOutgoingDisplayName={true}
                    sendBubbleTextSize = {18}
                    receiveBubbleTextSize = {14}
                    sendBubblePressedColor = {'#dddddd'}
                />
                    <ChatInput
                        ref="ChatInput"
                        style = { this.state.chatInputStyle }
                        isDismissMenuContainer = {this.state.isDismissMenuContainer}
                        onSendText = {this.onSendText}
                        onSendGalleryFiles = {this.onSendGalleryFiles}
                        onTakePicture = {this.onTakePicture}
                        onStartRecordVideo = {this.onStartRecordVideo}
                        onFinishRecordVideo = {this.onFinishRecordVideo}
                        onCancelRecordVideo = {this.onCancelRecordVideo}
                        onStartRecordVoice = {this.onStartRecordVoice}
                        onFinishRecordVoice = {this.onFinishRecordVoice}
                        onCancelRecordVoice = {this.onCancelRecordVoice}
                        onSwitchToEmojiMode={this.onSwitchToEmojiMode}
                        onSwitchToMicrophoneMode = {this.onSwitchToMicrophoneMode}
                        onSwitchToGalleryMode = {this.onSwitchToGalleryMode}
                        onSwitchToCameraMode = {this.onSwitchToCameraMode}
                        onTouchEditText = {this.onTouchEditText}
                        onSizeChange={this.onInputViewSizeChange}
                        onFullScreen={this.onFullScreen}
                    />
            </View>
        )
    }
}

function select(store) {
    return {
        getTalkTime : store.getTalkTime
    }
}

export default connect(select)(Video);

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
    chatInputStyle:{
        
    }
})