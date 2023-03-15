import React, { useEffect } from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import Post from "./Post";
import { getPostAPI } from "../reducer/actions";

const SCMainDiv = styled.div`
  max-width: 50rem;
  margin: 3rem auto;
  text-align: center;
`;

const SCPostsDiv = styled.div`
  max-width: 50rem;
  margin: 1rem auto;
  display: flex;
  flex-wrap: wrap;
`;

function MainPage() {
  const data = useSelector((state) => state.mainPage);
  const userData = useSelector((state) => state.currentUser);
  const posts = useSelector((state) => state.posts);
  const token = useSelector((state) => state.token);
  const dispatch = useDispatch();

  useEffect(() => {
    let data = { token: token, path: "/api/posts" };
    dispatch(getPostAPI(data));
  }, []);

  const userPosts = posts.filter((post) => {
    if (userData?.subject) return post.userId == userData.subject;
  });

  return (
    <div>
      {!userData?.role && (
        <SCMainDiv>
          <img src={data.url} />
          <p
            style={{
              fontSize: "2rem",
              margin: "2rem",
              backgroundColor: "rgb(192,192,192)",
              padding: "1rem 2rem",
              borderRadius: "3%",
            }}
          >
            {data.description}
          </p>
        </SCMainDiv>
      )}
      {userData?.role && (
        <SCMainDiv>
          <img
            src={userData.avatarPhoto}
            style={{ width: "40%", borderRadius: "5%" }}
          />
          <p
            style={{
              fontSize: "2rem",
              margin: "2rem",
              backgroundColor: "rgb(192,192,192)",
              padding: "1rem 2rem",
              borderRadius: "3%",
            }}
          >
            {userData.username}
          </p>
          {userPosts.length > 0 && (
            <SCPostsDiv>
              {userPosts.map((post, index) => (
                <Post key={index} data={post} />
              ))}
            </SCPostsDiv>
          )}
          {userPosts.length === 0 && (
            <p
              style={{
                fontSize: "2rem",
                margin: "2rem",
                backgroundColor: "rgb(192,192,192)",
                padding: "1rem 2rem",
                borderRadius: "3%",
              }}
            >
              Hiçbir postun yok...
            </p>
          )}
        </SCMainDiv>
      )}
    </div>
  );
}

export default MainPage;
