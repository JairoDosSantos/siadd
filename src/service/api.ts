import axios from 'axios';

const api = axios.create({ baseURL: "https://instic.uniluanda.ao/siadd_back/api" });
//const api = axios.create({ baseURL: "https://3521-41-205-53-233.ngrok-free.app/api" });

export { api };

