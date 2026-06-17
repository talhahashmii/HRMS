import { NavLink } from "react-router-dom";

const Admin = () =>
{
    return(
        <ul className="sidebar-menu">
        <li><NavLink className="nav-link" to="/home"><i className="fas fa-home"></i> <span>Dashboard</span></NavLink></li>
        <li><NavLink className="nav-link" to="/employees"><i className="fas fa-users"></i> <span>Employees</span></NavLink></li>
        <li><NavLink className="nav-link" to="/admins"><i className="fas fa-users-cog"></i> <span>Admins</span></NavLink></li>
        <li><NavLink className="nav-link" to="/attendance"><i className="fas fa-user"></i> <span>Attendance</span></NavLink></li>
        <li><NavLink className="nav-link" to="/leaves"><i className="fas fa-book"></i><span>Leaves</span></NavLink></li>
        <li><NavLink className="nav-link" to="/assignSalary"><i class="fas fa-pen"></i> <span>Assign Salary</span></NavLink></li>
        <li><NavLink className="nav-link" to="/salaries"><i class="fas fa-piggy-bank"></i> <span>Salaries</span></NavLink></li>

        <li className="menu-header">Starter</li>
        <li><NavLink className="nav-link" to="/adduser"><i className="fas fa-user-plus"></i> <span>Add User</span></NavLink></li>

        </ul>
    )
}

export default Admin;