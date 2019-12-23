import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    Button,
    FlatList,
    RefreshControl,
    ActivityIndicator,
    TouchableOpacity,
    DeviceEventEmitter
} from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createMaterialTopTabNavigator } from 'react-navigation-tabs';
import NavigationUtil from './../navigator/NavigationUtil';
import {connect} from 'react-redux';
import actions from './../action/index';
import TrendingItem from './../common/TrendingItem';
import NavigationBar from './../common/NavigationBar';
import TrendingDialog,{TimeSpans} from './../common/TrendingDialog';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const styles=StyleSheet.create({
    tabStyle:{
        minWidth:50
    },
    indicatorStyle:{
        height:2,
        backgroundColor:'#fff'
    },
    labelStyle:{
        fontSize:13
    },
    indicatorContainer:{
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'center'
    },
    indicator:{
        color:'red',
        margin:10
    }
});

const URL='https://github.com/trending/';
const pageSize=10;
const EVENT_TYPE_TIME_SPAN_CHANGE='EVENT_TYPE_TIME_SPAN_CHANGE';

class TrendingTab extends React.Component{
    constructor(props){
        super(props);
        const {tabLabel,timeSpan}=this.props;
        this.storeName=tabLabel;
        this.timeSpan=timeSpan;
    }

    componentDidMount(){
        this.loadData();
        this.timeSpanChangeListener=DeviceEventEmitter.addListener(EVENT_TYPE_TIME_SPAN_CHANGE,(timeSpan)=>{
            this.timeSpan=timeSpan;
            this.loadData();
        });
    }

    loadData(loadMore){
        const {onRefreshTrending,onLoadMoreTrending}=this.props;
        const store=this._store();
        const url=this.genFetchUrl(this.storeName);
        if(loadMore){
            onLoadMoreTrending(this.storeName,++store.pageIndex,pageSize,store.items,res=>{
                console.warn(res);
            });
        }else{
            onRefreshTrending(this.storeName,url,pageSize);
        }
    }

    _store(){
        const {trending}=this.props;
        let store=trending[this.storeName];
        if(!store){
            store={
                items:[],
                isLoading:false,
                projectModes:[],
                hideLoadingMore:true,
            }
        }
        return store;
    }

    genFetchUrl(key){
        return URL+key+'?since='+ this.timeSpan.value;
    }

    renderItem(data){
        const item=data.item;
        return <TrendingItem
            item={item}
            onSelect={()=>{}}
        />
    }

    genIndicator(){
        return this._store().hideLoadingMore?null:
            <View style={styles.indicatorContainer}>
                <ActivityIndicator
                    style={styles.indicator}
                />
                <Text>加载更多...</Text>
            </View>
    }

    render(){
        const {trending}=this.props;
        let store=this._store();

        return (
            <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
                <FlatList
                    data={store.projectModes}
                    renderItem={data=>this.renderItem(data)}
                    keyExtractor={item=>""+(item.id || item.fullName)}
                    refreshControl={
                        <RefreshControl
                            title={'Loading'}
                            titleColor={'red'}
                            colors={['red']}
                            refreshing={store.isLoading}
                            onRefresh={()=>this.loadData()}
                            tintColor={'blue'}
                        />
                    }
                    ListFooterComponent={()=>this.genIndicator()}
                    onEndReached={()=>{
                        //flatlist onEndReached方法触发两次问题
                        setTimeout(()=>{//保证比onMomentumScrollBegin执行晚
                            if(this.canLoadMore){
                                this.loadData(true);
                                this.canLoadMore=false;
                            }
                        },100);
                    }}
                    onEndReachedThreshold={0.5}//决定当距离内容最底部还有多远时触发onEndReached回调。注意此参数是一个比值而非像素单位。比如，0.5 表示距离内容最底部的距离为当前列表可见长度的一半时触发。
                    onMomentumScrollBegin={()=>{
                        this.canLoadMore=true;
                    }}
                />

            </View>
        )
    }
}

const mapStateToProps=(state)=>({
    trending:state.trending
});
const mapDispatchToProps=dispatch=>({
    onRefreshTrending:(storeName,url,pageSize)=>{dispatch(actions.onRefreshTrending(storeName,url,pageSize))},
    onLoadMoreTrending:(storeName,pageindex,pageSize,dataArray,callBack)=>{dispatch(actions.onLoadMoreTrending(storeName,pageindex,pageSize,dataArray,callBack))}
});


const TrendingTabPage=connect(mapStateToProps,mapDispatchToProps)(TrendingTab);

export default class TrendingPage extends React.Component{
    constructor(props) {
        super(props);
        this.tabNames = ['JavaScript', 'Java', 'PHP', 'IOS', 'C++'];
        this.state={
            timeSpan:TimeSpans[0]
        }
    }
    _genTabs(){
        const tabs={};
        this.tabNames.forEach((item,index)=>{
            tabs[`tab${index}`]={
                screen:props=><TrendingTabPage {...props} timeSpan={this.state.timeSpan} tabLabel={item}/>,
                navigationOptions:{
                    title:item
                }
            }
        });
        return tabs;
    }

    renderTitleView=()=>{
        return <View>
            <TouchableOpacity
                underlayColor='transparent'
                onPress={()=>this.dialog.show()}
            >
                <View style={{flexDirection:'row',alignItems:'center'}}>
                    <Text style={{fontSize:18,color:'#fff',fontWeight:'400'}}>
                        趋势 {this.state.timeSpan.name}
                    </Text>
                    <MaterialIcons
                        name={'arrow-drop-down'}
                        size={22}
                        style={{color:'white'}}
                    />
                </View>
            </TouchableOpacity>
        </View>
    };

    onSelectTimeSpan(tab){
        this.dialog.dismiss();
        this.setState({
            timeSpan:tab
        });
        DeviceEventEmitter.emit(EVENT_TYPE_TIME_SPAN_CHANGE,tab);
    }

    renderTrendingDialog=()=>{
        return <TrendingDialog
            ref={dom=>this.dialog=dom}
            onSelect={tab=>this.onSelectTimeSpan(tab)}
        />
    };

    _tabNav(){
        if(!this.tabNav){
            this.tabNav=createAppContainer(createMaterialTopTabNavigator(
                this._genTabs(),{
                    tabBarOptions:{
                        tabStyle:styles.tabStyle,//选项卡的样式对象
                        upperCaseLabel:false,//是否使标签大写，默认为true
                        scrollEnabled:true,//是否支持 选项卡滚动
                        style:{//选项卡栏的样式对象
                            backgroundColor:'#555'
                        },
                        indicatorStyle:styles.indicatorStyle,//选项卡指示器的样式对象（选项卡底部的行）
                        labelStyle:styles.labelStyle,//选项卡标签的样式对象
                    }
                }
            ));
        }
        return this.tabNav;
    }

    render(){
        let statusBar={
            backgroundColor:'#aaf',
            barStyle:'light-content'
        };
        let navigationBar=<NavigationBar
            titleView={this.renderTitleView()}
            statusBar={statusBar}
            style={{backgroundColor:'#aff'}}
        />;
        //react-navigation 3 需要createAppContainer包裹一层
        const TabNavigator=this._tabNav();
        return (
            <View style={{flex:1}}>
                {navigationBar}
                <TabNavigator />
                {this.renderTrendingDialog()}
            </View>
        )
    }
}




