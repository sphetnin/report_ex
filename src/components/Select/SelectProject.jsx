import React, { useState, useEffect } from "react";
import Select from "react-select";
import axios from "axios";

function SelectProject({ onSelectValue }) {
  const [options, setOptions] = useState();

  useEffect(() => {
    // ใช้ Axios ในส่วนนี้เพื่อดึงข้อมูลจาก API
    axios
      .get("http://118.173.233.20:14443/sap_api/sap_project")
      .then((response) => {
        const data = response.data.data;
        const formatOption = data.map((res) => ({
          value: res.PrjCode,
          label: res.PrjName,
        }));
        setOptions(formatOption);
        // console.log(formatOption);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);
  //End useEffect

  const handleSelect = (selectOption) => {
    onSelectValue(selectOption);
  };

  return (
    <div>
      {/* isMulti */}
      <Select options={options} onChange={handleSelect} />
    </div>
  );
}

export default SelectProject;
