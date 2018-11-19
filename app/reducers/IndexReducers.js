import { combineReducers } from 'redux';
import getTalkTime from './item/GetWeatherReducer';

const rootReducer = combineReducers({
    getTalkTime
});

export default rootReducer;