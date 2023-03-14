import React from "react";
import styled from "styled-components";

const SCCommentDiv = styled.div`
  max-width: 40rem;
  margin: 1rem auto;
  padding-left: 2rem;
  display: flex;
  justift-content: flex-start;
  align-items: center;
  gap: 0.5rem;
`;

function Comment({ comment }) {
  return (
    <SCCommentDiv>
      <img
        src={comment.avatarPhoto}
        style={{
          display: "block",
          width: "3rem",
          height: "3rem",
          borderRadius: "50%",
        }}
      />
      <p style={{ fontWeight: "bold" }}>{comment.username}</p>
      <p style={{ marginLeft: "1rem" }}>{comment.commentNote}</p>
    </SCCommentDiv>
  );
}

export default Comment;
