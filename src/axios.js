import axios from "axios";
const instance = axios.create({
    baseURL: 'https://us-central1-clone-4acce.cloudfunctions.net/api' // THE API (Cloud Function) URL

    // baseURL: 'http://localhost:5001/clone-4acce/us-central1/api' // THE API (Cloud Function) URL


});

export default instance;