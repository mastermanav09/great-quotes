import { useRef, useEffect } from "react";
import useHttp from "../hooks/use-http";
import classes from "./NewCommentForm.module.css";
import { addComment } from "../lib/api";
import LoadingSpinner from "../UI/LoadingSpinner";

const NewCommentForm = (props) => {
  const { sendRequest, status, error } = useHttp(addComment);
  const commentTextRef = useRef();

  const { addedComment } = props;

  useEffect(() => {
    if (status === "completed" && !error) {
      addedComment();
    }
  }, [status, addedComment, error]);

  const submitFormHandler = (event) => {
    event.preventDefault();

    const quoteObj = {
      quoteId: props.quoteId,
      commentData: commentTextRef.current.value,
    };

    sendRequest(quoteObj);
  };

  if (status === "pending") {
    return (
      <div className="centered">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <form className={classes.form} onSubmit={submitFormHandler}>
      <div className={classes.control}>
        <label htmlFor="comment">Your Comment</label>
        <textarea id="comment" rows="5" ref={commentTextRef}></textarea>
      </div>
      <div className={classes.actions}>
        <button className="btn">Add Comment</button>
      </div>
    </form>
  );
};

export default NewCommentForm;
