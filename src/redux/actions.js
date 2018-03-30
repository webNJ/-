// action => 类型，执行函数
export const ADDCOUNT = 'ADDCOUNT';
export const addCount = (data) => {
    return {
        type: ADDTODO,
        data
    }
}

export const MINUSCOUNT='MINUSCOUNT';
export const minuscount=data=>{
    return {
        type:MINUSCOUNT,
        data
    }
}

export const CHECKDED='CHECKDED'
export const checkded=(flaglist,ind)=>{
    return{
        type:CHECKDED,
        flaglist,
        ind
    }
}
export const ALLCHECK='ALLCHECK'
export const allcheck=(flaglist,flag)=>{
   
    return{
        type:ALLCHECK,
        flaglist,
        flag
    }
}
