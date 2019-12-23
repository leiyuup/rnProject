import React from 'react';
import {
    View,
    Text,
    TouchableOpacity,
} from 'react-native';
import NavigationBar from '../common/NavigationBar';
import ViewUtil from "../util/ViewUtil";
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import NavigationUtil from "../navigator/NavigationUtil";
import {WebView} from 'react-native-webview';
const TRENDING_URL='https://github.com/';



class DetailPage extends React.Component{
    constructor(props){
        super(props);
        this.params=this.props.navigation.state.params;
        const {projectModel}=this.params;
        this.url=projectModel.html_url || TRENDING_URL+projectModel.fullName;
        const title=projectModel.full_name || projectModel.fullName;
        console.warn('23',title,this.url);
        this.state={
            title:title,
            url:this.url,
            canGoBack:false
        }
    }
    onBack(){
        if(this.state.canGoBack){
            this.webView.goBack();
        }else{
            NavigationUtil.goBack(this.props.navigation);
        }
    }
    renderRightButton(){
        return (
            <View style={{flexDirection:'row'}}>
                <TouchableOpacity
                    onPress={()=>{

                    }}
                >
                    <FontAwesome
                        name={'star-o'}
                        size={20}
                        style={{color:'white',marginRight:10}}
                    />
                    {ViewUtil.getShareButton(()=>{})}
                </TouchableOpacity>
            </View>
        )
    }
    onNavigationStateChange(navState){
        console.warn('onNavigationStateChange',navState);
        this.setState({
            canGoBack:navState.canGoBack,
            url:navState.url
        });
    }

    render(){
        let statusBar={
            backgroundColor:'#aaf',
            barStyle:'light-content'
        };
        console.warn('反反复复飞飞飞',this.state.title);
        let navigationBar=<NavigationBar
            title={this.state.title}
            leftButton={ViewUtil.getLeftBackButton(()=>this.onBack())}
            rightButton={this.renderRightButton()}
            statusBar={statusBar}
            style={{backgroundColor:'#aff'}}
        />;
        return (
            <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
                ｛navigationBar｝
                <WebView
                    ref={webView=>this.webView=webView}
                    startInLoadingState={true}
                    onNavigationStateChange={e=>this.onNavigationStateChange(e)}
                    source={{uri:this.state.url}}
                />
            </View>
        )
    }
}

export default DetailPage;