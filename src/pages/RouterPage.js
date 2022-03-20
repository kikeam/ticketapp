import React, { useContext } from "react";
import { Layout, Menu } from "antd";
import {
  LoginOutlined,
  NodeIndexOutlined,
  PrinterOutlined,
} from "@ant-design/icons";

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
} from "react-router-dom";
import { Login } from "./Login";
import { Queue } from "./Queue";
import { CreateTicket } from "./CreateTicket";
import { Desktop } from "./Desktop";
import { UiContext } from "../context/UiContext";

const { Sider, Content } = Layout;

export const RouterPage = () => {
  const { hidden } = useContext(UiContext);
  return (
    <Router>
      <Layout style={{ minHeight: "100vh" }}>
        <Sider collapsedWidth="0" breakpoint="md" hidden={hidden}>
          <div className="logo" />
          <Menu theme="dark" mode="inline" defaultSelectedKeys={["1"]}>
            <Menu.Item key="1" icon={<LoginOutlined />}>
              <Link to="/login">Ingresar</Link>
            </Menu.Item>
            <Menu.Item key="2" icon={<NodeIndexOutlined />}>
              <Link to="/queue">Cola</Link>
            </Menu.Item>
            <Menu.Item key="3" icon={<PrinterOutlined />}>
              <Link to="/createticket">Crear Ticket</Link>
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout className="site-layout">
          <Content
            className="site-layout-background"
            style={{
              margin: "24px 16px",
              padding: 24,
              minHeight: 280,
            }}
          >
            <Switch>
              <Route path="/login">
                <Login />
              </Route>
              <Route path="/queue">
                <Queue />
              </Route>
              <Route path="/createticket">
                <CreateTicket />
              </Route>
              <Route path="/desktop">
                <Desktop />
              </Route>
              <Redirect to="/login" />
            </Switch>
          </Content>
        </Layout>
      </Layout>
    </Router>
  );
};
