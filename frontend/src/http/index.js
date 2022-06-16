import axios from 'axios';

export const API_URL = `https://frontend-test-assignment-api.abz.agency/api/v1/`

const $api = axios.create({
    //withCredentials: true,
    baseURL: API_URL
})

/*
// Ниже если используем токен авторизацию
$api.interceptors.request.use((config) => {
    config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`
    return config;
})

$api.interceptors.response.use((config) => {
    return config;
},async (error) => {
    const originalRequest = error.config;
    // eslint-disable-next-line
    if (error.response.status == 401 && error.config && !error.config._isRetry) {
        originalRequest._isRetry = true;
        try {
            const response = await axios.get(`${API_URL}/refresh`, {withCredentials: true})
            localStorage.setItem('token', response.data.accessToken);
            return $api.request(originalRequest);
        } catch (e) {
            console.log('НЕ АВТОРИЗОВАН')
        }
    }
    throw error;
})
*/
export default $api;
