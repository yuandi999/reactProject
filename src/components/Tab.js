import React,{Component} from "react";
import {TabBar} from "antd-mobile";
import {connect} from 'react-redux';
import { Route,Switch,Redirect,withRouter } from "react-router-dom";

//引入组件
import Home from "./Home";
import Bangbang from "./Bangbang";
import My from "./My";
import HouseDetail from "./pages/HouseDetail"
import Houselist from "./pages/Houselist"
import Addseach from "./pages/Addseach"

//字体图标
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHome,faHotel,faUser} from '@fortawesome/free-solid-svg-icons'

import "../less/main.less"
import store from "../store"

library.add( faHome,faHotel,faUser)

class Tab extends Component{
    constructor(){
        super();
        this.state = {
            tabs : [
                {
                    title:"首页",
                    icon:"home",
                    path:"Home"
                }  ,
                {
                    title:"房帮帮",
                    icon:"hotel",
                    path:"Bangbang"
                }   ,
                {
                    title:"我的",
                    icon:"user",
                    path:"My"
                }           
            ],
            currentTab:0
        }
    }
    Click(idx,path){
        this.setState({
            currentTab:idx
        })
        console.log(this.props,45)
        this.props.history.push(path)
    }
    
    componentWillMount(){
        //获取hash值
        let hash = window.location.hash.slice(1);//#list

        //找出对应索引值
        let currentTab = 0
        this.state.tabs.some((item,idx)=>{
            currentTab = idx;
            return item.path === hash
        });

        this.setState({
            currentTab:currentTab
        });
    }
    
    render(){
        let state = store.getState();
        console.log(state);
        return (
            <div className="contain">
                <div className="content">
                    <Switch>
                        <Route path="/Home" component={Home} />
                        <Route path="/Bangbang/:id" component={Bangbang} />
                        <Route path="/My" component={My} />
                        <Route path="/HouseDetail/:id" component={HouseDetail} />
                        <Route path="/HouseDetail/:id" component={HouseDetail} />
                        <Route path="/Houselist" component={Houselist} />
                        <Route path="/Addseach" component={Addseach} />
                        <Redirect from="/" to="/Home" exact/>
                    </Switch>
                </div>
                <TabBar 
                className="TB"
                hidden={!this.props.tabbarStatus}
                >
                    {
                    this.state.tabs.map((tab,idx)=>{
                            return <TabBar.Item
                                title={tab.title}
                                key={tab.path}  //必须唯一
                                icon={<FontAwesomeIcon icon={tab.icon}/>}
                                selected={this.state.currentTab === idx }   //"blueTab"
                                selectedIcon={<FontAwesomeIcon icon={tab.icon}/>}
                                onPress={this.Click.bind(this,idx,tab.path)}
                                >
                                </TabBar.Item> 
                        })
                    }
                </TabBar>
            </div>
          )
    }
}

let mapStateToProps = state=>{
    // 此处必须返回一个对象
    console.log(state);
    return {
        //把state.commonReducer.tabbarStatus映射到props
        tabbarStatus:state.commonReducer.tabbarStatus,
        // cartQty:state.cartReducer.goodslist.length
    }
}

Tab = connect(mapStateToProps)(Tab);

Tab = withRouter(Tab);
export default Tab;