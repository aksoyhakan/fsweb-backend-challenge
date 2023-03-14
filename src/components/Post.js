import React from "react";
import styled from "styled-components";
import Comment from "./Comment";

const SCPostDiv = styled.div`
  max-width: 40rem;
  margin: 2rem auto;
  border: 0.25rem solid black;
  box-shadow: 1rem 1rem 2rem grey;
`;

const SCUserDiv = styled.div`
  width: 90%;
  margin: 1rem auto;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 1rem;
`;

function Post({ data }) {
  return (
    <SCPostDiv>
      <SCUserDiv>
        <img
          style={{
            display: "block",
            width: "4rem",
            height: "4rem",
            borderRadius: "50%",
          }}
          src={data.avatarPhoto}
        />
        <p
          style={{
            display: "block",
            width: "25%",
            textAlign: "left",
            fontSize: "1.25rem",
            fontWeight: "bold",
          }}
        >
          {data.username}
        </p>
      </SCUserDiv>
      <img
        src={data.postPhoto}
        style={{ width: "100%", margin: "2rem auto", display: "block" }}
      />
      <p style={{ margin: "0rem 0rem 1rem 1.5rem", fontSize: "1.25rem" }}>
        {data.postNote}
      </p>
      <p style={{ margin: "0rem 0rem 2rem 1.5rem", fontSize: "1rem" }}>
        {data.likeNumber} likes
      </p>
      {data.comments.map((comment) => (
        <Comment comment={comment} />
      ))}
    </SCPostDiv>
  );
}

export default Post;
