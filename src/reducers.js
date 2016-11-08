import {
  SET_TEXT, CLEAR_TEXT
} from './actions';

const initial = {
  text: ''
};


function reducer(state = initial, action) {
  switch (action.type) {
  case SET_TEXT:
    return { ...state,
             text: action.text
           }
  case CLEAR_TEXT:
    return { ...state,
             text: action.text
           }
  default:
    return state
  }
}

export default reducer;
