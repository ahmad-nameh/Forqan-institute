import { useContext } from "react";
import { PopUp } from "../Home";

export default function EmpRequestThe() {
  const { setTClick, setclick } = useContext(PopUp);

  const SubmitHandel = (e) => {
    e.preventDefault();
    setTClick([1, 0, 0, 0, 0]);
    setclick([0, 0, 0, 0]);
  };
  return (
    <div className="container teachingReq p-10 text-center">
      <h1 className="text-[20px]">الخبرات السابقة</h1>
      <form
        onSubmit={SubmitHandel}
        action=""
        className="flex bg-white p-10 flex-col text-[13px] justify-center"
      >
        <div className="">
          <label htmlFor="toManege">اضافة خبرة</label>
          <input className="w/1/2" type="text" name="" id="toManege" />
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
    </div>
  );
}
