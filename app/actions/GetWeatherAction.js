import * as TYPES from '../ActionType'

const getTalkTimeAction = (data = {}) =>{
    return {
        type : TYPES.ACTION_GETALK_TIME,
        bean : data,
        message : '获取成功'
    }
}

export const actionGetTalkTime = (data) => {
    return (dispatch) => {
        dispatch(getTalkTimeAction(data));
    }
}