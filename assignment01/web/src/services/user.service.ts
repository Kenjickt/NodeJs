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

class UserService {
    getPublicContent() {
        return axios.get(API_URL + 'all');
    }
    getUserDataAccess() {
        //return axios.get(API_URL + 'user', { headers: authHeader() });
        return axios.get(API_URL + 'user', { headers: token });
    }
    getAdminDataAccess() {
        //return axios.get(API_URL + 'admin', { headers: authHeader() });
        return axios.get(API_URL + 'admin', { headers: token });
    }
}

export default new UserService();