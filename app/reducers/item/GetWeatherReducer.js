import * as TYPES from '../../ActionType'

/**
 * 初始化一个默认都实体类
 */

 const initialState = {
     status:'init',
     isSuccess:false,
     bean:null,
     message:''
 }

 export default function getTalkTime(state = initialState, action){
     return Object.assign({},state,{
         status: 'init',
         isSuccess: true,
         bean : action.bean,
         message : action.message
     })
 }