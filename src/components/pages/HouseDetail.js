import React,{Component} from "react"
import {withRouter} from "react-router-dom"
import { Tabs, WhiteSpace, Badge } from 'antd-mobile';
import back from "../../img/back-white.png"
import axios from "axios"
import  qs from 'qs';
import { Carousel, WingBlank } from 'antd-mobile';
import homedetail_fav from "../../img/homedetail_fav.png"

// import "../../less/housedetail.less";

class HouseDetail extends Component{
    constructor(){
        super()
        this.state={
            bannerImg:[{},{},{},{},{},{},{},{},{},{},{},{},{},{},{}],
            info:[],
            tabs:[{title:"基本信息"},{title:"主力户型"},{title:"基本导航"}],
        }
    }
    componentWillMount(){
        console.log(this.props.history.location.state.id,22);
        let cityid = this.props.history.location.state.id;
        document.cookie = '"jsid"="6caa2b4c-5779-4a57-a84f-7606b37b1c1c"';
        axios.post("/ItemList/fbb-mobile-client/api/building/buildingDetail",
        qs.stringify({buildingId: cityid}),
            {
                header:{
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            }
        )
        .then(res=>{
            console.log(res,229)
            let info = res.data.data.buildingDetail;
            let bannerImg = res.data.data.buildingDetail.detailPic.split(",");
            console.log(bannerImg,14);           
            this.setState({
                info:info,
                bannerImg:bannerImg
            })
        })
        .catch(err=>{
            console.log(err,17)
        })
    }
    
    goback(){
        this.props.history.goBack()
    }
    render(){
        var content = this.state.info.introduction;
        return <div className="Det">
            <div className="Det-header">
                <i onClick={this.goback.bind(this)}><img src={back}/></i>
                </div>
                <WingBlank>
                <Carousel
                    autoplay={true}
                    infinite
                    dots={false}
                    >
                    {this.state.bannerImg.map((val, idx) => (
                        <img
                        key={idx}
                        src={val}
                            style={{ width: '100%', verticalAlign: 'top'}}
                        />
                    ))}
                    </Carousel>
                </WingBlank>
                <div className="Det-price">
                    <div className="Det-background"></div>
                    <p className="Det-content">{this.state.info.avgPrice}</p>
                </div>
                <div className="Det-buildingInfo">
                    <p className='buildingInfo-top'>
                        <span className="buildingInfo-title">{this.state.info.buildingName}</span>
                        <s>精装</s>
                        <s>公寓</s>
                        <u>{this.state.info.avgPrice}</u>
                    </p>
                    <p className="buildingInfo-price"><img src={homedetail_fav} /> {this.state.info.preferentialInfo}</p>
                </div>
                <div className="Det-Tabs">
                    <Tabs tabs={this.state.tabs}
                        initialPage={1}
                        tabBarActiveTextColor={"rgb(26,201,114)"}
                        onChange={(tab, index) => { console.log('onChange', index, tab); }}
                        onTabClick={(tab, index) => { console.log('onTabClick', index, tab); }}
                        >
                        <div style={{ backgroundColor: '#fff' }}>
                            <div className="Det-new">最新动态
                                <p>{this.state.info.bindingDynamic}</p>
                            </div>
                            <div className="Det-pr">
                                <p>简介</p>
                                <span  dangerouslySetInnerHTML = {{ __html: content}}></span>
                            </div>
                        </div>
                        <div style={{ backgroundColor: '#fff' }}>
                            Content of second tab
                        </div>
                        <div style={{ backgroundColor: '#fff' }}>
                            Content of third tab
                        </div>
                        </Tabs>
                    <WhiteSpace />
                </div>
        </div>
    }
}
export default withRouter(HouseDetail);