import { Drawer } from "antd";
import React from "react";

export const ProjectModel = (props: {
  projectModelOpen: boolean;
  onClose: () => void;
}) => {
  return (
    <Drawer
      width={"100%"}
      visible={props.projectModelOpen}
      onClose={props.onClose}
    >
      <h1>projectModel</h1>
    </Drawer>
  );
};
