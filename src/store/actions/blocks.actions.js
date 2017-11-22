import { blocksConstants } from '../constants';

export const blocksActions = {
	addBlock,
	deleteBlock,
	changeBackground,
	selectBlock
};

function addBlock(blockType) {
	return { type: blocksConstants.ADD_BLOCK, payload: blockType }
}

function deleteBlock(id) {
	return { type: blocksConstants.DELETE_BLOCK, payload: id }
}

function changeBackground(id, color) {
	return { type: blocksConstants.CHANGE_BACKGROUND, payload: {id, color} }
}

function selectBlock(id) {
	return { type: blocksConstants.SELECT_BLOCK, payload: id }
}