import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    Button,
    FlatList,
    RefreshControl,
    ActivityIndicator
} from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createMaterialTopTabNavigator } from 'react-navigation-tabs';
import NavigationUtil from './../navigator/NavigationUtil';
import {connect} from 'react-redux';
import actions from './../action/index';
import PopularItem from './../common/PopularItem';
import NavigationBar from './../common/NavigationBar';

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

const URL='https://api.github.com/search/repositories?q=';
const QUERY_STR='&sort=stars';
const pageSize=10;

class PopularTab extends React.Component{
    constructor(props){
        super(props);
        const {tabLabel}=this.props;
        this.storeName=tabLabel;
    }

    componentDidMount(){
        this.loadData();
    }

    loadData(loadMore){
        const {onLoadPopularData,onLoadMorePopular}=this.props;
        const store=this._store();
        const url=this.genFetchUrl(this.storeName);
        if(loadMore){
            onLoadMorePopular(this.storeName,++store.pageIndex,pageSize,store.items,res=>{
                console.warn(res);
            });
        }else{
            onLoadPopularData(this.storeName,url,pageSize);
        }

    }

    _store(){
        const {popular}=this.props;
        let store=popular[this.storeName];
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
        return URL+key+QUERY_STR;
    }

    renderItem(data){
        const item=data.item;
        return <PopularItem
            item={item}
            onSelect={()=>{
                NavigationUtil.goPage('DetailPage',{
                    projectModel:item
                })
            }}
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
        let store=this._store();

        return (
            <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
                <FlatList
                    data={store.projectModes}
                    renderItem={data=>this.renderItem(data)}
                    keyExtractor={item=>""+item.id}
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
    popular:state.popular
});
const mapDispatchToProps=dispatch=>({
    onLoadPopularData:(storeName,url,pageSize)=>{dispatch(actions.onLoadPopularData(storeName,url,pageSize))},
    onLoadMorePopular:(storeName,pageindex,pageSize,dataArray,callBack)=>{dispatch(actions.onLoadMorePopular(storeName,pageindex,pageSize,dataArray,callBack))}
});


const PopularTabPage=connect(mapStateToProps,mapDispatchToProps)(PopularTab);

export default class PopularPage extends React.Component{
    constructor(props) {
        super(props);
        this.tabNames = ['JavaScript', 'Java', 'Android', 'C', 'PHP', 'IOS', 'C++']
    }
    _genTabs(){
        const tabs={};
        this.tabNames.forEach((item,index)=>{
            tabs[`tab${index}`]={
                screen:props=><PopularTabPage {...props} tabLabel={item}/>,
                navigationOptions:{
                    title:item
                }
            }
        });
        return tabs;
    }
    render(){
        let statusBar={
            backgroundColor:'#aaf',
            barStyle:'light-content'
        };
        let navigationBar=<NavigationBar
            title={'最热'}
            statusBar={statusBar}
            style={{backgroundColor:'#aff'}}
        />;
        //react-navigation 3 需要createAppContainer包裹一层
        const TabNavigator=createAppContainer(createMaterialTopTabNavigator(
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
        return (
            <View style={{flex:1}}>
                {navigationBar}
                <TabNavigator />
            </View>
        )
    }
}




