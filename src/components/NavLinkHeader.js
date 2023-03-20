import React from "react";
import styled from "styled-components";
import { NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logOut } from "../reducer/actions";
import { useHistory } from "react-router-dom";

const SCNavLinkHeaderDiv = styled.div`
  max-width: 50rem;
  box-sizing: content-box;
  margin: 0 auto;
  background-color: rgb(220, 220, 220, 0.2);
  border: 0.25rem solid black;
  display: flex;
  justify-content: space-between;
  padding: 2rem;
`;

const SCNavLinkDiv = styled.div`
  width: ${(props) => (props.data && props.data === "admin" ? "30%" : "30%")};
  display: flex;
  justify-content: space-between;
  padding-top: 0.75rem;
`;

const SCNavLink = styled.p`
  padding: 0.5rem 1rem;
  border: 0.1rem solid rgb(175, 175, 175);
  background-color: rgb(200, 200, 200);
  color: black;
  margin-left: 0.5rem;
  border-radius: 0.2rem;
  transition: all 0.5s ease-out;

  &:hover {
    background-color: rgb(120, 120, 120);
    color: white;
  }
`;

function NavLinkHeader() {
  const links = useSelector((state) => state.navlinks);
  const userData = useSelector((state) => state.currentUser);
  const dispatch = useDispatch();
  const { push } = useHistory();

  function handleClick() {
    dispatch(logOut(userData.username));
    setTimeout(() => {
      push("/");
    }, 2000);
  }
  return (
    <SCNavLinkHeaderDiv>
      <NavLink style={{ textDecoration: "none", color: "black" }} to="/">
        <h1>Instagram</h1>
      </NavLink>
      <SCNavLinkDiv data={userData?.role}>
        {!userData?.role && (
          <NavLink
            style={{ textDecoration: "none", color: "black" }}
            to="/api/auth/login"
          >
            <SCNavLink>Login</SCNavLink>
          </NavLink>
        )}
        {userData?.role && (
          <NavLink
            style={{ textDecoration: "none", color: "black" }}
            to="/api/auth/login"
          >
            <SCNavLink onClick={handleClick}>Logout</SCNavLink>
          </NavLink>
        )}

        {links.map(
          (link) =>
            (link.link !== "Register" ||
              (link.link === "Register" && !userData?.role)) && (
              <NavLink
                style={{ textDecoration: "none", color: "black" }}
                to={link.path}
              >
                <SCNavLink>{link.link}</SCNavLink>
              </NavLink>
            )
        )}
        {userData?.role === "admin" && (
          <NavLink
            style={{ textDecoration: "none", color: "black" }}
            to="/api/users"
          >
            <SCNavLink>Users</SCNavLink>
          </NavLink>
        )}
      </SCNavLinkDiv>
    </SCNavLinkHeaderDiv>
  );
}

export default NavLinkHeader;
