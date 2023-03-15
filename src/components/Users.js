import React, { useEffect } from "react";
import User from "./User";
import { useSelector, useDispatch } from "react-redux";
import { getUsersAPI } from "../reducer/actions";

function Users() {
  const userDataArray = useSelector((store) => store.users);
  const token = useSelector((store) => store.token);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUsersAPI(token));
  }, []);

  return userDataArray.map((user) => <User data={user} />);
}

export default Users;
