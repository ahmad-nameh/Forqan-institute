import { useContext, useEffect, useState } from "react";
import { PopUp } from "../../Home";
import axios from "axios";
function EmpRequestMain() {
  const apiUrl = process.env.REACT_APP_API_URL + "addEmpRequest";
  const [err, seterr] = useState("");
  const [nat, setNat] = useState([]);
  const [ser, setSer] = useState([]);
  const [ma, setMa] = useState([]);
  const { setTClick, setidRq } = useContext(PopUp);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const arr = [...e.target];

    const data = [{}];
    arr.map((i, ii) => {
      const name = i.name;
      const value = i.value;
      console.log(ii);
      if (ii < 10) data[name] = value;
      else if (ii < 12) {
        const file = e.target[ii].files[0];
        data[name] = file;
      }
    });
    console.log(data);
    const config = {
      headers: {
        "content-type": "multipart/form-data",
      },
    };
    try {
      const response = await axios.post(
        apiUrl,
        {
          ...data,
        },
        config
      );

      setidRq(response.data.added_request_id);
      setTClick([0, 1, 0, 0, 0]);
    } catch (error) {
      console.log(error);
      seterr(error.response.data.message);
    }
  };
  useEffect(() => {
    const UrlNat = process.env.REACT_APP_API_URL + "showNats";
    const UrlSer = process.env.REACT_APP_API_URL + "showStatuses";
    const UrlMa = process.env.REACT_APP_API_URL + "showMServices";
    axios
      .get(UrlNat)
      .then((response) => response.data)
      .then((res) => setNat(res.nationalities))
      .catch((error) => console.log(error));
    axios
      .get(UrlSer)
      .then((response) => response.data)
      .then((res) => setSer(res.result))
      .catch((error) => console.log(error));
    axios
      .get(UrlMa)
      .then((response) => response.data)
      .then((res) => setMa(res.result))
      .catch((error) => console.log(error));
  }, []);
  return (
    <div className="container teachingReq p-10 text-center">
      <h1>طلب تكليف بعمل إداري</h1>
      <form
        onSubmit={handleSubmit}
        action=""
        className="flex bg-white gap-4 flex-col text-[13px] justify-center"
      >
        <div className="flex flex-col lg:flex-row gap-8 mx-auto text-right">
          <div className="grid grid-cols-2 m-6 lg:w-1/2">
            <div className="inputDivPop">
              <label htmlFor="name">الاسم</label>
              <input className="inputPop" type="text" name="name" id="name" />
            </div>
            <div className="inputDivPop">
              <label htmlFor="birth_date">تاريخ الولادة</label>
              <input
                className="inputPop"
                type="date"
                name="birth_date"
                id="birth_date"
              />
            </div>
            <div className="inputDivPop">
              <label htmlFor="military_service_id">الحالة الاجتماعية</label>
              <select
                className="inputPop border ml-2 rounded-md p-1"
                name="military_service_id"
                id="military_service_id"
              >
                <option value={""}>اختر الحالة</option>
                {ser.map((i) => (
                  <option key={i.id} value={i.id}>
                    {i.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="inputDivPop">
              <label htmlFor="social_status_id">الخدمة الالزامية</label>
              <select
                className="inputPop border ml-2 rounded-md p-1"
                name="social_status_id"
                id="social_status_id"
              >
                <option value={""}>اختر </option>
                {ma.map((i) => (
                  <option key={i.id} value={i.id}>
                    {i.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="inputDivPop">
              <label htmlFor="address">العنوان بالتفصيل</label>
              <input
                className="inputPop"
                type="text"
                name="address"
                id="address"
              />
            </div>
            <div className="inputDivPop">
              <label htmlFor="tele_num">الهاتف الارضي</label>
              <input
                className="inputPop"
                type="tel"
                name="tele_num"
                id="tele_num"
              />
            </div>
          </div>
          <div className="grid grid-cols-2 m-6">
            <div className="inputDivPop">
              <label htmlFor="mobile_num">الهاتف الجوال</label>
              <input
                className="inputPop"
                type="tel"
                name="mobile_num"
                id="mobile_num"
              />
            </div>
            <div className="inputDivPop">
              <label htmlFor="academic_qualification">الموهل العملي</label>
              <input
                className="inputPop"
                type="text"
                name="academic_qualification"
                id="academic_qualification"
              />
            </div>
            <div className="inputDivPop">
              <label htmlFor="current_work">العمل الحالي</label>
              <input
                className="inputPop"
                type="text"
                name="current_work"
                id="current_work"
              />
            </div>
            <div className="inputDivPop">
              <label htmlFor="wanted_work">العمل المطلوب</label>
              <input
                className="inputPop"
                type="text"
                name="wanted_work"
                id="wanted_work"
              />
            </div>
            <div className="inputDivPop">
              <label htmlFor="certificate_photo">صورة الشهادة</label>
              <input
                className="inputPop"
                type="file"
                name="certificate_photo"
                id="certificate_photo"
              />
            </div>
            <div className="inputDivPop">
              <label htmlFor="identity_photo">صورة الهوية</label>
              <input
                className="inputPop"
                type="file"
                name="identity_photo"
                id="identity_photo"
              />
            </div>
          </div>
        </div>
        {err !== "" ? <div className="text-red-400">{err}</div> : null}

        <div className="text-center">
          <button
            type="submit"
            className="px-3 py-2 rounded-md bg-green-400 w-[100px] text-white"
          >
            التالي
          </button>
        </div>
      </form>
    </div>
  );
}

export default EmpRequestMain;
