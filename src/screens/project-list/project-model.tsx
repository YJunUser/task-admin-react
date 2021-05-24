import { Button, Drawer, Form, Input, Spin, Typography } from "antd";
import { UserSelect } from "components/user-select";
import React from "react";
import { useProjectModal } from "./util";
import { useEditProject, useAddProject } from "./project";
import { useForm } from "antd/lib/form/Form";
import { useEffect } from "react";
import styled from "@emotion/styled";

export const ProjectModel = () => {
  const {
    projectModalOpen,
    close,
    editingProject,
    isLoading,
  } = useProjectModal();

  const title = editingProject ? "编辑项目" : "创建项目";

  const useMutateProject = editingProject ? useEditProject : useAddProject;

  const { mutateAsync, error, isLoading: mutateLoading } = useMutateProject();
  const [form] = useForm();

  // 注意 视图并不会自己更新的， 所有东西都需要手动去做
  const onFinish = (values: any) => {
    mutateAsync({ ...editingProject, ...values }).then(() => {
      form.resetFields();
      close();
    });
  };

  useEffect(() => {
    if (editingProject === undefined) {
      form.resetFields();
    } else {
      form.setFieldsValue(editingProject);
    }
  }, [editingProject, form]);

  return (
    <Drawer
      forceRender={true}
      width={"100%"}
      visible={projectModalOpen}
      onClose={() => close()}
    >
      <Container>
        {isLoading ? (
          <Spin size={"large"}></Spin>
        ) : (
          <>
            <h1>{title}</h1>
            {error ? (
              <Typography.Text type={"danger"}>{{ error }}</Typography.Text>
            ) : null}
            <Form
              form={form}
              layout={"vertical"}
              style={{ width: "40rem" }}
              onFinish={onFinish}
            >
              <Form.Item
                label={"名称"}
                name={"name"}
                rules={[{ required: true, message: "请输入项目名" }]}
              >
                <Input placeholder={"请输入项目名"}></Input>
              </Form.Item>

              <Form.Item
                label={"部门"}
                name={"organization"}
                rules={[{ required: true, message: "部门名" }]}
              >
                {/* {在From.Item中，表单控件不用加入value和onChange，会自动的将value={formValue.name} onChange={evt => onChangeFormValue({name: evt.value})}} */}
                <Input placeholder={"请输入部门名"}></Input>
              </Form.Item>

              <Form.Item label={"负责人"} name={"personId"}>
                <UserSelect defaultOptionName={"负责人"}></UserSelect>
              </Form.Item>

              <Form.Item style={{ textAlign: "center" }}>
                <Button
                  type={"primary"}
                  htmlType={"submit"}
                  loading={mutateLoading}
                >
                  提交
                </Button>
              </Form.Item>
            </Form>
          </>
        )}
      </Container>
    </Drawer>
  );
};

const Container = styled.div`
  display: flex;
  flex-flow: column nowrap;
  height: 80vh;
  justify-content: center;
  align-items: center;
`;
