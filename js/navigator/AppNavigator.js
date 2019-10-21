import {
    createAppContainer ,
    createSwitchNavigator
} from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import WelcomePage from './../pages/WelcomePage';
import HomePage from './../pages/HomePage';
import DetailPage from './../pages/DetailPage';

const InitNavigator=createStackNavigator({
    WelcomePage:{
        screen:WelcomePage,
        navigationOptions:{
            header:null,
        }
    }
});

const MainNavigator=createStackNavigator({
    HomePage:{
        screen:HomePage,
        navigationOptions:{
            header:null,
        }
    },
    DetailPage:{
        screen:DetailPage,
        navigationOptions:{
            header:null,
        }
    },
});


export default  createAppContainer(createSwitchNavigator({
    Init:InitNavigator,
    Main:MainNavigator
},{
    navigationOptions:{
        header:null,
    }
}));