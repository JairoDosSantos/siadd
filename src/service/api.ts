import axios from 'axios';

const api = axios.create({ baseURL: "http://192.168.20.153:8000/api" });
//const api = axios.create({ baseURL: "https://3521-41-205-53-233.ngrok-free.app/api" });

export { api };

