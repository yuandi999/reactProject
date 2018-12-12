import React,{Component} from "react"
import {withRouter} from "react-router-dom"

import back from "../../img/back.png"
import down from "../../img/down.png"
import axios from "axios";

class Houselist extends Component{
    constructor(){
        super();
        this.state={
            data:[]
        }
    }
    goback(){
        this.props.history.goBack()
    }
    Gotodetail(item){
        let {history} = this.props;
        // console.log(this.props)
        history.push({
            pathname:"HouseDetail/"+item.id,
            state:item
        })
      }
    componentWillMount(){
        const houseItem = JSON.parse(localStorage.getItem('houseItem'));
        let city = houseItem[1]
        console.log(city,27)
        console.log(this.props,15)
        let val = this.props.history.location.val;
        axios.get("/ItemList/fbb-mobile-client/api/building/findBuildingList",{
            params:{
                pageNo:1,
                pageSize:15,
                buildingType:val,
                minPrice:'',
                minArea:'',
                maxArea:'',
                zoneId:'',
                city:city
            }
            
        })
        .then(arr=>{
                console.log(arr.data.data.list,34)
                this.setState({
                    data : arr.data.data.list
                })
            })
            .catch(err=>{
                console.log(err)
            })
    }
    render(){
        return <div>
                    <div className="HL-header">
                        <i onClick={this.goback.bind(this)}><img src={back} /></i>
                        <input type="text" className="seach" placeholder="输入楼盘名称"/>
                </div>
                <ul className="HL-filtrate">
                    <li>区域<img src={down} /></li>
                    <li>价格<img src={down} /></li>
                    <li>类型<img src={down} /></li>
                    <li>面积<img src={down} /></li>
                </ul>
                <ul className="HL-buildingListContent">
                    {this.state.data.map(item=>(
                        
                        <li className="HL-buildingListContentItem" key={item.id} onClick={this.Gotodetail.bind(this,item)}>
                            <img src={item.banner} alt=""/>
                            <span className="right">
                            <span className="HL-buildingListContentItemTitle">{item.buildingName}</span>
                            <span className="U"><u>{item.generalScore}分</u><u>{item.minBuildingArea}-{item.maxBuildingArea}m²</u><u>{item.zoneName}</u></span><br></br>
                            <span className="HL-buildingListContentItemPrice">{item.avgPrice}</span>
                        </span>
                </li>
                 ))
            }
            </ul>
        </div>
    }
    
    
}
export default withRouter(Houselist)