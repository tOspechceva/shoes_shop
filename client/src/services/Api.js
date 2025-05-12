import axios from 'axios';

export default () => {
    const token = localStorage.getItem('token'); // или как ты хранишь токен

    return axios.create({
        baseURL: `http://localhost:8081/`,
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
};

//http://host.docker.internal:8081