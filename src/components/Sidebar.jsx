import React, { useState, useEffect } from "react";
import { Layout, Menu } from "antd";
import { useNavigate } from "react-router-dom";
import { useMsal } from "@azure/msal-react";
import { getPrivilegeMenu } from "./role";
import items from "./menu/menuItem";

const { Sider } = Layout;

const ListMenu = (props) => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [allowedPrivileges, setAllowedPrivileges] = useState([]);

  const { accounts } = useMsal();

  const isAuthenticated = props.isAuth;

  useEffect(() => {
    if (isAuthenticated) {
      if (accounts && accounts[0] && accounts[0].username) {
        setEmail(accounts[0].username);
        const menu = getPrivilegeMenu(accounts[0].username);
        if (menu !== undefined) {
          setAllowedPrivileges(menu);
        }
      }
    }
  }, [isAuthenticated, accounts]);

  const canAccessMenu = (type) => {
    return allowedPrivileges.includes(type);
  };

  const accessibleMenus = items.filter((res) => canAccessMenu(res.type));
  console.log(accessibleMenus);

  return isAuthenticated ? (
    <Menu
      onClick={(item) => {
        navigate(item.key);
      }}
      defaultSelectedKeys={["/"]}
      defaultOpenKeys={["sub1"]}
      mode="inline"
      theme="dark"
      items={accessibleMenus} // ใช้ items แทน children
    />
  ) : null;
};

export default ListMenu;
