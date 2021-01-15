import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../utility";

const initialState = {
	valueCommentBox: "",
	valueGridTextBox: "",
	valueSigleTextBox: "",
	valueGridSigleChoise: "",
	valueGridMultiChoise: "",
	valueGridSigleText: "",
	valueMultiChoise: "",
	valueSigleChoise: "",
};

const setValueCommentBox = (state, action) => {
	const updatedState = updateObject(state, { valueCommentBox: action.value });
	return updateObject(state, updatedState);
};

const setValueGridTextBox = (state, action) => {
	const updatedState = updateObject(state, {
		valueGridTextBox: action.value,
	});
	return updateObject(state, updatedState);
};

const setValueGridSigleChoise = (state, action) => {
	const updatedState = updateObject(state, {
		valueGridSigleChoise: action.value,
	});
	return updateObject(state, updatedState);
};
const setValueSigleTextBox = (state, action) => {
	const updatedState = updateObject(state, {
		valueSigleTextBox: action.value,
	});
	return updateObject(state, updatedState);
};

const setValueGridMultiChoise = (state, action) => {
	const updatedState = updateObject(state, {
		valueGridMultiChoise: action.value,
	});
	return updateObject(state, updatedState);
};
const setValueGridSigleText = (state, action) => {
	const updatedState = updateObject(state, {
		valueGridSigleText: action.value,
	});
	return updateObject(state, updatedState);
};
const setValueMultiChoise = (state, action) => {
	const updatedState = updateObject(state, {
		valueMultiChoise: action.value,
	});
	return updateObject(state, updatedState);
};
const setValueSigleChoise = (state, action) => {
	const updatedState = updateObject(state, {
		valueSigleChoise: action.value,
	});
	return updateObject(state, updatedState);
};

const reducer = (state = initialState, action) => {
	switch (action.type) {
		case actionTypes.ADD_STATE_COMMENT_BOX:
			return setValueCommentBox(state, action);
		case actionTypes.ADD_STATE_GRID_TEXT_BOX:
			return setValueGridTextBox(state, action);
		case actionTypes.ADD_STATE_SIGLE_TEXT_BOX:
			return setValueSigleTextBox(state, action);
		case actionTypes.ADD_STATE_GRID_SIGLE_CHOISE:
			return setValueGridSigleChoise(state, action);
		case actionTypes.ADD_STATE_GRID_MULTI_CHOISE:
			return setValueGridMultiChoise(state, action);
		case actionTypes.ADD_STATE_GRID_SIGLE_TEXT:
			return setValueGridSigleText(state, action);
		case actionTypes.ADD_STATE_MULTI_CHOICE:
			return setValueMultiChoise(state, action);
		case actionTypes.ADD_STATE_SIGLE_CHOICE:
			return setValueSigleChoise(state, action);
		default:
			return state;
	}
};

export default reducer;
