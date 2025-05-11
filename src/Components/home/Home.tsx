import React, { useState, useEffect } from "react";
import useFetch from "../../Hooks/useFetch";
import Blog from "../../Models/Blog";
import Comment from "./Comment";

const Home = () => {
  const state = useFetch("localhost:3000/blogs");

  const blogs: Blog[] = state.data;
  const [visiblePostIds, setVisiblePostIds] = useState<number[]>([]);

  const [showComments, setShowComments] = useState(false);

  const toggleComments = () => {
    setShowComments(!showComments);
  };

  if (state.error) {
    return <p>Error: {state.error.message}</p>;
  }
  const toggleContentVisibility = (id: number) => {
    setVisiblePostIds(
      visiblePostIds.includes(id)
        ? visiblePostIds.filter((visibleId) => visibleId !== id)
        : [...visiblePostIds, id]
    );
  };

  return (
    <div className="blog-index-container">
      <h1>All Blog Posts</h1>
      <div className="blog-posts">
        {blogs.map((blog) => (
          <div key={blog.id} className="blog-post">
            <h2>{blog.title}</h2>
            <button onClick={() => toggleContentVisibility(blog.id)}>
              {visiblePostIds.includes(blog.id)
                ? "Hide Content"
                : "Show Content"}
            </button>
            {visiblePostIds.includes(blog.id) && (
              <div className="blog-content">
                <p>{blog.body}</p>
                <button className="comment-button" onClick={toggleComments}>
                  {showComments ? "Hide Comments" : "Show Comments"}
                </button>
                {showComments && (
                  <div className="comments-section">
                    <Comment />
                  </div>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
