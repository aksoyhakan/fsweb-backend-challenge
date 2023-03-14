import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getPostAPI } from "../reducer/actions";
import { useRouteMatch, useHistory } from "react-router-dom";
import Post from "./Post";
import styled from "styled-components";

const SCPostsDiv = styled.div`
  max-width: 50rem;
  margin: 1rem auto;
  display: flex;
  flex-wrap: wrap;
`;

function Posts() {
  const posts = useSelector((store) => store.posts);
  const token = useSelector((store) => store.token);
  const dispatch = useDispatch();
  const { url } = useRouteMatch();
  const { push } = useHistory();

  useEffect(() => {
    let data = { token: token, path: url };
    dispatch(getPostAPI(data));
  }, []);

  return (
    <SCPostsDiv>
      {posts.map((post) => (
        <Post data={post} />
      ))}
    </SCPostsDiv>
  );
}

export default Posts;
