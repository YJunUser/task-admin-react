import React, { FormEvent } from "react";
import { useAuth } from "../context/auth-context";
import { Form, Input } from "antd";
import { LongButton } from "./index";
import { useAsync } from "../utils/use-async";
import { AxiosPromise } from "axios";

export const LoginScreen = ({
  onError,
}: {
  onError: (error: Error | null) => void;
}) => {
  const { user, login } = useAuth();

  //   // HTMLFormElement extends Element
  //   const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
  //     event.preventDefault();
  //     const username = (event.currentTarget.elements[0] as HTMLInputElement)
  //       .value;
  //     const password = (event.currentTarget.elements[1] as HTMLInputElement)
  //       .value;
  //     login({ username, password });
  //   };

  const { run, isLoading } = useAsync(undefined, { throwError: true });

  const handleSubmit = async (values: {
    username: string;
    password: string;
  }) => {
    try {
      await run(login(values) as any);
    } catch (error) {
      onError(error);
    }
  };

  return (
    <Form onFinish={handleSubmit}>
      <Form.Item
        name={"username"}
        rules={[{ required: true, message: "请输入用户名" }]}
      >
        <Input placeholder="用户名" type="text" id={"username"} />
      </Form.Item>
      <Form.Item
        name={"password"}
        rules={[{ required: true, message: "密码" }]}
      >
        <Input placeholder="密码" type="password" id={"password"} />
      </Form.Item>
      <Form.Item>
        <LongButton htmlType={"submit"} type={"primary"} loading={isLoading}>
          登录
        </LongButton>
      </Form.Item>
    </Form>
  );
};
