import { Table, TableProps } from "antd";
import dayjs from "dayjs";
import React from "react";
import { UserLogin } from "utils/type";
import { Project } from "utils/type";

// 组件库的时候要这么用
interface ListProps extends TableProps<Project> {
  list: Project[];
  users: UserLogin[];
}

export const List = ({ list, users, ...props }: ListProps) => {
  return (
    <Table
      pagination={false}
      rowKey={(columns) => columns.id}
      dataSource={list}
      columns={[
        {
          title: "名称",
          dataIndex: "name",
          key: "name",
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
