import "./Comment.css";

interface CommentProps {
  comments?: string[];
}

const Comment: React.FC<CommentProps> = ({ comments }) => {
  const testComments = comments || ["Great insight on MiCA regulations!", "Very informative article.", "Thanks for the detailed explanation!"];

  return (
    <div className="comments-container">
      <h3 className="comments-title">Comments ({testComments.length})</h3>
      <div className="comments-list">
        {testComments.map((comment, index) => (
          <div key={index} className="comment-item">
            <div className="comment-avatar">
              {String.fromCharCode(65 + (index % 26))}
            </div>
            <div className="comment-body">
              <p className="comment-text">{comment}</p>
              <small className="comment-meta">Anonymous • Just now</small>
            </div>
          </div>
        ))}
      </div>
      <form className="comment-form">
        <textarea
          className="comment-input"
          placeholder="Write a comment..."
          rows={3}
        />
        <button type="submit" className="btn btn-primary">
          Post Comment
        </button>
      </form>
    </div>
  );
};

export default Comment;
