import React from "react";
import styled from "styled-components";
import Comment from "./Comment";
import NewComment from "./NewComment";
import { useDispatch, useSelector } from "react-redux";
import { likePostAPI, clickComment } from "../reducer/actions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faComment, faHeart } from "@fortawesome/free-regular-svg-icons";

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

const SCButtonDiv = styled.div`
  width: 90%;
  margin: 1rem auto;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 1rem;
`;

function Post({ data }) {
  const token = useSelector((state) => state.token);
  const userInfo = useSelector((store) => store.currentUser);
  const clickedPostComment = useSelector((store) => store.clickedPostComment);
  const dispatch = useDispatch();

  function handleLike() {
    let newdata = {
      post: {
        postId: data.postId,
        postPhoto: data.postPhoto,
        postNote: data.postNote,
        likeNumber: data.likeNumber + 1,
        userId: data.userId,
      },
      token: token,
    };
    dispatch(likePostAPI(newdata));
  }

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
      <SCButtonDiv>
        <FontAwesomeIcon
          style={{ display: "block", fontSize: "1.5rem" }}
          icon={faHeart}
          onClick={handleLike}
        />
        <FontAwesomeIcon
          style={{ display: "block", fontSize: "1.5rem" }}
          icon={faComment}
          onClick={() => {
            dispatch(clickComment(data.postId));
          }}
        />
      </SCButtonDiv>
      <p style={{ margin: "0rem 0rem 2rem 1.5rem", fontSize: "1rem" }}>
        {data.likeNumber} likes
      </p>
      {data.comments.map((comment) => (
        <Comment comment={comment} />
      ))}
      {clickedPostComment == data.postId && (
        <NewComment postId={data.postId} user={userInfo}></NewComment>
      )}
    </SCPostDiv>
  );
}

export default Post;
