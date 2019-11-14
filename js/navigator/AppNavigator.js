import {
    createAppContainer ,
    createSwitchNavigator
} from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import WelcomePage from './../pages/WelcomePage';
import HomePage from './../pages/HomePage';
import DetailPage from './../pages/DetailPage';
import {connect} from 'react-redux';
import {createReactNavigationReduxMiddleware,createReduxContainer} from 'react-navigation-redux-helpers';
export const rootCom='Init';//设置根路由

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
    },
});


export const RootNavigator=  createAppContainer(createSwitchNavigator({
    Init:InitNavigator,
    Main:MainNavigator
},{
    navigationOptions:{
        header:null,
    }
}));

export const middleware=createReactNavigationReduxMiddleware(
    state => state.nav
);

const AppWithNavigationState = createReduxContainer(RootNavigator);

const mapStateToProps= state => ({
    state: state.nav
});

export default connect(mapStateToProps)(AppWithNavigationState);





















