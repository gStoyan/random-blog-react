import React, { useState, useEffect } from 'react';
import useFetch from '../Hooks/useFetch';
import Blog from '../Models/Blog';

const Home = () => {
  const state = useFetch("https://jsonplaceholder.typicode.com/posts");
  const blogs: Blog[] = state.data;
if (state.error) {
  return <p>Error: {state.error.message}</p>;
}

return (
  console.log("data", state.data),
  <div>

    {state.loading ? (
      <p>Loading...</p>
    ) : (
      <ul>
        {console.log("blogs", blogs)}
         {state.data.map((blog: any) => (
          <li key={blog.id}>
            <h2>{blog.title}</h2>
            <p>{blog.content_text}</p>
          </li>
        ))}
      </ul>
    )}
  </div>
);

};

export default Home;
