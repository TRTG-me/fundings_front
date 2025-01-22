import axios from "axios";


export const instance = axios.create({
    baseURL: 'http://localhost:5000',
    timeout: 1000,
});

export const newsInstance = axios.create({
    baseURL: 'https://min-api.cryptocompare.com/data/v2/',
    timeout: 1000,
});

export const coinGeckoApi = axios.create({
    baseURL: 'https://api.coingecko.com/api/v3',
    timeout: 1000,
    headers: { 'x-custom': 'foobar' }
});

export const instanceAuth = axios.create({
    baseURL: `${process.env.REACT_APP_BACKEND_URL}`,
    timeout: 1000,
});

// === ДОБАВЛЯЕМ INTERCEPTOR ===
instanceAuth.interceptors.request.use((config) => {
    const token = sessionStorage.getItem('token');  // Берем токен каждый раз перед запросом
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
}, (error) => {
    return Promise.reject(error);
});