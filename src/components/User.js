import React from "react";
import styled from "styled-components";

const SCUserDiv = styled.div`
  max-width: 30rem;
  margin: 2rem auto;
  background-color: rgb(192, 192, 192);
  padding: 1rem 2rem;
  border-radius: 1rem;
`;

function User({ data }) {
  return (
    <SCUserDiv>
      <p>Username: {data.username}</p>
      <p>Email: {data.userEmail}</p>
      <p>Birthday: {data.birthday}</p>
      <p>Role: {data.role}</p>
    </SCUserDiv>
  );
}

export default User;
