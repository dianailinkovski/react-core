import { FETCH_CATEGORIES, NEW_CATEGORY } from "../actions/types";
//not active page
const initialState = {
  //categories: [],
  //category: {}
};

export default function(state = initialState, action) {
  switch (action.type) {
    case FETCH_CATEGORIES:
      console.log("FETCH_CATEGORIES reducer");
      return { ...state, categories: action.payload };
    default:
      return state;
  }
}
