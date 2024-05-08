import React, { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import axios from "axios";

const ShowEmp = () => {

  const token = localStorage.getItem("token");

  const [data, setdata] = useState([]);
  const [searchWord, setSearchWord] = useState();

  const navigate = useNavigate();

  useEffect(()=> {
    if (searchWord != null) {
        const fetchData = async () => {
          try {
            const response = await axios.post("http://127.0.0.1:8000/api/searchEmp",{name:searchWord}, {
              headers: {
                  Accept: "application/json",
                  'Authorization': `Bearer  ${token}`,
              }
            });
            setdata(response.data.message);
          } 
          catch (error) {
            if(error.response.data.status===0) {
              setdata([]);
            }
            console.log(error)
          }
        };
        fetchData();
      }
      else {
        const fetchData = async () => {
          try {
            const response = await axios.get("http://127.0.0.1:8000/api/showEmps", {
              headers: {
                  Accept: "application/json",
                  'Authorization': `Bearer  ${token}`,
              }
            });
            setdata(response.data.data);
          } 
          catch (error) {
            console.log(error)
          }
        };
        fetchData();
      } 
    }, [searchWord,]);

  return (
    <div className="tableEmp bg-white border shadow rounded-[7px] p-10 mx-9">
      <form>
        <input type="text" placeholder="البحث"
          className="py-1 px-1 bg-gray-200 w-64 outline-none placeholder-green-600"
          onChange={(e)=>setSearchWord(e.target.value)}/>
      </form>
      <div className="header grid grid-cols-6  py-4 font-bold">
        <h2>الاسم</h2>
        <h2>اسم الأب</h2>
        <h2>العمل الحالي</h2>
        <h2>تاريخ الولادة</h2>
        <h2>عنوان السكن</h2>
        <h2>رقم الجوال</h2>
      </div>
      <div className="max-h-72 overflow-auto">
        {data.map((content)=>
          <div key={content.id} onClick={()=>navigate("/archive", { state: { empid: content.id } })} 
            className="header grid grid-cols-6 border-b py-4 mt-2 emp_content hover:bg-gray-100 ">
            <h2>{content.name}</h2>
            <h2>{content.father_name}</h2>
            <h2>{content.work}</h2>
            <h2>{content.birth_date}</h2>
            <h2>{content.address}</h2>
            <h2>{content.mobile_num}</h2>
          </div>
        )}
      </div>
    </div>
  );
}

export default ShowEmp;
