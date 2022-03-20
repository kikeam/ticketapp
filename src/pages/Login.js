import React, { useState } from "react";
import { Form, Input, Button, InputNumber, Typography, Divider } from "antd";
import { Redirect, useHistory } from "react-router";
import { useHide } from "../hooks/useHide";
import { getUsers } from "../helpers/getUsers";

const { Title, Text } = Typography;

const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 14,
  },
};
const tailLayout = {
  wrapperCol: {
    offset: 8,
    span: 14,
  },
};

export const Login = () => {
  useHide(false);

  const [user] = useState(getUsers());
  const history = useHistory();
  const onFinish = (values) => {
    console.log("Success:", values);

    localStorage.setItem("user", values.username);
    localStorage.setItem("desktop", values.desktop);
    history.push("/desktop");
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  if (user.user && user.desktop) {
    return <Redirect to="/desktop" />;
  }

  return (
    <>
      <Title level={2}>Ingresar</Title>
      <Text>Ingrese su nombre y nº de escritorio</Text>
      <Divider />
      <Form
        {...layout}
        name="basic"
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      >
        <Form.Item
          label="Usuario"
          name="username"
          rules={[
            {
              required: true,
              message: "Por favor, ingrese su usuario",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Escritorio"
          name="desktop"
          rules={[
            {
              required: true,
              message: "Por favor, ingrese su escritorio",
            },
          ]}
        >
          <InputNumber min={1} max={9} />
        </Form.Item>

        <Form.Item {...tailLayout}>
          <Button type="primary" htmlType="submit" shape="round">
            Ingresar
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};
