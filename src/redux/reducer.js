
import { combineReducers } from 'redux'
import {ADDCOUNT,MINUSCOUNT,CHECKDED,ALLCHECK} from './actions'

const initialState = {
    checkdedflaglist:[]
}
const checkded=(state=initialState.checkdedflaglist,actions)=>{

    switch(actions.type){
        case CHECKDED: actions.flaglist[actions.ind]=!actions.flaglist[actions.ind]
            return actions.flaglist
        ;break;
        case ALLCHECK: 
        for(var i=0;i<actions.flaglist.length;i++){
            actions.flaglist[i]=!actions.flag
        }
        return actions.flaglist;break;
        default:return state
    }
}


export default combineReducers({
    checkded
})