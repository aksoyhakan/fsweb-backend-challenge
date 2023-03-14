import React from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";

const SCMainDiv = styled.div`
  max-width: 50rem;
  margin: 3rem auto;
  text-align: center;
`;

function MainPage() {
  const data = useSelector((state) => state.mainPage);
  return (
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
  );
}

export default MainPage;
