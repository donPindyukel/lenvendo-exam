import { blocksConstants } from '../constants';

const initialState = {
	array: []
};

export function blocks(state = initialState, action) {
	switch (action.type) {
		case blocksConstants.ADD_BLOCK: {
			return {...state, array:[...state.array, action.payload]};
		}
		case blocksConstants.DELETE_BLOCK: {
			return {...state, array: [...state.array.filter(item => item.id !== action.payload)]};
		}
		case blocksConstants.CHANGE_BACKGROUND: {
			state.array.forEach(item => item.color = (item.id === action.payload.id) ? action.payload.color : item.color);
			return {...state, ...{array:[...state.array]}};
		}
		case blocksConstants.SELECT_BLOCK: {
			state.array.forEach(item => item.selected = (item.id === action.payload) ? !item.selected : item.selected);
			return {...state, ...{array:[...state.array]}};
		}
		default: return state
	}
}