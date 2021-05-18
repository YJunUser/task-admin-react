import React from "react";
import { SearchPanel } from "screens/project-list/search-panel";
import { List } from "screens/project-list/list";
import { useState } from "react";
import { useDebounce } from "../../utils";
import styled from "@emotion/styled";
import { Typography } from "antd";
import { useProject } from "./project";
import { useUser } from "./user";
import { useDocumentTitle } from "../../utils/index";
import { useUrlQueryParam } from "../../utils/url";
import { useProjectsSearchParam } from "./util";

export const ProjectListScreen = () => {
  useDocumentTitle("项目列表", false);

  const [param, setParam] = useProjectsSearchParam();
  const { isLoading, list, error, retry } = useProject(useDebounce(param, 200));
  const { users } = useUser();

  return (
    <Container>
      <h1>项目列表</h1>
      <button onClick={() => retry()}>retry</button>
      {error ? (
        <Typography.Text type={"danger"}>{error.message}</Typography.Text>
      ) : null}
      <SearchPanel users={users || []} param={param} setParam={setParam} />
      <List
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

ProjectListScreen.whyDidYouRender = false;
