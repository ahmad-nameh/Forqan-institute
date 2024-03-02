import { useState } from "react";
import "./archives.css";
import DatePiker from "../Date/DatePiker";
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import profileimg from "../../assets/profilephoto.png";
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';

const MainInfoArchive =() => {

    const [profilePhoto,setProfilePhoto] = useState(profileimg);
    const [uploadedFileimage, setUploadedFileimage] = useState();

    const photoUpload = (e) =>{
        e.preventDefault();
        try {
        const reader = new FileReader();
        const file = e.target.files[0];
        reader.onloadend = () => {
            setUploadedFileimage(file);
            setProfilePhoto(reader.result);
        }
        reader.readAsDataURL(file);
        }
        catch {}
    } 

    const [numOfChild,setNumofChild] = useState(0);

    return (
        <div className="registeration">
            <div className="container">
                <span className="arrowBack">
                    <ArrowForwardIcon fontSize="small"/>رجوع 
                </span>
                
                <div className="first">
                    <p>المعلومات الرئيسية</p>
                    <div>
                        <label htmlFor="photo-upload" className="custom-img-upload">
                            <div className="img-upload" >
                                <img htmlFor="photo-upload" src={profilePhoto} alt="img"/>
                            </div>
                            <input id="photo-upload" type="file" onChange={photoUpload}/> 
                        </label>
                    </div>
                    <div>
                    
                        <label>
                            اسم العامل  
                        </label>
                        <input type="text" />
                        <label>
                            اسم الوالد
                        </label>
                        <input type="text" />
                        <label>
                            اسم الوالدة
                        </label>
                        <input type="text" />
                        <label>
                            الجنسية
                        </label>
                        <select>
                            <option>سوري</option>
                            <option>أردني</option>
                            <option>فلسطيني</option>
                        </select>
                    </div> 
                </div>

                <div className="second">
                    <p>المعلومات الشخصية</p>

                    <div>
                        <label>
                            مكان الولادة
                        </label>
                        <input type="text"/>
                        <label>
                            تاريخ الولادة
                        </label>
                        <DatePiker/>
                        <label>
                            مكان قيد النفوس
                        </label>
                        <input type="text"/>
                        <label>
                            الرقم الوطني
                        </label>
                        <input type="text"/>
                        <label>
                            العنوان
                        </label>
                        <input type="text"/>
                    </div>

                    <div>
                        <label>
                            رقم الجوال
                        </label>
                        <input type="text"/>
                        <label>
                            رقم الهاتف
                        </label>
                        <input type="text"/>
                        <label>متزوج</label>
                        
                        
                        <span style={{display: "flex",marginLeft: "40px",justifyContent: "space-around"}}>
                        
                        <input type="radio" id="yse" name="ha"/>
                        <label htmlFor="yse">نعم</label>
                        <input type="radio" name="ha"/>
                        <label>لا</label>
                        </span>
                        <label>
                            عدد الأولاد
                        </label>
                        <div style={{display:"flex",alignItems:"center",gap:"40px"}}>
                            <button style={{background:"var(--color6)",color:"white",borderRadius:"10px"}} 
                            onClick={()=>setNumofChild(numOfChild+1)} ><AddIcon fontSize="small"/></button>
                            {numOfChild}
                            <button style={{background:"var(--color6)",color:"white",borderRadius:"10px"}}
                            disabled = {numOfChild===0}
                            onClick={()=>setNumofChild(numOfChild-1)}><RemoveIcon fontSize="small"/></button>
                        </div>

                        <label>
                            عدد من يتقاضى عنهم تعويضا عائليا
                        </label>
                        <label></label>


                        <label>
                            هل أدى خدمة العلم
                        </label>
                        <span style={{display: "flex",marginLeft: "40px",justifyContent: "space-around"}}>
                        <input type="radio" id="yse" name="ha"/>
                        <label htmlFor="yse">نعم</label>
                        <input type="radio" name="ha"/>
                        <label>لا</label>
                        
                        </span>

                        <label>
                        رتبته العسكرية
                        </label>
                        <input type="text"/>
                    </div>
                </div>


                        <div className="second">
                            <p>حول</p>
                            <div className="">
                            <label>الفرع</label>
                            <select>
                                <option>مالكي</option>
                            </select>

                            <label>
                                مستقيل
                            </label>
                            <span style={{display: "flex",marginLeft: "40px",justifyContent: "space-around"}}>
                            <input type="radio" id="yse" name="ha"/>
                            <label htmlFor="yse">نعم</label>
                            <input type="radio" name="ha"/>
                            <label>لا</label>
                            
                            </span>

                            <label>
                                متعاقد
                            </label>
                            <span style={{display: "flex",marginLeft: "40px",justifyContent: "space-around"}}>
                            <input type="radio" id="yse" name="ha"/>
                            <label htmlFor="yse">نعم</label>
                            
                            <input type="radio" name="ha"/>
                            <label>لا</label>
                            
                            </span>

                            <label>الوظيفة التي يشلها</label>
                            <input type="text"/>
                            <label>قدمه في الوظيفة</label>
                            <input type="text"/>
                            <label>رقم كتاب التعيين</label>
                            <input type="text"/>
                            <label>تاريخ التعيين</label>
                            <DatePiker/>
                            </div>

                            <div className="">
                                <label>تاريخ الانفكاك</label>
                                <DatePiker/>
                                <label>المواد التي يدرسها</label>
                                <textarea></textarea>
                                <label>
                            
                                هل الموظف مشترك مع مدرسة أخرى
                            </label>
                            <span style={{display: "flex",marginLeft: "40px",justifyContent: "space-around"}}>
                            <input type="radio" id="yse" name="ha"/>
                            <label htmlFor="yse">نعم</label>
                            <input type="radio" name="ha"/>
                            <label>لا</label>
                            
                            </span>

                            <label>ما اسم المدرسة</label>
                            <input type="text"/>
                            </div>

                            

                        </div>

            </div>
            </div>
    )
}

export default MainInfoArchive;

