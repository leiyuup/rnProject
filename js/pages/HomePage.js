// import React from 'react';
// import { createBottomTabNavigator } from 'react-navigation-tabs';
//
// import PopularPage from './PopularPage';
// import TrendingPage from './TrendingPage';
// import FavoritePage from './FavoritePage';
// import MyPage from './MyPage';
// import  MaterialIcons  from 'react-native-vector-icons/MaterialIcons';
// import FeatherIcons from 'react-native-vector-icons/Feather';
// import EntypoIcons from 'react-native-vector-icons/Entypo';
//
//
// export default createBottomTabNavigator({
//     PopularPage:{
//         screen:PopularPage,
//         navigationOptions:{
//             tabBarLabel:'最热',
//             tabBarIcon:({tintColor,focused})=>(
//                 <MaterialIcons
//                     name={'whatshot'}
//                     size={26}
//                     style={{color:tintColor}}
//                 />
//             )
//         }
//     },
//     TrendingPage:{
//         screen:TrendingPage,
//         navigationOptions:{
//             tabBarLabel:'趋势',
//             tabBarIcon:({tintColor,focused})=>(
//                 <FeatherIcons
//                     name={'trending-up'}
//                     size={26}
//                     style={{color:tintColor}}
//                 />
//             )
//         }
//     },
//     FavoritePage:{
//         screen:FavoritePage,
//         navigationOptions:{
//             tabBarLabel:'收藏',
//             tabBarIcon:({tintColor,focused})=>(
//                 <MaterialIcons
//                     name={'favorite'}
//                     size={26}
//                     style={{color:tintColor}}
//                 />
//             )
//         }
//     },
//     MyPage:{
//         screen:MyPage,
//         navigationOptions:{
//             tabBarLabel:'我的',
//             tabBarIcon:({tintColor,focused})=>(
//                 <EntypoIcons
//                     name={'user'}
//                     size={26}
//                     style={{color:tintColor}}
//                 />
//             )
//         }
//     }
// });
//



import DynamicTabNavigator from "../navigator/DynamicTabNavigator";

export default DynamicTabNavigator

