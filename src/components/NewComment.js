import React, { useState } from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { writeCommentAPI } from "../reducer/actions";

const SCCommentDiv = styled.div`
  max-width: 40rem;
  margin: 1rem auto;
  padding-left: 2rem;
  display: flex;
  justift-content: flex-start;
  align-items: center;
  gap: 0.5rem;
`;

function NewComment({ user, postId }) {
  const [note, setNote] = useState("");
  const dispatch = useDispatch();

  const searchedPost = useSelector((store) => store.posts).find(
    (post) => post.postId == postId
  );

  const token = useSelector((state) => state.token);

  function handleChange(e) {
    setNote(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    let newComment = {
      commentNote: note,
      userId: user.subject,
      postId: postId,
    };

    let newObj = {
      comment: newComment,
      token: token,
    };

    dispatch(writeCommentAPI(newObj));
  }

  return (
    <SCCommentDiv>
      <img
        src={user.avatarPhoto}
        style={{
          display: "block",
          width: "3rem",
          height: "3rem",
          borderRadius: "50%",
        }}
      />
      <p style={{ fontWeight: "bold" }}>{user.username}</p>
      <form onSubmit={handleSubmit}>
        <input
          placeholder="Write your comments"
          style={{ marginLeft: "1rem", padding: "0.5rem" }}
          onChange={handleChange}
          value={note}
        />
        <button
          style={{
            marginLeft: "1rem",
            padding: "0.5rem",
            borderRadius: "0.5rem",
          }}
          type="submit"
        >
          Yorumla
        </button>
      </form>
    </SCCommentDiv>
  );
}

export default NewComment;
