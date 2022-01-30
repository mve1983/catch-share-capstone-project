import styled from "styled-components";
import { Navigate } from "react-router-dom";
import background from "../../img/background.jpg";



export default function Account({ userInfo }) {

  if (!userInfo) return <Navigate to="/"/>

  return (
  <>
    <BackgroundImage />
  <AccountWrapper>Hello Account

   
  </AccountWrapper>
  </>)
}

const AccountWrapper = styled.section`
  margin: 7rem 1rem 1rem 1rem;
  text-align: center;
`;

const BackgroundImage = styled.div`
  background-image: url(${background});
  background-size: cover;
  background-repeat: no-repeat;
  opacity: 75%;
  position: fixed;
  inset: 0;
  z-index: -15;
`;