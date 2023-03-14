import axios from "axios";
import { toast } from "react-toastify";

export const LOGIN_VERIFIED = "LOGIN_VERIFIED";
export const LOGIN_UNVERIFIED = "LOGIN_UNVERIFIED";
export const UI_MESSAGE_CHANGE = "UI_MESSAGE_CHANGE";
export const REGISTER_USER = "REGISTER_USER";
export const GET_POSTS = "GET_POSTS";

export function changeUIMessage(message) {
  return { type: UI_MESSAGE_CHANGE, payload: message };
}

export function loginVerified(loginUser) {
  return { type: LOGIN_VERIFIED, payload: loginUser };
}

export function loginUnverified(message) {
  return { type: LOGIN_UNVERIFIED, payload: message };
}

export function registerUser(data) {
  return { type: REGISTER_USER, payload: data };
}

export function getPosts(posts) {
  return { type: GET_POSTS, payload: posts };
}

export const loginAPI = (user) => (dispatch) => {
  const { loginData, path } = user;
  console.log(loginData);
  axios
    .post(`http://localhost:9000${path}`, loginData)
    .then((response) => {
      dispatch(loginVerified(response.data));
      toast.success(`${response.data.message}`);
      setTimeout(() => {
        dispatch(changeUIMessage(""));
      }, 4000);
    })
    .catch((err) => {
      dispatch(loginUnverified(err.response.data.message));
      toast.error(err.response.data.message);
      setTimeout(() => {
        dispatch(changeUIMessage(""));
      }, 4000);
    });
};

export const registerAPI = (user) => (dispatch) => {
  const { registData, path } = user;
  axios
    .post(`http://localhost:9000${path}`, registData)
    .then((response) => {
      console.log(response);
      dispatch(registerUser(response.data));
      toast.success(
        `ID No:${response.data.userId} user is created successfully `
      );
      setTimeout(() => {
        dispatch(registerUser({}));
      }, 4000);
    })
    .catch((err) => {
      console.log(err);
      dispatch(registerUser(err.response.data));
      toast.error(err.response.data.message);
      setTimeout(() => {
        dispatch(registerUser({}));
      }, 4000);
    });
};

export const getPostAPI = (data) => (dispatch) => {
  const { path, token } = data;
  axios
    .get(`http://localhost:9000${path}`, { headers: { authorization: token } })
    .then((response) => dispatch(getPosts(response.data)))
    .catch((err) => console.log(err));
};
