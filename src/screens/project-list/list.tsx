import { Dropdown, Menu, Table, TableProps } from "antd";
import { ButtonNoPadding } from "components/lib";
import { Pin } from "components/pin";
import dayjs from "dayjs";
import React from "react";
// react-ro
import { Link } from "react-router-dom";
import { UserLogin } from "utils/type";
import { Project } from "utils/type";
import { useEditProject } from "./project";
import { useProjectModal } from "./util";

// 组件库的时候要这么用
interface ListProps extends TableProps<Project> {
  list: Project[];
  users: UserLogin[];
}

export const List = ({ list, users, ...props }: ListProps) => {
  const { mutate } = useEditProject();
  const { open, startEdit } = useProjectModal();

  const pinProject = ({ id, pin }: { id: number; pin: boolean }) =>
    mutate({ id, pin });
  const editProject = ({ id }: { id: number }) => startEdit(id);

  return (
    <Table
      pagination={false}
      rowKey={(columns) => columns.id}
      dataSource={list}
      columns={[
        {
          title: <Pin checked={true} disabled={true}></Pin>,
          key: "pin",
          render: (value, project) => (
            <Pin
              checked={project.pin}
              onCheckedChange={(pin) => {
                pinProject({ id: project.id, pin: pin });
              }}
            ></Pin>
          ),
        },
        {
          title: "名称",
          key: "name",
          render: (value, project) => (
            <Link to={String(project.id)}>{project.name}</Link>
          ),
        },
        {
          title: "部门",
          dataIndex: "organization",
          key: "organization",
        },
        {
          title: "负责人",
          dataIndex: "personId",
          key: "personId",
          render: (personId) => (
            <span key={personId}>
              {users.find((user) => user.id === personId)?.name || "未知"}
            </span>
          ),
        },
        {
          title: "创建时间",
          dataIndex: "created",
          key: "created",
          render: (created) => (
            <span key={created}>
              {created ? dayjs(created).format("YYYY-MM-DD") : "无"}
            </span>
          ),
        },
        {
          render(value, project) {
            return (
              <Dropdown
                overlay={
                  <Menu>
                    <Menu.Item
                      key={"edit"}
                      onClick={() => editProject({ id: project.id })}
                    >
                      编辑
                    </Menu.Item>
                    <Menu.Item key={"delete"}>删除</Menu.Item>
                  </Menu>
                }
              >
                <ButtonNoPadding type={"link"}>...</ButtonNoPadding>
              </Dropdown>
            );
          },
        },
      ]}
      {...props}
    ></Table>
    // <table>
    //   <thead>
    //     <tr>
    //       <th>名称</th>
    //       <th>负责人</th>
    //     </tr>
    //   </thead>
    //   <tbody>
    //     {list.map((project) => (
    //       <tr key={project.id}>
    //         <td>{project.name}</td>
    //         {/*undefined.name*/}
    //         <td>
    //           {users.find((user) => user.id === project.personId)?.name ||
    //             "未知"}
    //         </td>
    //       </tr>
    //     ))}
    //   </tbody>
    // </table>
  );
};
