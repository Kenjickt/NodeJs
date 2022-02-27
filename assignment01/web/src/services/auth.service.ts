import axios from "axios";
const API_URL = "http://localhost:8090/api/auth/";

class AuthService {
    // user login service
    login(username: string, password: string) {
        return axios
            .post(API_URL + "signin", {
                username,
                password
            })
            .then(response => {
                if (response.data.accessToken) {
                    localStorage.setItem("user", JSON.stringify(response.data))
                }
                return response.data;
            });
    }

    // user logout service
    logout() {
        localStorage.removeItem("user");
    }

    // create new user service
    register(username: string, email: string, password: string) {
        return axios.post(API_URL + "signup", {
            username,
            email,
            password
        });
    }

    // get current user
    getCurrentUser() {
        const userStr = localStorage.getItem("user");
        if (userStr) return JSON.parse(userStr);
        return null;
    }
}

export default new AuthService();