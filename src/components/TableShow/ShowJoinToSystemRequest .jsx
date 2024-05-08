import React, { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import axios from "axios";
import HowToRegIcon from '@mui/icons-material/HowToReg';
import CancelIcon from '@mui/icons-material/Cancel';

const ShowJoinToSystemRequest = () => {

  const token = localStorage.getItem("token");

  const [data, setdata] = useState([]);

  useEffect(()=> {
        const fetchData = async () => {
          try {
            const response = await axios.get("http://127.0.0.1:8000/api/showPendingAccounts" ,{
              headers: {
                  Accept: "application/json",
                  'Authorization': `Bearer  ${token}`,
              }
            });
            setdata(response.data.users);
          } 
          catch (error) {
            if(error.response.data.status===0) {
              setdata([]);
            }
            console.log(error)
          }
        };
        fetchData();
    }, []);

  const handleApproveAccount = async (id) => {    
    let response;
    try {
        response = await axios
        .get(
        `http://127.0.0.1:8000/api/approveAccounts/${id}`,
        {
        headers: {
            Accept: "application/json",
            'Authorization': `Bearer  ${token}`,
        }
        }
        )
    }
    catch(error){
        console.error(error);
    }
    console.log(response);
  };

  const handleRejectAccount = async (id) => {    
    let response;
    try {
        response = await axios
        .get(
        `http://127.0.0.1:8000/api/deletePendingAccount/${id}`,
        {
        headers: {
            Accept: "application/json",
            'Authorization': `Bearer  ${token}`,
        }
        }
        )
    }
    catch(error){
        console.error(error);
    }
    console.log(response);
  };


  return (
    <div className="tableEmp bg-white border shadow rounded-[7px] p-10 mx-9">
      <div className="header grid grid-cols-4  py-4 font-bold">
        <h2>اسم الموظف</h2>
        <h2>البريد الالكتروني</h2>
        <h2></h2>
        <h2></h2>
      </div>
      <div className="max-h-72 overflow-auto">
        {data.map((content)=>
          <div key={content.id}  
            className="header grid grid-cols-4 border-b py-4 mt-2 emp_content hover:bg-gray-100 ">
            <h2>{content.name}</h2>
            <h2>{content.email}</h2>
            <button 
              className="flex items-center px-1 py-0.5 rounded-md bg-lime-600 text-white w-1/2"
              onClick={()=>handleApproveAccount(content.id)}
            >
              <HowToRegIcon/>
              قبول
            </button>
            <button 
              className="flex items-center px-1 py-0.5 rounded-md bg-red-500 text-white w-1/2"
              onClick={()=>handleRejectAccount(content.id)}
            >
              <CancelIcon/>
              رفض
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default ShowJoinToSystemRequest ;
