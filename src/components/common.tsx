import styled from "styled-components";
import { theme } from "../assets/theme";

export const Layout = styled.div`
  background: linear-gradient(0deg,rgba(2,0,36,1) 0%, rgba(9,9,121,1) 11%, rgba(0,212,255,1) 100%);
  width: 100vw;
  height: 100dvh;
  font-family: ${theme.fontFamily};
  user-select: none;
`
export const Navigation = styled.div`
  width: 100%;
  height: ${theme.navigationHeight};
  background: linear-gradient(0deg, rgba(255,255,255,1) 0%, #fffef5 37%, #b3eefa 77%);
  display: flex;
  justify-content: space-between;
  align-items: center;

`
export const HomeButton = styled.button`
  margin-left: 10px;
  background: #ffee01;
  width: 50px;
  height: 50px;
  border: none;
  border-radius: 50%;
  box-shadow: 0 0 25px #d0ff00;
  border: 3px solid rgb(242, 255, 0);
`
export const Points = styled.div`
  width: 50px;
  height: 50px;
  background: #00aeff4e;
  margin-right: 10px;
  border-radius: 50%;
  text-align: center;
  align-content: center;
  box-shadow: 0 0 25px #effdff inset;
  border: 3px solid rgba(255, 255, 255, 0.63);
`
