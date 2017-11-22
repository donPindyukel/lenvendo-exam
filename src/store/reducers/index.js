import { combineReducers } from 'redux';

import { blocks } from './blocks.reducer';

const rootReducer = combineReducers({
	blocks
});

export default rootReducer;