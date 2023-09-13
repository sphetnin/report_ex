import React, { useState, useEffect } from "react";
import { Table, Divider } from "antd";

function PurchaseOrder(props) {
  const [purchaseOrder, setPurchaseOrder] = useState([]);
  //   const value = dataTotal.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");

  useEffect(() => {
    if (props.data) {
      const updatedPurchaseOrder = props.data.map((item, index) => ({
        ...item,
        key: index.toString(), // ใช้ index ของรายการเป็น key หรืออย่างอื่นที่ไม่ซ้ำกัน
      }));
      setPurchaseOrder(updatedPurchaseOrder);
    }
  }, [props.data]);

  const columns = [
    {
      title: "Description",
      dataIndex: "CardName",
      key: "CardName",
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

  return purchaseOrder && purchaseOrder.length > 0 ? (
    <div>
      <Divider orientation="left" orientationMargin="0">Purchase Order List</Divider>
      <Table
        columns={columns}
        dataSource={purchaseOrder}
        size="small"
        components={components}
      />
    </div>
  ) : null;
}

export default PurchaseOrder;
