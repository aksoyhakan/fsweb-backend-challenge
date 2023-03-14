import {
  LOGIN_VERIFIED,
  LOGIN_UNVERIFIED,
  UI_MESSAGE_CHANGE,
  REGISTER_USER,
  GET_POSTS,
} from "./actions";

const initialState = {
  navlinks: [
    { link: "Login", path: "/api/auth/login" },
    { link: "Register", path: "/api/auth/register" },
    { link: "Posts", path: "/api/posts" },
    { link: "Users", path: "/api/users" },
  ],
  mainPage: {
    url: "https://mediacloud.theweek.com/image/upload/f_auto,t_content-image-desktop@1/v1650294051/mrz041722dAPR.jpg",
    description:
      "Welcome to junker... There are millions of junks which you could not find anywhere.",
  },
  loginForm: { username: "", password: "" },
  token: window.localStorage.getItem("token"),
  uiNotes: "",
  registerForm: { username: "", userEmail: "", birthday: "", password: "" },
  registedNotes: {},
  posts: [],
};

function reducer(state = initialState, action) {
  switch (action.type) {
    case LOGIN_VERIFIED:
      console.log(action.payload);
      window.localStorage.setItem("token", action.payload.token);
      return {
        ...state,
        uiNotes: action.payload.message,
        token: action.payload.token,
      };
    case LOGIN_UNVERIFIED:
      window.localStorage.setItem("token", "");
      return { ...state, uiNotes: action.payload, token: "" };
    case UI_MESSAGE_CHANGE:
      return { ...state, uiNotes: action.payload };
    case REGISTER_USER:
      console.log(action.payload, "reducere");
      return {
        ...state,
        registedNotes: action.payload,
      };
    case GET_POSTS:
      return { ...state, posts: action.payload };
    default:
      return state;
  }
}

export default reducer;
