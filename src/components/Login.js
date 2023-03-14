import React from "react";
import { useForm } from "react-hook-form";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import { useRouteMatch, useHistory } from "react-router-dom";
import { loginAPI } from "../reducer/actions";

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

const SCWelcomeDiv = styled.div`
    max-width:50rem;
    font-size: 2rem;
    box-sizing:border-box;
    margin: 2rem auto;
    background-color: rgb(192,192,192);
    padding: 2rem 3rem;
    border-radius: 5%;
  }}`;

function Login() {
  const form = useSelector((store) => store.loginForm);
  const message = useSelector((store) => store.uiNotes);
  const token = useSelector((store) => store.token);
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
    let newData = {
      loginData: data,
      path: url,
    };

    dispatch(loginAPI(newData));

    setTimeout(() => {
      reset();
      push("/api/posts");
    }, 3500);
  }

  return message ? (
    <SCWelcomeDiv>{message}</SCWelcomeDiv>
  ) : (
    <form onSubmit={handleSubmit(onSubmit)}>
      <SCLoginDiv>
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
        <SCButton type="submit" disabled={!isValid}>
          Giriş Yap
        </SCButton>
      </SCLoginDiv>
    </form>
  );
}

export default Login;
