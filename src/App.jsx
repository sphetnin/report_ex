import React, { useState, useEffect } from "react";
import { Layout, theme, Button, Space, Row, Col } from "antd";
import { LogoutOutlined, LoginOutlined } from "@ant-design/icons";
import { Routes, Route } from "react-router-dom";
import routes from "./routes";
import Copyright from "./components/Copyright";

import ListMenu from "./components/Sidebar";
import Navbar from "./components/Navbar";
// import uuid from "react-uuid";

import { useMsal, useIsAuthenticated } from "@azure/msal-react";

const { Header, Footer, Content, Sider } = Layout;

const App = () => {
  const isAuthenticated = useIsAuthenticated();

  // // Generate a UUID
  // const uuid = uuid();

  // // Use the UUID in your application
  // console.log("Generated UUID:", uuid);

  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const routeComponents = routes.map(({ path, element }, key) => (
    <Route exact path={path} element={element} key={key} />
  ));

  return (
    <Layout>
      <Sider breakpoint="lg" collapsedWidth="0">
        <div className="demo-logo-vertical">
          <center>Report System</center>
        </div>
        <ListMenu isAuth={isAuthenticated} />
        {/* isAuth={isAuthenticated} */}
      </Sider>
      {/* Menu SideBar */}
      <Layout>
        <Header
          style={{
            padding: 0,
            background: colorBgContainer,
          }}
        >
          <Navbar isAuth={isAuthenticated} />
          {/* isAuth={isAuthenticated} */}
        </Header>

        {/* Start Content */}
        {isAuthenticated ? (
          <Content
            style={{
              margin: "24px 16px 0",
              padding: 30,
              minHeight: "100vh",
              background: colorBgContainer,
              overflow: "initial",
            }}
          >
            <Routes>{routeComponents}</Routes>
          </Content>
        ) : (
          <Content
            style={{
              margin: "24px 16px 0",
              padding: 30,
              minHeight: "100vh",
              background: colorBgContainer,
              overflow: "initial",
            }}
          >
            <div>
              <h4>Pleass Signin</h4>
            </div>
          </Content>
        )}
        {/* End Content */}

        {/* Start Footer */}
        <Footer style={{ textAlign: "center" }}>
          <Copyright />
        </Footer>
        {/* End Footer */}
      </Layout>
    </Layout>
  );
};

export default App;
