import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:5000",
});

api.interceptors.response.use(
    response => response,
    error => {
        if (error.response && error.response.status === 401) {
            localStorage.removeItem("userToken");
            localStorage.removeItem("userData");
            window.location.reload();
        }
        return Promise.reject(error);
    }
);

export default api;
