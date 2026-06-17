
import {Redirect,Switch,Route} from 'react-router-dom'
import Login from './pages/auth/Login'
import Forgot from './pages/auth/Forgot'
import Home from './pages/Home'
import {useSelector} from 'react-redux';
import '@popperjs/core';
import './App.css';
import Loading from './components/Loading';
import { useAutoLogin } from './hooks/useAutoLogin';
import Employees from './pages/employee/Employees';
import Admins from './pages/admin/Admins';
import AddUser from './pages/user/AddUser';
import Employee from './pages/employee/Employee';
import EditUser from './pages/user/EditUser';
import Admin from './pages/admin/Admin';
import './App.css';
import './assets/css/bootstrap.min.css';
import './assets/css/style.css';
import './assets/css/components.css';
import SideBar from './components/sidebar';
import Navigation from './components/navigation';
import Attendance from './components/Employees/Attendance';
import LeaveApplications from './components/Employees/LeaveApplications';
import Salary from './components/Employees/Salary';
import ApplyForLeave from './components/Employees/ApplyForLeave';
import LeaveApplication from './components/Employees/LeaveApplication';
import DashboardEmployee from './components/DashboardEmployee';
import AttendanceView from './components/Admin/AttendanceView';
import LeaveView from './components/Admin/LeaveView';
import Leave from './components/Admin/Leave';
import AssignSalary from './components/Admin/AssignSalary';
import Salaries from './components/Admin/Salaries';
import SalaryView from './components/Admin/Salary';






const App = () =>
{
  const loading = useAutoLogin();

  return loading ? 
  <Loading/> : (
    <Switch>
      <EmployeeRoute exact path='/dashboardEmployee'>
        <DashboardEmployee/>
      </EmployeeRoute>
      <EmployeeRoute exact path='/userAttendance'>
        <Attendance/>
      </EmployeeRoute>
      <EmployeeRoute exact path='/applyforleave'>
        <ApplyForLeave/>
      </EmployeeRoute>
      <EmployeeRoute exact path='/userSalary'>
        <Salary/>
      </EmployeeRoute>
      <EmployeeRoute exact path='/userLeaveApplications'>
        <LeaveApplications/>
      </EmployeeRoute>
      <EmployeeRoute exact path='/userLeaveApplications/:id'>
        <LeaveApplication/>
      </EmployeeRoute>
      <GuestRoute exact path='/' >
        <Login/>
      </GuestRoute>
      <GuestRoute exact path='/login' >
        <Login/>
      </GuestRoute>
      <GuestRoute exact path='/forgot' >
        <Forgot/>
      </GuestRoute>
      <ProtectedRoute exact path='/home'>
        <Home/>
      </ProtectedRoute>
      <AdminRoute exact path='/employees'>
        <Employees/>
      </AdminRoute>
    
      <AdminRoute exact path='/admins'>
        <Admins/>
      </AdminRoute>
      
      <AdminRoute exact path='/adduser'>
        <AddUser/>
      </AdminRoute>
      <AdminRoute exact path='/attendance'>
        <AttendanceView/>
      </AdminRoute>
      <AdminRoute exact path='/leaves'>
        <LeaveView/>
      </AdminRoute>
      <AdminRoute exact path='/assignSalary'>
        <AssignSalary/>
      </AdminRoute>
      <AdminRoute exact path='/salaries'>
        <Salaries/>
      </AdminRoute>
      <AdminRoute exact path='/leaves/:id'>
        <Leave/>
      </AdminRoute>
      <AdminRoute exact path='/salary/:id'>
        <SalaryView/>
      </AdminRoute>
      
      <AdminRoute  path='/employee/:id'>
        <Employee/>
      </AdminRoute>
      
      <AdminRoute  path='/edituser/:id'>
        <EditUser/>
      </AdminRoute>
      
      <AdminRoute  path='/admin/:id'>
        <Admin/>
      </AdminRoute>
     
    </Switch>
  )
}


const GuestRoute = ({children,...rest}) =>
{
  const {isAuth} = useSelector((state)=>state.authSlice);
  return(
    <Route {...rest} render={({location})=>
    {
      return isAuth ? (
        <Redirect to={{pathname:'/home',state:{from:location}}} />
      ) : (children);
    }}>
    </Route>
  )
}


const ProtectedRoute = ({children,...rest}) =>
{
  const {isAuth} = useSelector((state)=>state.authSlice);
  return (
    <Route {...rest} render={({location})=>{
      return isAuth ? (
        <>
          <SideBar/>
          <Navigation/>
          {children}
        </>) : (
        <Redirect
          to={{
            pathname:'/',
            state:{
              from:location
            }
          }}
        />
      );
    }} />
  );
}

const AdminRoute = ({children,...rest}) =>
{
  const {user} = useSelector((state)=>state.authSlice);
  return (
    <Route {...rest} render={({location})=>{
      return user && user.type==='Admin' ? (
        <>
          <SideBar/>
          <Navigation/>
          {children}
        </>) : (
        <Redirect
          to={{
            pathname:'/',
            state:{
              from:location
            }
          }}
        />
      );
    }} />
  );
}

const EmployeeRoute = ({children,...rest}) =>
{
  const {user} = useSelector((state)=>state.authSlice);
  return (
    <Route {...rest} render={({location})=>{
      return user && user.type==='Employee' ? (
        <>
          <SideBar/>
          <Navigation/>
          {children}
        </>) : (
        <Redirect
          to={{
            pathname:'/',
            state:{
              from:location
            }
          }}
        />
      );
    }} />
  );
}

export default App;