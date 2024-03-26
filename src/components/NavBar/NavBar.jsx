import { React , useState ,useEffect } from "react";
import { NavLink ,useNavigate ,useLocation} from "react-router-dom";
import "./NavBar.css"
import Logo from "../../assets/Logo.png"
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import WorkRoundedIcon from '@mui/icons-material/WorkRounded';
import GroupRoundedIcon from '@mui/icons-material/GroupRounded';
import DescriptionRoundedIcon from '@mui/icons-material/DescriptionRounded';
import LogoutIcon from '@mui/icons-material/Logout';
import axios from "axios";

const NavBar = () => {

    const navigate = useNavigate();
    const token = localStorage.getItem('token');

    const [hideNavBar, setHideNavBar] = useState(false);

    useEffect(() => {
        function checkHideNav() {
            if (window.location.pathname === '/login') {
                setHideNavBar(true);
            }
            else {
                setHideNavBar(false);
            }
        }

        checkHideNav();
    }, [window.location.pathname]);
    

    const handleLogout = async () => {
        try {
            console.log(token);
            const response = await axios
            .post(
                "http://127.0.0.1:8000/api/logout",{},{
                    headers: {
                        Accept: "application/json",
                        'Authorization': `Bearer ${token}`,
                    },
                }
                
            );
            console.log(response);
            if(response.status===200) {
                localStorage.removeItem('token');
                navigate("/login");
            }
        }
        catch(error){
            console.error('log-out error:', error);
        }
    }
    return (
        <>
        {!hideNavBar && <nav>
            <img src={Logo} alt="logo" className="Logo" />
            <NavLink to="/" className="flex items-center font-large">
                <HomeRoundedIcon/>
                <span>الصفحة الرئيسية</span>
            </NavLink>
            <NavLink to="/a" className="flex items-center font-large">
                <WorkRoundedIcon/>
                <span>الوظائف</span>                
            </NavLink>
            <NavLink to="/b" className="flex items-center font-large">
                <GroupRoundedIcon/>
                <span>المدرسين</span>            
            </NavLink>
            <NavLink to="/c" className="flex items-center font-large">
                <DescriptionRoundedIcon/>
                <span>التقارير</span>      
            </NavLink>
            <button  
            className="flex justify-end items-center grow font-large"
            onClick={()=>handleLogout()}
            >
            <LogoutIcon/>
            تسجيل الخروج
            </button>
        </nav>
        }
        </>
    )
}

export default NavBar;