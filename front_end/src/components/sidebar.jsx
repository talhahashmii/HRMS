import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom"
import Admin from './Navigation/Admin';
import Employee from './Navigation/Employee';

const SideBar = () => {

  const {user} = useSelector(state => state.authSlice);
  
  return (
    <div className="main-sidebar">
      <aside id="sidebar-wrapper">
        <div className="sidebar-brand">
          <NavLink to="/home">HRMS</NavLink>
        </div>
        <div className="sidebar-brand sidebar-brand-sm">
          <NavLink to="/home">TM</NavLink>
        </div>
        {
            (user.type==='Admin') ? <Admin/>  : <Employee/>
        }
        <div className="mt-4 mb-4 p-3 hide-sidebar-mini">
        </div>
      </aside>
    </div>
  )
}

export default SideBar;