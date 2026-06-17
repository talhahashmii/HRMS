import axios from 'axios';
const api = axios.create({
    baseURL:`http://localhost:4000/api`,
    withCredentials:true
})


export const doLogin = data => api.post('/auth/login',data);
export const forgotPassword = data => api.post('/auth/forgot',data);
export const resetPassword = data => api.patch('/auth/reset',data);
export const dLogout = () => api.get('/auth/logout');

export const getCounts = () => api.get('/admin/counts');
export const getEmployees = () => api.get('/admin/employees');
export const getAdmins = () => api.get('/admin/admins');
export const addUser = data => api.post('/admin/user',data);
export const updateUser = (id,data) => api.patch(`/admin/user/${id}`,data);
export const getEmployee = data => api.get(`/admin/employee/${data}`);
export const getFreeEmployees = () => api.get('/admin/employees/free');
export const getUser = data => api.get(`/admin/user/${data}`);
export const getAttendance = data => api.post('admin/view-employee-attendance',data);
export const viewLeaves = data => api.post('admin/view-leave-applications',data);
export const updateLeave = (id,data) => api.post(`admin/update-leave/${id}`,data);
export const assignSalary = data => api.post('admin/assign-employee-salary',data);
export const updateSalary = data => api.post('admin/update-employee-salary',data);
export const viewAllSalaries = data => api.post('admin/view-all-salary',data);

export const markEmployeeAttendance = data => api.post('/employee/mark-employee-attendance',data);
export const viewEmployeeAttendance = data => api.post('/employee/view-employee-attendance',data);
export const applyforleave = data => api.post('/employee/apply-leave-application',data);
export const viewLeaveApplications = data  => api.post('/employee/view-leave-applications',data);
export const viewEmployeeSalary = data => api.post('employee/view-salary',data);

api.interceptors.response.use((response)=>{
    console.log("All Cookies",document.cookie);
    return response.data;
},(error)=>{
    console.log(error);
    return error.response.data
})

export default api;