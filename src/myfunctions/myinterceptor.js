
import axios from 'axios';

axios.interceptors.response.use(function (response) {
    return response;
  }, function (error) {
  
    const originalRequest = error.config;
  
    if (error.response.status === 400 && !originalRequest._retry) {
        console.log('interceptor runninggg..')
    }
  
    return Promise.reject(error);
  });

  export default axios