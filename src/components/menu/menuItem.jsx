import React, { useState, useEffect } from "react";
import { getItem } from "./menuItemHelper";
import { getMenuName } from "./menuName";
import {
  MailOutlined,
  AppstoreOutlined,
  UserOutlined,
} from "@ant-design/icons";

const listMenu = [
  {
    label: getMenuName("Nothing"),
    key: "/",
    icon: <MailOutlined />,
    type: "Nothing",
  },
  {
    label: getMenuName("Executive"),
    key: "/executive",
    icon: <UserOutlined />,
    children: [
      {
        label: "Report พี่กบ",
        key: "/executive1",
        type: "Executive1",
      },
      {
        label: "Executive 2",
        key: "/executive2",
        type: "Executive2",
      },
    ],
    type: "Executive",
  },
  {
    label: getMenuName("Accounting"),
    key: "/accounting",
    icon: <AppstoreOutlined />,
    type: "Accounting",
  },
  {
    label: getMenuName("Sale"),
    key: "/sale",
    icon: <UserOutlined />,
    children: [
      {
        label: "Sale 1",
        key: "/sale1",
      },
      {
        label: "Sale 2",
        key: "/sale2",
      },
    ],
    type: "Sale",
  },
  {
    label: getMenuName("Other"),
    key: "/other",
    icon: <UserOutlined />,
    children: [
      {
        label: "Other 1",
        key: "/other1",
      },
      {
        label: "Other 2",
        key: "/other2",
      },
    ],
    type: "Other",
  },
];

const items = listMenu.map((res) => {
  return getItem(res.label, res.key, res.icon, res.children, res.type);
});
export default items;
