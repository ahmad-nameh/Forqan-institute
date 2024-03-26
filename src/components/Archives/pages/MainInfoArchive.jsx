import { useState ,useEffect,createContext } from "react";
import { useNavigate ,useLocation } from "react-router-dom";
import "../archives.css";
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import profileimg from "../../../assets/profilephoto.png";
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import BasicDatePicker from "../../Date/DatePiker";
import axios from "axios";

import Successimg from "../../../assets/pngwing.com.png";
import { IoIosCloseCircleOutline } from "react-icons/io";
import { motion } from "framer-motion";

export const PopUp = createContext(null);


const MainInfoArchive =() => {
    
    const navigate = useNavigate();
    const location = useLocation();

    const token = localStorage.getItem("token");
    const [profilePhoto,setProfilePhoto] = useState(profileimg);
    const [uploadedFileimage, setUploadedFileimage] = useState();

    const[allData,setAlldata] = useState();
    const [formData , setFormData] = useState();
    const[autographPhoto,setAutographPhoto] = useState(null)

    const [numOfChild,setNumofChild] = useState(0);
    const [emp_id,setEmpId] = useState();

    const [click, setclick] = useState([0, 0, 0, 0,0]);
    const [tClick, setTClick] = useState([1, 0, 0, 0,0]);


    useEffect(()=> {
        if (location.state && location.state.empid !== null) {
            setEmpId(location.state.empid);
            const fetchData = async () => {
                try {
                    const response = await axios.get(`http://127.0.0.1:8000/api/showEmpData/${location.state.empid}`, {
                        headers: {
                            Accept: "application/json",
                            'Authorization': `Bearer  ${token}`,
                        }
                    });

                    setAlldata(response.data);
                    setFormData(response.data.data[0]);
                    setNumofChild(response.data.data[0].childs_num);
                    if (response.data.data[0].autograph_photo) {
                        const photoFilename = response.data.data[0].autograph_photo;
                        const photoUrl = `http://127.0.0.1:8000/Autographs/${photoFilename}`;
                        setProfilePhoto(photoUrl);

                        const fileExtension = response.data.data[0].autograph_photo.split('.').pop();
                        const mimeType = `image/${fileExtension}`;
                        const blob = new Blob(['Placeholder content'], { type: mimeType });
                        const file = new File([blob], response.data.data[0].autograph_photo,{ type: mimeType });

                        setFormData(prevFormData => ({
                            ...prevFormData,
                            autograph_photo: file
                        }));
                    }
                } catch (error) {
                    console.error(error);
                }
            };
            fetchData();
        } else {
            setFormData({
                name: "",
                father_name: "",
                mother_name: "",
                autograph_photo: "",
                nationality_id: "1",
                birth_city: "",
                birth_date: "",
                sector_id: "1",
                work: "",
                from: "",
                start_date: "",
                leave_date: "",
                address: "",
                childs_num: numOfChild,
                rest_place: "",
                comp_num: "",
                contracted: "1",
                active: "1",
                nat_num: "",
                AppBook_num: "",
                AppBook_date: "",
                military: "4",
                social_status_id: "2",
                mobile_num: "",
                tele_num: "",
                military_rank: "",
                subject: "",
                school: "",
            });
        }
    }, [location.state]);

    const photoUpload = (e) => {
        e.preventDefault();
        try {
            const reader = new FileReader();
            const file = e.target.files[0];
            reader.onloadend = () => {
                setUploadedFileimage(file);
                setProfilePhoto(reader.result);
                setFormData({
                    ...formData,
                    autograph_photo: file,
                });
            }
            reader.readAsDataURL(file);
        } catch (error) {
            console.error(error);
        }
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };
    const handleChangeNumOfChildren = (action) => {
        setFormData(prevFormData => ({
            ...prevFormData,
            childs_num: action === "add" ? prevFormData.childs_num + 1 : Math.max(0, prevFormData.childs_num - 1),
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        let response;
        try {
            const formDataToSend = new FormData();
            Object.entries(formData).forEach(([key, value]) => {
                formDataToSend.append(key, value);
            });
            formDataToSend.append('autograph_photo', formData.autograph_photo);
            
            response = await axios.post(
                "http://127.0.0.1:8000/api/addEmp",
                formDataToSend,
                {
                    headers: {
                        Accept: "application/json",
                        'Authorization': `Bearer  ${token}`,
                    }
                }
            );
            if(response.status==200) {
                setEmpId(response.data.added_employee_id);
                setclick([1, 0, 0, 0,1])
            }
            
        } catch (error) {
            console.error(error);
        }

    };
    

    const handleDateChange = (date,selectedDate) => {
        const newData = { ...formData };
        newData[selectedDate] = date;
        setFormData(newData);
    }


    return (
        <div className="registeration">
            <form onSubmit={handleSubmit}>
            {formData && <div className="container">
                <span className="arrowBack" onClick={()=>navigate(-1)}>
                    <ArrowForwardIcon fontSize="small"/>رجوع 
                </span>
                <div className="first">
                    <p>المعلومات الرئيسية</p>
                    <div>
                        <label htmlFor="photo-upload" className="custom-img-upload">
                            <div className="img-upload" >
                                <img src={profilePhoto} alt="img" />
                            </div>
                            <input id="photo-upload" type="file" onChange={photoUpload} /> 
                        </label>
                    </div>
                    
                    <div>
                        <label>اسم العامل</label>
                        <input type="text" name="name" value={formData.name} onChange={handleChange} required/>

                        <label>اسم الوالد</label>
                        <input type="text" name="father_name" value={formData.father_name} onChange={handleChange} required/>
                        
                        <label>اسم الوالدة</label>
                        <input type="text" name="mother_name" value={formData.mother_name} onChange={handleChange} required/>
                        
                        <label>الجنسية</label>
                        <select name="nationality_id" value={formData.nationality_id} onChange={handleChange}>
                            <option value="1">سوري</option>
                            <option value="2">فلسطيني</option>
                            <option value="3">أردني</option>
                            <option value="4">لبناني</option>
                            <option value="5">عراقي</option>
                            <option value="6">مصري</option>
                        </select>
                    </div> 
                </div>

                <div className="second">
                    <p>المعلومات الشخصية</p>

                    <div>
                        <label>مكان الولادة</label>
                        <input type="text" name="birth_city" value={formData.birth_city} onChange={handleChange} required/>
                        
                        <label>تاريخ الولادة</label>
                        <BasicDatePicker datee={formData.birth_date} 
                            setDate={(date) => handleDateChange(date,"birth_date")}/>
                        
                        <label>مكان قيد النفوس</label>
                        <input type="text" name="rest_place" value={formData.rest_place} onChange={handleChange} required/>
                        
                        <label>الرقم الوطني</label>
                        <input type="text" name="nat_num" value={formData.nat_num} onChange={handleChange} required/>
                        
                        <label>العنوان</label>
                        <input type="text" name="address" value={formData.address} onChange={handleChange} required/>
                    </div>

                    <div>
                        <label>رقم الجوال </label>
                        <input type="tel" name="mobile_num" value={formData.mobile_num} onChange={handleChange} required/>
                        
                        <label>رقم الهاتف</label>
                        <input type="tel" name="tele_num" value={formData.tele_num} onChange={handleChange} />
                        
                        <label>الوضع العائلي</label>
                        <select name="social_status_id" value={formData.social_status_id} onChange={handleChange}>
                            <option value="1">متزوج</option>
                            <option value="2">أعزب</option>
                            <option value="3">مطلق</option>
                            <option value="4">أرمل</option>
                        </select>

                        <label>عدد الأولاد</label>
                        <div className="flex items-center gap-10">
                            <button style={{background:"var(--color6)",color:"white",borderRadius:"10px"}} 
                                onClick={() => handleChangeNumOfChildren("add")}><AddIcon fontSize="small"/>
                            </button>
                            {formData.childs_num}
                            <button style={{background:"var(--color6)",color:"white",borderRadius:"10px"}}
                                disabled={!(formData && formData.childs_num > 0)}
                                onClick={() => handleChangeNumOfChildren("subtract")}
                            ><RemoveIcon fontSize="small"/></button>
                        </div>

                        <label>عدد من يتقاضى عنهم تعويضا عائليا</label>
                        <input type="number" name="comp_num" value={formData.comp_num} onChange={handleChange} required/>
                        
                        <label>هل أدى خدمة العلم</label>
                        <select name="military" value={formData.military} onChange={handleChange}>
                            <option value="1">معفى من الخدمة</option>
                            <option value="2">مؤجل</option>
                            <option value="3">أخدم حاليا</option>
                            <option value="4">منتهي من الخدمة</option>
                        </select>

                        <label>رتبته العسكرية</label>
                        <input type="text" name="military_rank" value={formData.military_rank} onChange={handleChange}/>
                    </div>
                </div>

                <div className="second">
                    <p>حول</p>
                    <div>
                        <label>الفرع</label>
                        <select name="sector_id" value={formData.sector_id} onChange={handleChange}>
                            <option value="1">المهاجرين</option>
                            <option value="2">دمر ذكور</option>
                            <option value="3">دمر اناث</option>
                            <option value="4">القزاز</option>
                            <option value="5">زيد</option>
                            <option value="6">المزة</option>
                        </select>

                        <label>مستقيل</label>
                        <span className="flex ml-10 justify-around">
                            <input type="radio" id="activeYes" name="active" value="0" checked={formData.active == "0"} onChange={handleChange}/>
                            <label htmlFor="activeYes">نعم</label>
                            <input type="radio" name="active" id="activeNo" value="1" checked={formData.active == "1"} onChange={handleChange}/>
                            <label htmlFor="activeNo">لا</label>
                        </span>

                        <label>متعاقد</label>
                        <span className="flex ml-10 justify-around">
                            <input type="radio" id="contractedYes" name="contracted" value="1" checked={formData.contracted == "1"} onChange={handleChange}/>
                            <label htmlFor="contractedYes">نعم</label>
                            <input type="radio" id="contractedNo" name="contracted" value="0" checked={formData.contracted == "0"} onChange={handleChange}/>
                            <label htmlFor="contractedNo">لا</label>
                        </span>

                        <label>الوظيفة التي يشغلها</label>
                        <input type="text" name="work" value={formData.work} onChange={handleChange} required/>
                        
                        <label>قدمه في الوظيفة</label>
                        <BasicDatePicker datee={formData.from} 
                        setDate={(date) => handleDateChange(date,"from")}/>

                        <label>تاريخ المباشرة في الثانوية</label>
                        <BasicDatePicker datee={formData.start_date} 
                        setDate={(date) => handleDateChange(date,"start_date")}/>
                        
                    </div>

                    <div>
                        <label>رقم كتاب التعيين</label>
                        <input type="number" name="AppBook_num" value={formData.AppBook_num} onChange={handleChange} required/>
                    
                        <label>تاريخ التعيين</label>
                        <BasicDatePicker datee={formData.AppBook_date} 
                        setDate={(date) => handleDateChange(date,"AppBook_date")}/>

                        <label>تاريخ الانفكاك</label>
                        <BasicDatePicker datee={formData.leave_date} 
                        setDate={(date) => handleDateChange(date,"leave_date")}/>
                        
                        <label>المواد التي يدرسها</label>
                        <textarea name="subject" value={formData.subject} onChange={handleChange}></textarea>

                        <label>  اسم المدرسة المشترك معها ان وجدت</label>
                        <input type="text" name="school" value={formData.school} onChange={handleChange}/>
                    </div>
                </div>
                <input type="submit"
                    className="px-3 py-2 rounded-md bg-green-400 w-[100px] text-white mx-auto submitMainDataArchive" value="حفظ"
                />

                <button className="next-buttons" 
                    disabled={!emp_id}
                    onClick={()=>navigate("/archive/part2", { state: {  empid: emp_id ,data: allData } })} 
                >
                    <span>المزيد </span>
                </button>
            </div>
            
            }
        

            {click[0] ? (
                    <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3, delay: 0.1 }}
                    className="fixed top-0 left-0 w-full h-screen bg-black/50"
                    >
                    <div className=" relative container bg-white p-2 w-[90%] md:w-2/3 shadow-md  rounded-md mx-auto top-1/2 -translate-y-1/2">
                        <div
                        className="absolute top-2 right-2 text-black/70 cursor-pointer rounded-full"
                        onClick={() => {
                            setclick([0, 0, 0, 0]);
                            setTClick([1, 0, 0, 0]);
                        }}
                        >
                        <IoIosCloseCircleOutline size={35} />
                        </div>
                        <PopUp.Provider value={{ tClick, setTClick, setclick }}>
                        <div className="max-h-[90vh] ">
                            {click[4] ? (
                            <div>
                                <img src={Successimg} className="w-48 mx-auto"/>
                                <p className="font-extrabold text-2xl text-center">
                                    تم الحفظ بنجاح
                                </p>
                            </div>
                            ) : null}
                        </div>
                        </PopUp.Provider>
                    </div>
                    </motion.div>
                ) : null}
                </form>
            </div>
    )
}

export default MainInfoArchive;

