import React, { useState, useEffect } from "react";
import { loginRequest } from "../common/authConfig";
import { callMsGraph } from "../common/graph";
import { useMsal, useIsAuthenticated } from "@azure/msal-react";

import { theme, Button, Space, Row, Col } from "antd";
import { LogoutOutlined, LoginOutlined } from "@ant-design/icons";

const ProfileContent = ({ graphData, RequestProfileData }) => {
  return (
    <>
      {graphData ? (
        <>
          <b>Welcome:</b> {graphData.displayName}
        </>
      ) : null}
    </>
  );
};

export const testLogin = (isAuthenticated) => {
  return isAuthenticated;
};

function Navbar(props) {
  // const isAuthenticated = useIsAuthenticated();
  const { instance, accounts } = useMsal();
  const [graphData, setGraphData] = useState(null);

  const isAuthenticated = props.isAuth;

  const RequestProfileData = () => {
    // Silently acquires an access token which is then attached to a request for MS Graph data
    instance
      .acquireTokenSilent({
        ...loginRequest,
        account: accounts[0],
      })
      .then((response) => {
        callMsGraph(response.accessToken).then((response) => {
          setGraphData(response);
        });
      });
  };

  useEffect(() => {
    {
      // event.preventDefault();
      isAuthenticated ? RequestProfileData() : null;
    }
    // eslint-disable-next-line
  }, [isAuthenticated]);

  const handleLogin = () => {
    instance.loginPopup(loginRequest).catch((e) => {
      console.log(e);
    });
  };

  const handleLogout = () => {
    console.log("Logout");
    instance.logoutPopup({
      postLogoutRedirectUri: "/",
      mainWindowRedirectUri: "/",
    });
  };

  return (
    <>
      <Row justify={"end"} align={"center"} style={{ padding: "0 25px" }}>
        <Col>
          <div className="space-align-container">
            <div className="space-align-block">
              <Space align="center" style={{ padding: "0 20px" }}>
                <ProfileContent
                  graphData={graphData}
                  RequestProfileData={RequestProfileData}
                />
              </Space>
            </div>
          </div>
        </Col>
        <Col>
          {isAuthenticated ? (
            <>
              <Button
                type="primary"
                icon={<LogoutOutlined />}
                onClick={() => handleLogout()}
                danger
              >
                Signout
              </Button>
            </>
          ) : (
            <Button
              type="primary"
              icon={<LoginOutlined />}
              onClick={() => handleLogin()}
            >
              Signin
            </Button>
          )}
        </Col>
      </Row>
    </>
  );
}

export default Navbar;
