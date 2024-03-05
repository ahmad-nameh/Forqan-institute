import React, { useEffect, useState } from "react";
import axios from "axios";

export default function ShowTeachReq() {
  const [data, setdata] = useState([]);
  const [ser, setSer] = useState([]);

  useEffect(() => {
    const Url = process.env.REACT_APP_API_URL + "showTreqs";
    const token = process.env.TOKEN_API;
    axios
      .get(Url, {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((response) => response.data)
      .then((res) => setdata(res.subjects))
      .catch((error) => console.log(error));
  }, []);
  useEffect(() => {
    const UrlSer = process.env.REACT_APP_API_URL + "showStatuses";
    axios
      .get(UrlSer)
      .then((response) => response.data)
      .then((res) => setSer(res.result))
      .catch((error) => console.log(error));
  }, []);
  return (
    <div className="tableEmp bg-white border shadow rounded-[7px] p-10 mx-9">
      <div className="header grid grid-cols-8  py-4 font-bold">
        <h2>الاسم</h2>
        <h2>المؤهل العلمي</h2>
        <h2>الجهة المانحة</h2>
        <h2>الحالة الاجتماعية</h2>
        <h2>مكان الولادة</h2>
        <h2>تاريخ الولادة</h2>
        <h2>عنوان السكن</h2>
        <h2>الهاتف</h2>
      </div>
      {data.map((i) => (
        <div key={i.id} className="header grid grid-cols-8 border-b  py-4">
          <h2>{i.name}</h2>
          <h2>{i.academic_qualification}</h2>
          <h2>{i.issuing_authority}</h2>
          <h2>{ser[i.social_status_id].name}</h2>
          <h2>{i.birth_city}</h2>
          <h2>{i.birth_date}</h2>
          <h2>{i.address}</h2>
          <h2>{i.mobile_num}</h2>
        </div>
      ))}
    </div>
  );
}
