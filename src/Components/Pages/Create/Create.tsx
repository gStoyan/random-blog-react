import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createBlog } from "../../../Services/blogServices";
import "./Create.css";

const Create: React.FC = () => {
  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const [tags, setTags] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const tagsArray = tags
        .split(",")
        .map((tag) => tag.trim())
        .filter(Boolean);

      const result = await createBlog({
        title,
        content,
        tags: tagsArray.length > 0 ? tagsArray : ["general"],
      });

      if (!result.success) {
        setError(result.error || "Failed to create blog. Please try again.");
        return;
      }

      console.log("Blog created successfully:", result.data);

      // Reset form
      setTitle("");
      setContent("");
      setTags("");

      // Navigate to home page
      navigate("/");
    } catch (error: any) {
      console.error("Error creating blog:", error);
      setError("Failed to create blog. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="blog-creation-container">
      <h1>Create a New Blog Post</h1>

      {error && <div className="error-message">{error}</div>}

      <form onSubmit={handleSubmit} className="blog-form">
        <div className="blog-form-group">
          <label htmlFor="title">Title</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter blog title"
            required
            disabled={isLoading}
          />
        </div>

        <div className="blog-form-group">
          <label htmlFor="content">Content</label>
          <textarea
            id="content"
            rows={10}
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Write your blog content..."
            required
            disabled={isLoading}
          ></textarea>
        </div>

        <div className="blog-form-group">
          <label htmlFor="tags">Tags (comma-separated)</label>
          <input
            type="text"
            id="tags"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
            placeholder="e.g., dev, tech, tutorial"
            disabled={isLoading}
          />
        </div>

        <div className="form-button-group">
          <button
            type="submit"
            className="form-submit-btn"
            disabled={isLoading}
          >
            {isLoading ? "Publishing..." : "Publish"}
          </button>

          <button
            type="button"
            className="form-reset-btn"
            onClick={() => {
              setTitle("");
              setContent("");
              setTags("");
              setError("");
            }}
            disabled={isLoading}
          >
            Reset
          </button>
        </div>
      </form>
    </div>
  );
};

export default Create;
