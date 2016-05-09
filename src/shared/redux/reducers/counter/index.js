import * as actionTypes from '../../actionTypes';


const initialState = {
  count: 0
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case actionTypes.INCREMENT:
      const {count} = state;
      return {
        count: count + 1
      };
    default:
      return state;
  }
}

export function increment() {
  return {
    type: actionTypes.INCREMENT
  };
}