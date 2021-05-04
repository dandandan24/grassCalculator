import { combineReducers } from 'redux';


import konvaReducer from './konvaReducer';


const rootReducer = combineReducers({
    konva : konvaReducer,
});

export default rootReducer;