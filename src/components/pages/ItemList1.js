import React,{Component} from "react";
import axios from 'axios';
import {withRouter} from 'react-router-dom';

class ItemList1 extends Component{
    constructor(){
        super()
        this.state = {
            hotList:[],
            city:[
                {
                    cityname:'珠海',
                    cityId:440400
                }
            ]
        }
    }
    Gotodetail(item){
        // console.log(this.props,19);
        let {history} = this.props;
        // console.log(item)
        history.push({
            pathname:"/HouseDetail/"+item.id,
            state:item
        })
      }
        
    componentWillMount(){
        const houseItem = JSON.parse(localStorage.getItem('houseItem'));
        console.log(houseItem[1],29);
        let cityid = houseItem[1];
        axios.get('/ItemList/fbb-mobile-client/api/homepage/getHomePage',{
            params:{
                city:cityid
            }
        })
        .then(res=>{
            let data = res.data.data.hotList.list;
            
            this.setState({
                hotList:data
            })
            console.log(data);
        })
        .catch(err=>{
            console.log(err)
        })
    }
    render(){
        return <div className="buildingType">
        
       <ul className="buildingListContent">
             {this.state.hotList.map(item=>(
                
                <li className="buildingListContentItem" key={item.id} onClick={this.Gotodetail.bind(this,item)}>
                    <img src={item.banner} alt=""/>
                    <span className="right">
                    <span className="buildingListContentItemTitle">{item.buildingName}</span>
                    <span className="U"><u>{item.generalScore}分</u><u>{item.minBuildingArea}-{item.maxBuildingArea}m²</u><u>{item.zoneName}</u></span><br></br>
                    <span className="buildingListContentItemPrice">{item.avgPrice}</span>
                </span>
                </li>
                 ))
            }
            </ul>
        </div>
    }
}
ItemList1 = withRouter(ItemList1)
export default ItemList1 ;