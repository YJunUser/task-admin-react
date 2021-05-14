import { ProjectListScreen } from "screens/project-list";
import React from "react";
import { useAuth } from "./context/auth-context";
import styled from "@emotion/styled";
import { Row } from "components/lib";
import { ReactComponent as SoftwareLogo } from "assets/software-logo.svg";
import { Button, Dropdown, Menu } from "antd";
import { Navigate, Route, Routes } from "react-router";
import { BrowserRouter as Router } from "react-router-dom";
import { ProjectScreen } from "screens/project";
import { resetRoute } from "utils";

export const AuthenticatedApp = () => {
  return (
    <Container>
      <PageHeader></PageHeader>
      <Main>
        <Router>
          <Routes>
            <Route
              path={"/projects"}
              element={<ProjectListScreen></ProjectListScreen>}
            ></Route>
            <Route
              path={"/projects/:projectsId/*"}
              element={<ProjectScreen></ProjectScreen>}
            ></Route>
            <Navigate to={window.location.pathname + "/projects"}></Navigate>
          </Routes>
        </Router>
      </Main>
    </Container>
  );
};

const PageHeader = () => {
  const { logout, user } = useAuth();
  return (
    <Header between={true}>
      <HeaderLeft gap={true}>
        {/* <img src={softwareLogo} alt="" /> */}
        <Button type={"link"} onClick={resetRoute}>
          <SoftwareLogo
            width={"18rem"}
            color={"rgb(38, 132, 255)"}
          ></SoftwareLogo>
        </Button>
        <h1>我的</h1>
        <h1>项目</h1>
      </HeaderLeft>
      <HeaderRight>
        <Dropdown
          overlay={
            <Menu>
              <Menu.Item key={"logout"}>
                <Button type="link" onClick={() => logout()}>
                  登出
                </Button>
              </Menu.Item>
            </Menu>
          }
        >
          <Button type={"link"} onClick={(e) => e.preventDefault()}>
            Hi, {user?.name}
          </Button>
        </Dropdown>
      </HeaderRight>
    </Header>
  );
};
const Container = styled.div`
  height: 100vh;
`;

// 这里value没有引号
const Header = styled(Row)`
  padding: 3.2rem;
  box-shadow: rgba(0, 0, 0, 0.1) 0 0 10px;
  z-index: 1;
`;

const HeaderLeft = styled(Row)``;

const HeaderRight = styled.div``;

const Main = styled.main`
  grid-area: main;
`;
