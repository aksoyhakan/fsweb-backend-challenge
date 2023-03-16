import React from "react";
import { useForm } from "react-hook-form";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import { useRouteMatch, useHistory } from "react-router-dom";
import { registerAPI } from "../reducer/actions";

const SCRegisterDiv = styled.div`
  max-width: 30rem;
  margin: 2rem auto;
  background-color: rgb(204, 229, 255);
  border: 0.15rem solid rgb(102, 178, 255);
  padding: 2rem;
`;

const SCInputDiv = styled.div`
  margin-bottom: ${(props) => (props.errorstatu ? "0.5rem" : "4.30rem")}; ;
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
    background-color: rgb(0, 204, 0);
    color: rgb(0, 152, 76);
  }
`;

const SCNoteDiv = styled.div`
    max-width:50rem;
    font-size: 1.25rem;
    box-sizing:border-box;
    margin: 2rem auto;
    background-color: rgb(192,192,192);
    padding: 2rem 3rem;
    border-radius: 5%;
  }}`;

function Register() {
  const form = useSelector((store) => store.registerForm);
  const note = useSelector((state) => state.registedNotes);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm({ mode: "onChange", defaultValues: form });

  const { url } = useRouteMatch();
  const dispatch = useDispatch();
  const { push } = useHistory();

  function onSubmit(data) {
    if (!data.avatarPhoto)
      data.avatarPhoto =
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTVhcVcxgW8LzmIu36MCeJb81AHXlI8CwikrHNh5vzY8A&s";
    let newData = {
      registData: data,
      path: url,
    };
    dispatch(registerAPI(newData));
    setTimeout(() => {
      reset();
      push("/api/auth/login");
    }, 3500);
  }

  return note.userId || note.message ? (
    <SCNoteDiv>
      {note.userId ? (
        <div>
          <p>Your Id: {note.userId}</p>
          <p>Username: {note.username}</p>
          <p>Email: {note.userEmail}</p>
        </div>
      ) : (
        <p>{note.message}</p>
      )}
    </SCNoteDiv>
  ) : (
    <form onSubmit={handleSubmit(onSubmit)}>
      <SCRegisterDiv>
        <SCInputDiv errorstatu={errors.username}>
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            style={{ padding: "0.5rem" }}
            {...register("username", { required: "username girmelisiniz" })}
          />
        </SCInputDiv>
        {errors.username && <SCError>{errors.username.message} </SCError>}
        <SCInputDiv errorstatu={errors.password}>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            style={{ padding: "0.5rem" }}
            {...register("password", { required: "Şifre girmelisiniz" })}
          />
        </SCInputDiv>
        {errors.password && <SCError>{errors.password.message} </SCError>}
        <SCInputDiv errorstatu={errors.userEmail}>
          <label htmlFor="userEmail">E-Mail:</label>
          <input
            type="email"
            id="userEmail"
            style={{ padding: "0.5rem" }}
            {...register("userEmail", { required: "E-mail girmelisiniz" })}
          />
        </SCInputDiv>
        {errors.userEmail && <SCError>{errors.userEmail.message} </SCError>}
        <SCInputDiv errorstatu={errors.birthday}>
          <label htmlFor="birthday">Birthday:</label>
          <input
            type="date"
            id="birthday"
            style={{ padding: "0.5rem" }}
            {...register("birthday", {
              required: "Doğum günü tarihi girmelisiniz",
            })}
          />
        </SCInputDiv>
        {errors.birthday && <SCError>{errors.birthday.message} </SCError>}
        <SCInputDiv errorstatu={errors.avatarPhoto}>
          <label htmlFor="avatarPhoto">Photo:</label>
          <input
            type="text"
            id="avatarPhoto"
            style={{ padding: "0.5rem" }}
            {...register("avatarPhoto")}
          />
        </SCInputDiv>
        <SCButton type="submit" disabled={!isValid}>
          Kaydol
        </SCButton>
      </SCRegisterDiv>
    </form>
  );
}

export default Register;
