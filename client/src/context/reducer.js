import { CALL_API, SUCCESS, ERROR } from "./actions/types";

const initialState = {
  loading: true,
  error: false,
};

export default function Reducer(state = initialState, action) {
  switch (action.type) {
    case CALL_API: {
      return {
        ...state,
        loading: true,
      };
    }
    case SUCCESS: {
      return {
        ...state,
        loading: false,
        data: action.payload,
      };
    }
    case ERROR: {
      return {
        ...state,
        loading: false,
        error: true,
      };
    }
    default: {
      return state;
    }
  }
}
