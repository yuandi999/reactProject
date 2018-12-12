
let initState = {
    tabbarStatus:true
}

let commonReducer = (state=initState,action)=>{
    switch(action.type){
        case 'CHANGE_TABBAR_STATUS':
            return {
                ...state,
                tabbarStatus:action.payload
            }
        default:
            return state;
    }
}

export default commonReducer;