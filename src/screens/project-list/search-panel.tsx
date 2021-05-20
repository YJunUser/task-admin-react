/** @jsxRuntime classic */
/** @jsx jsx */
import { Form, Input, Select } from "antd";
import React from "react";
import { Project, UserLogin } from "utils/type";
import { jsx } from "@emotion/react";
import { UserSelect } from "components/user-select";

interface SearchPanelProps {
  users: UserLogin[];
  // 加个Partial，
  param: Partial<Pick<Project, "name" | "personId">>;
  setParam: (param: SearchPanelProps["param"]) => void; // setParam就是返回void，但参数类型要对
}

export const SearchPanel = ({ users, param, setParam }: SearchPanelProps) => {
  return (
    <Form css={{ marginBottom: "2rem" }} layout={"inline"}>
      <Form.Item>
        {/*setParam(Object.assign({}, param, {name:evt.target.value}))*/}
        <Input
          type="text"
          placeholder="项目名"
          value={param.name}
          onChange={(evt) =>
            setParam({
              ...param,
              name: evt.target.value,
            })
          }
        />
      </Form.Item>
      <Form.Item>
        {/* <Select
          value={param.personId}
          onChange={(value) =>
            setParam({
              ...param,
              personId: value,
            })
          }
        >
          <Select.Option value={""}>负责人</Select.Option>
          {users.map((user) => (
            <Select.Option key={user.id} value={String(user.id)}>
              {user.name}
            </Select.Option>
          ))}
        </Select> */}
        <UserSelect
          value={param.personId}
          onChange={(value) =>
            setParam({
              ...param,
              personId: value,
            })
          }
          defaultOptionName="负责人"
        ></UserSelect>
      </Form.Item>
    </Form>
  );
};
