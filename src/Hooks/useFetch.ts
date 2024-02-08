import { useState, useEffect, useReducer } from 'react';

//initialSet is set to empty. 
//When the reducer function is called, the state is set to the result that was fetched from the API.
const initialState = {
  loading: true,
  error: '',
  posts: []
}
const reducer = (state: any, action: any) => {
  console.log("action", action)
  switch (action.type) {
    case 'FETCH_SUCCESS':
      return {
        loading: false,
        posts: action.payload,
        error: ''
      }
    case 'FETCH_ERROR':
      return {
        loading: false,
        posts: [],
        error: 'Something went wrong!'
      }
    default:
      return state
  }
}

const useFetch = (url: any) => {
  //state is set to initial state when initialised. 
  //When dispatch is called, the reducer function is called with the current state and the action. 
  //The reducer function returns the new state based on the action type. 
  //The new state is then set to the state variable.
  const [state, dispatch] = useReducer(reducer, initialState)
  useEffect(() => {
    let result: any;
    const fetchData = async () => {
      try { 
          const response = await fetch(url);
          result = await response.json();
          console.log("result", result)
      } catch (error) {
        dispatch({type: 'FETCH_ERROR'})
        console.log("error while fetching data from url", error)
      } finally {
        dispatch({type: 'FETCH_SUCCESS', payload: result})
      }
    };

    fetchData();
  }, [url]);
  return state;
};

export default useFetch;
