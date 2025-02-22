import {
  LOGIN_VERIFIED,
  LOGIN_UNVERIFIED,
  UI_MESSAGE_CHANGE,
  REGISTER_USER,
  GET_POSTS,
  CLICK_COMMENT,
  GET_USERS,
  CLICK_POST,
} from "./actions";

const initialState = {
  navlinks: [
    { link: "Register", path: "/api/auth/register" },
    { link: "Posts", path: "/api/posts" },
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
  users: [],
  currentUser: JSON.parse(window.localStorage.getItem("currentUser")),
  clickedPostComment: 0,
  clickedPost: false,
};

function reducer(state = initialState, action) {
  switch (action.type) {
    case LOGIN_VERIFIED:
      window.localStorage.setItem("token", action.payload.token);
      window.localStorage.setItem(
        "currentUser",
        JSON.stringify(action.payload.currentUser)
      );
      return {
        ...state,
        uiNotes: action.payload.message,
        token: action.payload.token,
        currentUser: action.payload.currentUser,
      };
    case LOGIN_UNVERIFIED:
      window.localStorage.setItem("token", "");
      window.localStorage.setItem("currentUser", JSON.stringify({}));
      return {
        ...state,
        uiNotes: action.payload,
        token: "",
        currentUser: null,
      };
    case UI_MESSAGE_CHANGE:
      return { ...state, uiNotes: action.payload };
    case REGISTER_USER:
      return {
        ...state,
        registedNotes: action.payload,
      };
    case GET_POSTS:
      return { ...state, posts: action.payload };
    case CLICK_COMMENT:
      return {
        ...state,
        clickedPostComment:
          state.clickedPostComment == action.payload ? 0 : action.payload,
      };
    case CLICK_POST:
      return {
        ...state,
        clickedPost: !state.clickedPost,
      };

    case GET_USERS:
      return { ...state, users: action.payload };
    default:
      return state;
  }
}

export default reducer;
