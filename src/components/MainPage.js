import React, { useEffect } from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import MainPagePost from "./MainPagePost";
import { getPostAPI, clickPost, addPostAPI } from "../reducer/actions";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

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

const SCAddPostDiv = styled.div`
  font-size: 2rem;
  margin: 2rem;
  background-color: rgb(192, 192, 192);
  padding: 1rem 2rem;
  border-radius: 3%;
  transition: all 0.5s ease-out;

  &:hover {
    background-color: rgb(120, 120, 120);
    color: white;
  }
`;

const SCLoginDiv = styled.div`
  max-width: 30rem;
  margin: 2rem auto;
  background-color: rgb(204, 229, 255);
  border: 0.15rem solid rgb(102, 178, 255);
  padding: 2rem;
`;

const SCInputDiv = styled.div`
  margin-bottom: ${(props) => (props.errorstatu ? "0.5rem" : "4.30rem")};
`;

const SCError = styled.p`
  background-color: rgb(255, 153, 153);
  padding: 0.5rem 1rem;
  border: 0.1rem solid red;
  color: rgb(255, 51, 51);
`;

const SCButton = styled.button`
  display: block;
  margin: 0rem auto;
  padding: 0.5rem 1rem;
  background-color: rgb(0, 255, 128);
  border: 0.1rem solid rgb(0, 153, 76);
  border-radius: 0.5rem;
  transition: all 0.5s ease-out;
  color: green;

  &:hover {
    background-color: rgb(0, 204, 54);
    color: rgb(0, 152, 76);
  }
`;

function MainPage() {
  const data = useSelector((state) => state.mainPage);
  const userData = useSelector((state) => state.currentUser);
  const posts = useSelector((state) => state.posts);
  const token = useSelector((state) => state.token);
  const clickPostStatus = useSelector((state) => state.clickedPost);
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    mode: "onChange",
    defaultValues: { postPhoto: "", postNote: "", userId: "" },
  });

  useEffect(() => {
    let data = { token: token, path: "/api/posts" };
    dispatch(getPostAPI(data));
  }, []);

  const userPosts = posts.filter((post) => {
    if (userData?.subject) return post.userId == userData.subject;
  });

  function onSubmit(data) {
    data.userId = userData.subject;
    data.likeNumber = 0;

    let newData = {
      post: data,
      token: token,
    };

    dispatch(addPostAPI(newData));
    dispatch(clickPost());
    toast.success("Yeni postunuz akışa eklendi...");
  }

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
                <MainPagePost key={index} data={post} />
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
          <SCAddPostDiv onClick={() => dispatch(clickPost())}>
            Add new post :)
          </SCAddPostDiv>
          {clickPostStatus && (
            <form onSubmit={handleSubmit(onSubmit)}>
              <SCLoginDiv>
                <SCInputDiv errorstatu={errors.postPhoto}>
                  <label htmlFor="postPhoto">Post Photo URL:</label>
                  <input
                    type="text"
                    id="postPhoto"
                    style={{ padding: "0.5rem" }}
                    {...register("postPhoto", {
                      required: "postPhoto girmelisiniz",
                    })}
                  />
                </SCInputDiv>
                {errors.postPhoto && (
                  <SCError>{errors.postPhoto.message} </SCError>
                )}
                <SCInputDiv errorstatu={errors.postNote}>
                  <label htmlFor="postNote">Post Note:</label>
                  <input
                    type="text"
                    id="postNote"
                    style={{ padding: "0.5rem" }}
                    {...register("postNote", {
                      required: "Post girmelisiniz",
                    })}
                  />
                </SCInputDiv>
                {errors.postNote && (
                  <SCError>{errors.postNote.message} </SCError>
                )}
                <SCButton type="submit" disabled={!isValid}>
                  Add Post
                </SCButton>
              </SCLoginDiv>
            </form>
          )}
        </SCMainDiv>
      )}
    </div>
  );
}

export default MainPage;
