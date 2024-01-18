import React, { useState, useEffect } from 'react';
import useFetch from '../Hooks/useFetch';

const Home = () => {
  const hardCodedData = [
    { "id": 1, "title": "Testing Headline", "body": "This is the test text for the body of the blog post." },
    { "id": 2,"title": "Homelander", "body": "16 - 16 - 16 - 16" },
    { "id": 3,"title": "For", "body": "Blog Post Test" },
  ]
  const { data, loading, error } = useFetch(null, hardCodedData);


  // useEffect(() => {
  //   const fetchPosts = async () => {
  //     try {
  //       // // const response = await fetch('https://api.example.com/posts');
  //       // const data = await response.json();
  //       const data = [
  //         { "title": "Testing Headline", "body": "This is the test text for the body of the blog post." },
  //         { "title": "Homelander", "body": "16 - 16 - 16 - 16" },
  //         { "title": "For", "body": "Blog Post Test" },
  //       ]
  //       useFetch(null, data);
  //     } catch (error) {
  //       console.error('Error fetching posts:', error);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };


if (error) {
  return <p>Error: {error.message}</p>;
}

return (
  <div>

    {loading ? (
      <p>Loading...</p>
    ) : (
      <ul>
        {data.map((post) => (
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
