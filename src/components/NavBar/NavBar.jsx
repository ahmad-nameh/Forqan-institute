import { NavLink } from "react-router-dom";
import "./NavBar.css"
import Logo from "../../assets/Logo.png"
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import WorkRoundedIcon from '@mui/icons-material/WorkRounded';
import GroupRoundedIcon from '@mui/icons-material/GroupRounded';
import DescriptionRoundedIcon from '@mui/icons-material/DescriptionRounded';

const NavBar = () => {
    return (
        <div>
            <nav className="asideNav">
                <img src={Logo} alt="logo" className="Logo" />
                <NavLink to="/" className="flex flex-col items-center font-large">
                    <HomeRoundedIcon/>
                    الصفحة الرئيسية
                </NavLink>
                <NavLink to="/a" className="flex flex-col items-center font-large">
                    <WorkRoundedIcon/>
                    الوظائف
                </NavLink>
                <NavLink to="/b" className="flex flex-col items-center font-large">
                    <GroupRoundedIcon/>
                    المدرسين
                </NavLink>
                <NavLink to="/c" className="flex flex-col items-center font-large">
                    <DescriptionRoundedIcon/>
                    التقارير
                </NavLink> 
            </nav>
            <nav className="dd">
                <button>Logout</button>
            </nav>
        </div>
    )
}

export default NavBar;