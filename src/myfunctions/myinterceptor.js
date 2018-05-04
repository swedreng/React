
import axios from 'axios';

axios.interceptors.response.use(function (response) {
    return response.data;
  }, function (error) {
  
    const originalRequest = error.config;
  
    if (error.response.status === 401 && !originalRequest._retry) {
        localStorage.removeItem('auth')
        window.location = "#/login"
    }
  
    return Promise.reject(error);
  });

  export default axios