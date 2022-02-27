import axios from 'axios';
//import authHeader from './auth-header';

// Generate the header token (since could not use from import function authHeader)
const userStr = localStorage.getItem("user");
let user: { accessToken: string; } | null = null;
if (userStr)
    user = JSON.parse(userStr);
let token = {};
if (user && user.accessToken) {
    token = { 'x-access-token': user.accessToken }; 
}

const API_URL = 'http://localhost:8090/api/test/';

class EmployeeService {
    getEmployee(param:{}) {
        return axios.post(API_URL + 'employeefilter',param, { headers: token });
    }

    getEmployeeCount(param:{}) {
        return axios.post(API_URL + 'employeecountbymonth',param, { headers: token });
    }

    getEmployeeSalaryDepartment(param:{}) {
        return axios.post(API_URL + 'employeesalarybydept',param, { headers: token });
    }
}

export default new EmployeeService();