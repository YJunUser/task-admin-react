import { ProjectListScreen } from "screens/project-list";
import React from "react";
import { useAuth } from "./context/auth-context";
import styled from "@emotion/styled";
import { Row } from "components/lib";
import { ReactComponent as SoftwareLogo } from "assets/software-logo.svg";
import { Button, Dropdown, Menu, Popover } from "antd";
import { Navigate, Route, Routes } from "react-router";
import { BrowserRouter as Router } from "react-router-dom";
import { ProjectScreen } from "screens/project";
import { resetRoute } from "utils";
import { useState } from "react";
import { ProjectModel } from "./screens/project-list/project-model";
import { ProjectPopover } from "components/project-popover";
import { ButtonNoPadding } from "./components/lib";

// 有状态的组件没有渲染，有渲染的组件没有状态
export const AuthenticatedApp = () => {
  const [projectModelOpen, setProjectModelOpen] = useState(false);
  return (
    <Container>
      <PageHeader setProjectModelOpen={setProjectModelOpen}></PageHeader>
      <Main>
        <Router>
          <Routes>
            <Route
              path={"/projects"}
              element={
                <ProjectListScreen
                  setProjectModelOpen={setProjectModelOpen}
                ></ProjectListScreen>
              }
            ></Route>
            <Route
              path={"/projects/:projectsId/*"}
              element={<ProjectScreen></ProjectScreen>}
            ></Route>
            <Navigate to={window.location.pathname + "/projects"}></Navigate>
          </Routes>
        </Router>
      </Main>
      <ProjectModel
        projectModelOpen={projectModelOpen}
        onClose={() => setProjectModelOpen(false)}
      ></ProjectModel>
    </Container>
  );
};

// 注意setState的参数 参数没问题就行
const PageHeader = (props: {
  setProjectModelOpen: (isOpen: boolean) => void;
}) => {
  return (
    <Header between={true}>
      <HeaderLeft gap={true}>
        {/* <img src={softwareLogo} alt="" /> */}
        <ButtonNoPadding type={"link"} onClick={resetRoute}>
          <SoftwareLogo
            width={"18rem"}
            color={"rgb(38, 132, 255)"}
          ></SoftwareLogo>
        </ButtonNoPadding>
        <span>我的</span>
        <ProjectPopover
          setProjectModelOpen={props.setProjectModelOpen}
        ></ProjectPopover>
      </HeaderLeft>
      <HeaderRight>
        <User></User>
      </HeaderRight>
    </Header>
  );
};

const User = () => {
  const { logout, user } = useAuth();
  return (
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
