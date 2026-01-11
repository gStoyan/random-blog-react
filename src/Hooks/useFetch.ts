import { useState, useEffect, useReducer } from "react";
import User from "../Models/User";
import Blog from "../Models/Blog";

//initialSet is set to empty.
//When the reducer function is called, the state is set to the result that was fetched from the API.
const initialState = {
  loading: true,
  error: "",
  data: [],
};
const reducer = (state: any, action: any) => {
  console.log("action", action);
  switch (action.type) {
    case "FETCH_SUCCESS":
      return {
        loading: false,
        data: action.payload,
        error: "",
      };
    case "FETCH_ERROR":
      return {
        loading: false,
        data: [],
        error: "Something went wrong!",
      };
    default:
      return state;
  }
};

const useFetch = (url: any) => {
  //state is set to initial state when initialised.
  //When dispatch is called, the reducer function is called with the current state and the action.
  //The reducer function returns the new state based on the action type.
  //The new state is then set to the state variable.
  const [state, dispatch] = useReducer(reducer, initialState);
  useEffect(() => {
    let result: any;
    const fetchData = async () => {
      try {
        const response = await fetch(url);
      } catch (error) {
        dispatch({ type: "FETCH_ERROR" });
      } finally {
        dispatch({ type: "FETCH_SUCCESS", payload: result });
      }
    };

    fetchData();
  }, [url]);
  return state;
};

export default useFetch;
