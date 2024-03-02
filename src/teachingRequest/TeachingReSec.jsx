import { useContext, useState } from "react";
import { PopUp } from "../Home";
import { motion } from "framer-motion";
export default function TeachingReSec() {
  const { setTClick } = useContext(PopUp);

  const apiUrl = process.env.REACT_APP_API_URL + "addTeachingRequest";
  const [err, seterr] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const arr = [...e.target];
    const data = [{}];
    arr.map((i) => {
      const name = i.name;
      const value = i.value;
      data[name] = value;
    });
    try {
      //const response = await axios.post(apiUrl, { ...data });
      setTClick([0, 0, 1, 0, 0]);
    } catch (error) {
      console.log(error);
      seterr(error.response.data.message);
    }
  };
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3, delay: 0.1 }}
      className="container teachingReq p-10 text-center"
    >
      <h1 className="text-[20px]">مؤهلات إضافية ودورات:</h1>
      <form
        onSubmit={handleSubmit}
        action=""
        className="flex bg-white p-10 flex-col text-[13px] justify-center"
      >
        <div className="">
          <label htmlFor="toManege">اضافة دورة</label>
          <input className="w/1/2" type="text" name="" id="toManege" />
        </div>

        <div className="text-center">
          <button
            type="submit"
            className="px-3 py-2 rounded-md bg-green-400 w-[100px] text-white"
          >
            التالي
          </button>
        </div>
      </form>
    </motion.div>
  );
}
