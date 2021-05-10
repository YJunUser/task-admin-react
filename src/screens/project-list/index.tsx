import React from "react";
import { SearchPanel } from "screens/project-list/search-panel";
import { List } from "screens/project-list/list";
import { useEffect, useState } from "react";
import { useDebounce, useMount } from "../../utils";
import { getProject, getUsers } from "../../api/project-list";
import styled from "@emotion/styled";

export const ProjectListScreen = () => {
  const [users, setUsers] = useState<any>([]);

  const [param, setParam] = useState({
    name: "",
    personId: "",
  });
  const debouncedParam = useDebounce(param, 200);
  const [list, setList] = useState<any>([]);

  useEffect(() => {
    // fetch(
    //   `${apiUrl}/projects?${qs.stringify(cleanObject(debouncedParam))}`
    // ).then(async (response) => {
    //   if (response.ok) {
    //     setList(await response.json());
    //   }
    // });
    getProject(debouncedParam).then((res) => {
      setList(res.data);
    });
  }, [debouncedParam]);

  useMount(() => {
    // fetch(`${apiUrl}/users`).then(async (response) => {
    //   if (response.ok) {
    //     setUsers(await response.json());
    //   }
    // });
    getUsers().then((res) => {
      setUsers(res.data);
    });
  });

  return (
    <Container>
      <h1>项目列表</h1>
      <SearchPanel users={users} param={param} setParam={setParam} />
      <List users={users} list={list} />
    </Container>
  );
};

const Container = styled.div`
  padding: 3.2rem;
`;
