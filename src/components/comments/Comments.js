import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import classes from "./Comments.module.css";
import NewCommentForm from "./NewCommentForm";
import useHttp from "../hooks/use-http";
import { getAllComments } from "../lib/api";
import LoadingSpinner from "../UI/LoadingSpinner";
import CommentsList from "./CommentsList";
import { useCallback } from "react";

const Comments = () => {
  const [isAddingComment, setIsAddingComment] = useState(false);
  const {
    sendRequest,
    status,
    data: loadedComments,
    error,
  } = useHttp(getAllComments, true);
  const params = useParams();

  useEffect(() => {
    sendRequest(params.quoteId);
  }, [sendRequest, params.quoteId]);

  const startAddCommentHandler = () => {
    setIsAddingComment(true);
  };

  const addedComment = useCallback(() => {
    sendRequest(params.quoteId);
    setIsAddingComment(false);
  }, [sendRequest, params.quoteId]);

  let comments;

  if (status === "pending") {
    return (
      <div className="centered">
        <LoadingSpinner />
      </div>
    );
  }

  if (error) {
    comments = <h3>{error}</h3>;
  }

  if (status === "completed" && loadedComments) {
    comments = <CommentsList comments={loadedComments} />;
  }

  if (
    status === "completed" &&
    (loadedComments.length === 0 || !loadedComments) &&
    !isAddingComment
  ) {
    comments = <h2 className="centered">No Comments found!</h2>;
  }

  return (
    <section className={classes.comments}>
      <h2>User Comments</h2>
      {!isAddingComment && (
        <button className="btn" onClick={startAddCommentHandler}>
          Add a Comment
        </button>
      )}
      {isAddingComment && (
        <NewCommentForm quoteId={params.quoteId} addedComment={addedComment} />
      )}
      {comments}
    </section>
  );
};

export default Comments;
