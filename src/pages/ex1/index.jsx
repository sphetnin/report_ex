import React, { useState, useEffect } from "react";
import axios from "axios";

import SelectProject from "../../components/Select/SelectProject";
import PurchaseOrder from "./PurchaseOrder";
import SaleOrder from "./SaleOrder";

import {
  UserOutlined,
  ExceptionOutlined,
  BarChartOutlined,
  PieChartOutlined,
} from "@ant-design/icons";

import { Avatar, Card, Divider, Col, Row } from "antd";
const { Meta } = Card;

function index() {
  const [selectedValue, setSelectedValue] = useState();
  const [projectName, setProjectName] = useState();

  const [dataSaleOrder, setDateSaleOrder] = useState([]);
  const [dataTotalSo, setDataTotalSo] = useState(0);
  const [dataPurchaseOrder, setDataPurchaseOrder] = useState([]);
  const [dataTotalPo, setDataTotalPo] = useState(0);
  const [dataMagin, setMagin] = useState(0);
  const [dataSummary, setDataSummary] = useState(0);

  useEffect(() => {
    hendleSearch();
  }, [selectedValue]);

  useEffect(() => {
    const valTotal = dataTotalSo - dataTotalPo;
    const valMagin = ((valTotal / dataTotalSo) * 100).toFixed(2); // คำนวณค่าเปอร์เซ็นต์ MAGIN(%)

    setDataSummary(valTotal);
    setMagin(valMagin); // ตั้งค่าค่า MAGIN
  }, [selectedValue, dataTotalSo, dataTotalPo]);

  const hendleSearch = async () => {
    const encodedId = encodeURIComponent(selectedValue);

    try {
      const resSo = await axios.get(
        `//192.168.0.161:5555/so_project/${encodedId}`
      );
      const resPo = await axios.get(
        `//192.168.0.161:5555/po_project/${encodedId}`
      );

      const totalSo = resSo.data.data.reduce(
        (accumulator, currentValue) =>
          accumulator + parseFloat(currentValue.PriceExVat),
        0
      );

      const totalPo = resPo.data.data.reduce(
        (accumulator, currentValue) =>
          accumulator + parseFloat(currentValue.PriceExVat),
        0
      );

      setDateSaleOrder(resSo.data.data);
      setDataPurchaseOrder(resPo.data.data);
      setDataTotalSo(totalSo);
      setDataTotalPo(totalPo);
    } catch (error) {
      console.log("Error fetching data: ", error);
    }
  };

  const handleSelectChange = (value) => {
    const newValue = value.value;
    const newName = value.label;
    setSelectedValue(newValue);
    setProjectName(newName);
  };

  return (
    <>
      <SelectProject onSelectValue={handleSelectChange} />

      <div style={{ marginTop: "50px" }}>
        <Divider orientationMargin="0">Infomation Overall</Divider>

        <Row gutter={2}>
          <Col>
            <Card
              size="small"
              style={{
                width: 300,
                marginTop: 16,
              }}
            >
              <Meta
                avatar={
                  <Avatar
                    style={{
                      backgroundColor: "#87d068",
                    }}
                    icon={<UserOutlined />}
                  />
                }
                title="Sale Order"
                description={
                  dataTotalSo ? (
                    <p style={{ fontSize: "20px" }}>
                      {Number(dataTotalSo).toFixed(2)}
                    </p>
                  ) : (
                    <p style={{ fontSize: "20px" }}>No Data</p>
                  )
                }
              />
            </Card>
          </Col>

          <Col>
            <Card
              size="small"
              style={{
                width: 300,
                marginTop: 16,
              }}
            >
              <Meta
                avatar={
                  <Avatar
                    style={{
                      backgroundColor: "#1677ff",
                    }}
                    icon={<ExceptionOutlined />}
                  />
                }
                title="Purchase Order"
                description={
                  dataTotalPo ? (
                    <p style={{ fontSize: "20px" }}>
                      {Number(dataTotalPo).toFixed(2)}
                    </p>
                  ) : (
                    <p style={{ fontSize: "20px" }}>No Data</p>
                  )
                }
              />
            </Card>
          </Col>

          <Col>
            <Card
              size="small"
              style={{
                width: 300,
                marginTop: 16,
              }}
            >
              <Meta
                avatar={
                  <Avatar
                    style={{
                      backgroundColor: "#13c2c2",
                    }}
                    icon={<BarChartOutlined />}
                  />
                }
                title="Summary"
                description={
                  dataSummary ? (
                    <p style={{ fontSize: "20px" }}>
                      {Number(dataSummary).toFixed(2)}
                    </p>
                  ) : (
                    <p style={{ fontSize: "20px" }}>0</p>
                  )
                }
              />
            </Card>
          </Col>

          <Col>
            <Card
              size="small"
              style={{
                width: 300,
                marginTop: 16,
              }}
            >
              <Meta
                avatar={
                  <Avatar
                    style={{
                      backgroundColor: "#ff7a45",
                    }}
                    icon={<PieChartOutlined />}
                  />
                }
                title="MAGIN(%)"
                description={
                  dataMagin !== null ? (
                    <p style={{ fontSize: "20px" }}>{`${dataMagin}%`}</p>
                  ) : (
                    <p style={{ fontSize: "20px" }}>No Data</p>
                  )
                }
              />
            </Card>
          </Col>
        </Row>
      </div>
      <div>
        <SaleOrder data={dataSaleOrder} />
      </div>
      <div>
        <PurchaseOrder data={dataPurchaseOrder} />
      </div>
    </>
  );
}

export default index;
