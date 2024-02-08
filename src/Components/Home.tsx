import React, { useState, useEffect } from 'react';
import useFetch from '../Hooks/useFetch';

const Home = () => {
  const state = useFetch("https://jsonplaceholder.typicode.com/posts");

if (state.error) {
  return <p>Error: {state.error.message}</p>;
}

return (
  console.log("data", state.posts),
  <div>

    {state.loading ? (
      <p>Loading...</p>
    ) : (
      <ul>
        {console.log(state.posts)}{state.posts.map((post: any) => (
          <li key={post.id}>
            <h2>{post.title}</h2>
            <p>{post.body}</p>
          </li>
        ))}
      </ul>
    )}
  </div>
);

};

export default Home;
