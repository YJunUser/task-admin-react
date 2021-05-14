import React from "react";
import { Link } from "react-router-dom";
import { Routes, Route, Navigate } from "react-router";
import { KanbanScreen } from "screens/kanban";
import { EpicScreen } from "screens/epic";

export const ProjectScreen = () => {
  return (
    <>
      <h1>ProjectScreen</h1>
      <Link to={"kanban"}>看板</Link>
      <Link to={"epic"}>epic</Link>
      <Routes>
        <Route path={"/kanban"} element={<KanbanScreen></KanbanScreen>}></Route>
        <Route path={"/epic"} element={<EpicScreen></EpicScreen>}></Route>
        <Navigate to={window.location.pathname + "/kanban"}></Navigate>
      </Routes>
    </>
  );
};
