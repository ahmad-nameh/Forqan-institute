import { useContext } from "react";
import { PopUp } from "../Home";
import { motion } from "framer-motion";
export default function TeachingReExp() {
  const { setTClick, setclick } = useContext(PopUp);

  const SubmitHandel = (e) => {
    e.preventDefault();
    setTClick([1, 0, 0, 0, 0]);
    setclick([0, 0, 0, 0]);
  };
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3, delay: 0.1 }}
      className="container teachingReq p-10 text-center"
    >
      <h1 className="text-[20px]">الخبرات</h1>
      <form
        onSubmit={SubmitHandel}
        action=""
        className="flex bg-white p-10 flex-col text-[13px] justify-between"
      >
        <div className="border p-10  rounded-md  text-right">
          <div className="flex flex-col lg:flex-row gap-8 mx-auto">
            <div className="grid grid-cols-2 m-6 lg:w-1/2">
              <div className="inputDivPop">
                <label htmlFor="toManege">مكان العمل</label>
                <input className="inputPop" type="text" name="" id="toManege" />
              </div>
              <div className="inputDivPop">
                <label htmlFor="toManege">المادة او العمل</label>
                <input className="inputPop" type="text" name="" id="toManege" />
              </div>
            </div>
            <div className="grid grid-cols-2 m-6 lg:w-1/2">
              <div className="inputDivPop">
                <label htmlFor="toManege">من عام</label>
                <input className="inputPop" type="date" name="" id="toManege" />
              </div>
              <div className="inputDivPop">
                <label htmlFor="toManege">الى عام</label>
                <input className="inputPop" type="date" name="" id="toManege" />
              </div>
            </div>
          </div>
        </div>
        <div className="text-center">
          <button
            type="submit"
            className="px-3 py-2 rounded-md bg-green-400 w-[100px] text-white"
          >
            حفظ
          </button>
        </div>
      </form>
    </motion.div>
  );
}
