import { Form, Input } from "antd";
import React from "react";
import { LongButton } from "unauthenticateApp";
import { useAsync } from "utils/use-async";
import { useAuth } from "../context/auth-context";

export const RegisterScreen = ({
  onError,
}: {
  onError: (error: Error | null) => void;
}) => {
  const { user, register } = useAuth();

  //   // HTMLFormElement extends Element
  //   const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
  //     event.preventDefault();
  //     const username = (event.currentTarget.elements[0] as HTMLInputElement)
  //       .value;
  //     const password = (event.currentTarget.elements[1] as HTMLInputElement)
  //       .value;
  //     register({ username, password });
  //   };
  const { run, isLoading } = useAsync(undefined, { throwError: true });
  const handleSubmit = async ({
    cpassword,
    ...values
  }: {
    username: string;
    password: string;
    cpassword: string;
  }) => {
    if (values.password !== cpassword) {
      onError(new Error("两次输入的密码不一致，请重新输入"));
      return;
    }
    try {
      await run(register(values) as any);
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
        rules={[{ required: true, message: "请输入密码" }]}
      >
        <Input placeholder="密码" type="password" id={"password"} />
      </Form.Item>
      <Form.Item
        name={"cpassword"}
        rules={[{ required: true, message: "请确认密码" }]}
      >
        <Input placeholder="确认密码" type="password" id={"cpassword"} />
      </Form.Item>
      <Form.Item>
        <LongButton htmlType={"submit"} type={"primary"}>
          注册
        </LongButton>
      </Form.Item>
    </Form>
  );
};
