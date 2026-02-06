import React, { useState } from "react";
import useFetch from "../../Hooks/useFetch";
import Blog from "../../Models/Blog";
import Comment from "./Comment";

const Home = () => {
  const state = useFetch("localhost:3000/blogs");
  const testBlogs: Blog[] = [
    {
      id: 1,
      title: "Understanding MiCA Regulation",
      body: "MiCA introduces a unified regulatory framework for digital assets across the EU...",
      created_at: "2025-01-10",
    },
    {
      id: 2,
      title: "Crypto Market in 2025",
      body: "The crypto market continues to evolve with new compliance requirements...",
      created_at: "2025-02-05",
    },
    {
      id: 3,
      title: "What Are Stablecoins?",
      body: "Stablecoins aim to maintain a stable value and play a key role in crypto regulations...",
      created_at: "2025-03-01",
    },
  ];

  const blogs = Array.isArray(state?.data) ? state.data : testBlogs;
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
        : [...visiblePostIds, id],
    );
  };

  return (
    <div className="blog-index-container">
      <h1>All Blog Posts</h1>
      <div className="blog-posts">
        {blogs.map((blog: Blog) => (
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
