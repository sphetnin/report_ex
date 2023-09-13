import React, { useState, useEffect } from "react";
import { Table, Divider } from "antd";

function SaleOrder(props) {
  const [saleOrder, setSaleOrder] = useState("");
  //   const value = dataTotal.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");

  useEffect(() => {
    if (props.data) {
      const updatedSaleOrder = props.data.map((item, index) => ({
        ...item,
        key: index.toString(), // ใช้ index ของรายการเป็น key หรืออย่างอื่นที่ไม่ซ้ำกัน
      }));
      setSaleOrder(updatedSaleOrder);
    }
  }, [props.data]);

  const columns = [
    {
      title: "Description",
      dataIndex: "CardName",
      key: "CardName",
      style: {
        backgroundColor: "green",
        fontWeight: "bold", // You can also add other styles if needed
      },
    },
    {
      title: "Item",
      dataIndex: "Dscription",
      key: "Dscription",
    },
    {
      title: "Price(Ex-vat)",
      dataIndex: "PriceExVat",
      key: "PriceExVat",
    },
  ];
  //   console.log(props.data);

  const tableHeadBackground = {
    background: "green", // Set the background color for the table header here
    color: "white", // Set the text color for the table header (optional)
  };

  const components = {
    header: {
      cell: (props) => <th style={tableHeadBackground}>{props.children}</th>,
    },
  };

  //   console.log(saleOrder);

  return saleOrder && saleOrder.length > 0 ? (
    <div style={{ marginTop: "40px" }}>
      <Divider orientation="left" orientationMargin="0">Sale Order List</Divider>
      <Table
        columns={columns}
        dataSource={saleOrder}
        size="small"
        components={components}
      />
    </div>
  ) : null;
}

export default SaleOrder;
