import axios from "axios";

import { getItem as storageGetItem } from './storage'

const REQUEST_TIMEOUT = 1500;

let user = storageGetItem('user');

export const ajaxRequest = () => {
    let headers = {
        'Content-Type': 'application/json'
    }

    if (null === user) {
        user = storageGetItem('user');
    }

    if (user && user.hasOwnProperty("token")) {
        headers = { ...headers, Authorization: 'Bearer ' + user.token }
    }

    const axiosInstance = axios.create({
        timeout: REQUEST_TIMEOUT,
        headers: headers
    });

    return axiosInstance;
}
