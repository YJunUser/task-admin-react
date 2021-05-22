import { Drawer } from "antd";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { projectListActions } from "screens/project-list/project-list.slice";
import { selectProjectModelOpen } from "./project-list.slice";

export const ProjectModel = () => {
  const dispatch = useDispatch();
  // useSelect是用来读总的状态树(store)里的状态的
  const projectModalOpen = useSelector(selectProjectModelOpen);
  return (
    <Drawer
      width={"100%"}
      visible={projectModalOpen}
      onClose={() => dispatch(projectListActions.closeProjectModal())}
    >
      <h1>projectModel</h1>
    </Drawer>
  );
};
