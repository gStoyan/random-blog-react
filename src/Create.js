import React, { useState } from 'react';

const Create = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleContentChange = (e) => {
    setContent(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Perform the actual logic to save the blog post (e.g., send data to a server)

    // For demonstration purposes, we'll just log the data to the console
    console.log('Blog post created:', { title, content });

    // Optionally, you can clear the form fields after submission
    setTitle('');
    setContent('');
  };

    return (
        <div>
          <h2>Create a New Blog Post</h2>
          <form onSubmit={handleSubmit}>
            <div>
              <label htmlFor="title">Title:</label>
              <input
                type="text"
                id="title"
                value={title}
                onChange={handleTitleChange}
                required
              />
            </div>
            <div>
              <label htmlFor="content">Content:</label>
              <textarea
                id="content"
                value={content}
                onChange={handleContentChange}
                required
              />
            </div>
            <button type="submit">Create Post</button>
          </form>
        </div>
      );
    };
    

export default Create;

