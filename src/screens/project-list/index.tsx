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

export const ProjectListScreen = () => {
  // 每次useUrlQueryParam中的reduce都创建了一个新的引用类型即param
  const [param, setParam] = useUrlQueryParam(["name", "personId"]);

  // useDebounce中的useEffect又依赖了param
  // 于是就会一直重复渲染， 不要将引用类型作为依赖项, 基本类型和组件状态可以作为依赖
  // 但useState中的state可以作为依赖项，因为state只有去用setState改变的时候react才会认为是更新了的
  const debouncedParam = useDebounce(param, 200);
  const { isLoading, list, error } = useProject(debouncedParam);
  const { users } = useUser();

  useDocumentTitle("项目列表", false);

  return (
    <Container>
      <h1>项目列表</h1>
      {error ? (
        <Typography.Text type={"danger"}>{error.message}</Typography.Text>
      ) : null}
      <SearchPanel users={users} param={param} setParam={setParam} />
      <List users={users} list={list || []} loading={isLoading} />
    </Container>
  );
};

const Container = styled.div`
  padding: 3.2rem;
`;

ProjectListScreen.whyDidYouRender = false;
