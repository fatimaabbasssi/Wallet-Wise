import { NavLink } from "react-router-dom";
import logo from '../images/logoWise.png'
const Sidebar = ({ isOpen, toggleSidebar }) => {
    return (
      <div
        className={`
          bg-gray-900 text-white w-64 p-4 h-screen
          fixed top-0 left-0 z-50 
          transition-transform duration-300 ease-in-out
          transform ${isOpen ? "translate-x-0" : "-translate-x-full"} 
          md:translate-x-0 md:relative md:h-auto side
        `}
      >
        {/* Close button for mobile */}
        <div className="flex justify-end md:hidden ">
          <button onClick={toggleSidebar} className="text-2xl">&times;</button>
        </div>
  
        <h1 className="text-xl font-bold mb-4"><img className="logo-img" src={logo} alt="logoImage" /></h1>
        <ul className="space-y-2 sidebar-links">
          <li className="nav-li dash"><NavLink to="/dashboard" onClick={toggleSidebar} id="dashboard"><i className="fa-solid fa-gauge-high"></i> Dashboard</NavLink></li>
          <li className="nav-li"><NavLink to="/income" onClick={toggleSidebar} id="income"><i className="fa-solid fa-dollar-sign"></i> Income</NavLink></li>
          <li className="nav-li"><NavLink to="/profile" onClick={toggleSidebar} id="profilePage"><i className="fa-solid fa-user"></i> Profile</NavLink></li>
          <li className="nav-li"><NavLink to="/security" onClick={toggleSidebar} id="security"><i className="fa-solid fa-lock"></i> Security</NavLink></li>
          <li className="nav-li"><NavLink to="/signup" onClick={toggleSidebar} id="sign"><i className="fa-brands fa-wpforms"></i> SignUp</NavLink></li>
          <li className="nav-li"><NavLink to="/login" onClick={toggleSidebar} id="log"> <i className="fa-brands fa-wpforms"></i> LogIn</NavLink></li>

        </ul>
      </div>
    );
  };
  
  export default Sidebar;