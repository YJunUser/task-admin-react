import { Table } from "antd";
import React from "react";
import { User } from "utils/type";
import { Project } from "utils/type";

interface ListProps {
  list: Project[];
  users: User[];
}

export const List = ({ list, users }: ListProps) => {
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
          title: "负责人",
          dataIndex: "personId",
          key: "personId",
          render: (personId) => (
            <span key={personId}>
              {users.find((user) => user.id === personId)?.name || "未知"}
            </span>
          ),
        },
      ]}
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
