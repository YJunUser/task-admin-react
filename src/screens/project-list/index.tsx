import React from "react";
import { SearchPanel } from "screens/project-list/search-panel";
import { List } from "screens/project-list/list";
import { useState } from "react";
import { useDebounce } from "../../utils";
import styled from "@emotion/styled";
import { Button, Typography } from "antd";
import { useEditProject, useProject } from "./project";
import { useUser } from "./user";
import { useDocumentTitle } from "../../utils/index";
import { useUrlQueryParam } from "../../utils/url";
import { useProjectsSearchParam } from "./util";
import { Row } from "components/lib";
import { useDispatch } from "react-redux";
import { projectListActions } from "screens/project-list/project-list.slice";

export const ProjectListScreen = () => {
  useDocumentTitle("项目列表", false);

  const [param, setParam] = useProjectsSearchParam();
  const { isLoading, list, error, retry } = useProject(useDebounce(param, 200));
  const { users } = useUser();
  const { mutate } = useEditProject();
  const dispatch = useDispatch();

  return (
    <Container>
      <Row between={true}>
        <h1>项目列表</h1>
        <Button
          type={"link"}
          onClick={() => dispatch(projectListActions.openProjectModal())}
        >
          创建项目
        </Button>
      </Row>

      {error ? (
        <Typography.Text type={"danger"}>{error.message}</Typography.Text>
      ) : null}
      <SearchPanel users={users || []} param={param} setParam={setParam} />
      <List
        mutate={mutate}
        refresh={retry}
        users={users || []}
        list={list || []}
        loading={isLoading}
      />
    </Container>
  );
};

const Container = styled.div`
  padding: 3.2rem;
`;

ProjectListScreen.whyDidYouRender = true;
