import { ProjectListScreen } from "screens/project-list";
import React from "react";
import { useAuth } from "./context/auth-context";
import styled from "@emotion/styled";
import { Row } from "components/lib";

export const AuthenticatedApp = () => {
  const { logout } = useAuth();
  return (
    <Container>
      <Header between={true}>
        <HeaderLeft gap={true}>
          <h3>logo</h3>
          <h3>我的</h3>
          <h3>项目</h3>
        </HeaderLeft>
        <HeaderRight>
          <button onClick={() => logout()}>登出</button>
        </HeaderRight>
      </Header>
      <Main>
        <ProjectListScreen></ProjectListScreen>
      </Main>
    </Container>
  );
};

const Container = styled.div`
  height: 100vh;
`;

// 这里value没有引号
const Header = styled(Row)``;

const HeaderLeft = styled(Row)``;

const HeaderRight = styled.div``;

const Main = styled.main`
  grid-area: main;
`;
