import React, { useState } from "react";
import useFetch from "../../../Hooks/useFetch";
import Blog from "../../../Models/Blog";
import Comment from "./Comment";
import { deleteBlog } from "../../../Services/blogServices";
import { useAuth } from "../../../Hooks/useAuth";
import "./Home.css";

const Home = () => {
  const { isAuthenticated } = useAuth();
  const state = useFetch(
    "https://randomblog.grancharovstoyan.deno.net/api/blogs",
  );
  const [expandedPostId, setExpandedPostId] = useState<string | null>(null);
  const [showCommentsForPost, setShowCommentsForPost] = useState<string | null>(
    null,
  );
  const [deletingBlogId, setDeletingBlogId] = useState<string | null>(null);
  const [deleteError, setDeleteError] = useState<string | null>(null);

  const blogs = Array.isArray(state?.data) ? state.data : [];

  const togglePostExpand = (id: string) => {
    setExpandedPostId(expandedPostId === id ? null : id);
    if (expandedPostId !== id) {
      setShowCommentsForPost(null);
    }
  };

  const toggleComments = (id: string) => {
    setShowCommentsForPost(showCommentsForPost === id ? null : id);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const handleDelete = async (slug: string, id: string) => {
    if (!window.confirm("Are you sure you want to delete this blog?")) {
      return;
    }

    setDeletingBlogId(id);
    setDeleteError(null);

    const result = await deleteBlog(slug);

    if (result.success) {
      // Refresh the page to show updated blog list
      window.location.reload();
    } else {
      setDeleteError(result.error || "Failed to delete blog.");
      setDeletingBlogId(null);
    }
  };

  if (state.error) {
    return (
      <div className="home-container">
        <div className="error-message">Error: {state.error}</div>
      </div>
    );
  }

  if (state.loading) {
    return (
      <div className="home-container">
        <div className="loading-message">Loading blogs...</div>
      </div>
    );
  }

  if (!blogs || blogs.length === 0) {
    return (
      <div className="home-container">
        <div className="empty-message">No blogs found.</div>
      </div>
    );
  }

  return (
    <div className="home-container">
      <div className="blog-hero">
        <h1 className="blog-title">Latest Articles</h1>
        <p className="blog-subtitle">
          Explore insightful articles on blockchain and digital assets
        </p>
      </div>

      {deleteError && <div className="error-message">{deleteError}</div>}

      <div className="blog-grid">
        {blogs.map((blog: Blog) => (
          <article key={blog.id} className="blog-card">
            <div className="blog-header">
              <h2 className="blog-card-title">{blog.title}</h2>
              <div className="blog-header-actions">
                <time className="blog-date">{formatDate(blog.createdAt)}</time>
                {isAuthenticated && (
                  <button
                    className="btn btn-delete"
                    onClick={() => handleDelete(blog.slug, blog.id)}
                    disabled={deletingBlogId === blog.id}
                  >
                    {deletingBlogId === blog.id ? "Deleting..." : "Delete"}
                  </button>
                )}
              </div>
            </div>

            <p className="blog-excerpt">{blog.content}</p>

            <button
              className="btn btn-primary"
              onClick={() => togglePostExpand(blog.id)}
            >
              {expandedPostId === blog.id ? "Show Less" : "Read More"}
            </button>

            {expandedPostId === blog.id && (
              <div className="blog-expanded-content">
                <div className="blog-full-content">
                  <p>{blog.content}</p>
                </div>

                <button
                  className="btn btn-secondary"
                  onClick={() => toggleComments(blog.id)}
                >
                  {showCommentsForPost === blog.id
                    ? "Hide Comments"
                    : "Show Comments"}
                </button>

                {showCommentsForPost === blog.id && (
                  <div className="comments-section">
                    <Comment />
                  </div>
                )}
              </div>
            )}
          </article>
        ))}
      </div>
    </div>
  );
};

export default Home;
