/**
 * create by zhaoming on 2018/11/17
 * store 的配置文件
 */
 
import {createStore, applyMiddleware} from 'redux';
import thunkMiddleware from 'redux-thunk';
import rootReducer from '../reducers/IndexReducers';
 
/**
 * 
 * 
 * 
 */
 
const createStoreWithMiddleware = applyMiddleware(thunkMiddleware)(createStore);
 
export default function configureStore(initialState) {
  const store = createStoreWithMiddleware(rootReducer, initialState);
  return store;

}