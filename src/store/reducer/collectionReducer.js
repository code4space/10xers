import { GET_ITEMS, TOKEN, GET_DETAILS, STATS } from "../actions/typeAction";

const initialState = {
  items: {},
  detail: {},
  tokens: {},
  stats: []
};

function collectionReducer(state = initialState, action) {
  switch (action.type) {
    case GET_ITEMS:
      return {
        ...state,
        items: action.items,
      };
    case GET_DETAILS:
      return {
        ...state,
        detail: action.detail,
      };
    case TOKEN:
      return {
        ...state,
        tokens: action.tokens,
      };
    case STATS:
      return {
        ...state,
        stats: action.stats,
      };

    default:
      return state;
  }
}

export default collectionReducer;
