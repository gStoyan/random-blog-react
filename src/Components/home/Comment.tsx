const Comment = () => {
  const testComments: string[] = ["comment1", "comment2", "comment3"];

  return (
    <div className="comments-content">
      {testComments.map((comment) => (
        <div className="comment-content">comment</div>
      ))}
    </div>
  );
};

export default Comment;
