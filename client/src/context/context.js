import React, { useState, useEffect, useReducer } from "react";
import axios from "axios";
import { CALL_API, SUCCESS, ERROR } from "./actions/types";
import Reducer from "./reducer.js";

export const DataContext = React.createContext();

const initialState = {
  data: "",
  loading: false,
  error: false,
};

export function DataProvider({ children }) {
  const [state, dispatch] = useReducer(Reducer, initialState);
  let [mainTags, setMainTags] = useState({});
  let [tags, setTags] = useState({});

  const fetchData = async (selectTags) => {
    try {
      dispatch({ type: CALL_API });
      let response = await axios.get(
        process.env.NODE_ENV === "production"
          ? "https://aws-polymer-search.herokuapp.com/repos"
          : "http://localhost:5000/repos",
        { params: selectTags }
      );
      dispatch({ type: SUCCESS, payload: response.data });
    } catch (err) {
      dispatch({ type: ERROR });
    }
  };

  const setTagMain = (paramsObj) => {
    let params = { ...paramsObj };

    setMainTags({ ...params });
    for (let key in params) {
      params[key] = params[key].join(",");
    }
    fetchData(params);
  };

  useEffect(() => {
    fetchData({});
  }, []);

  return (
    <>
      <DataContext.Provider
        value={{
          data: state.data,
          loading: state.loading,
          error: state.error,
          setTagMain,
          mainTags: mainTags,
          tags: tags,
          setTags,
        }}
      >
        {children}
      </DataContext.Provider>
    </>
  );
}
