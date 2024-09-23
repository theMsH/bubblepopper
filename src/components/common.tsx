import styled from "styled-components";
import { theme } from "../assets/theme";

export const Layout = styled.div`
  background-color: #2383ff;
  width: 100vw;
  height: 100dvh;
  font-family: ${theme.fontFamily};
`
export const Navigation = styled.div`
  width: 100%;
  height: ${theme.navigationHeight};
  background-color: #d6ecff;
  display: flex;
  justify-content: space-between;
  align-items: center;

`
export const HomeButton = styled.button`
  margin-left: 10px;
  background-color: #00c3ff;
  width: 50px;
  height: 50px;
  border: none;
  border-radius: 50%;
`
export const Points = styled.div`
  width: 50px;
  height: 50px;
  background-color: #00c3ff;
  margin-right: 10px;
  border-radius: 50%;
  text-align: center;
  align-content: center;

`
