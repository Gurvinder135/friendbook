import axios from "axios";
const instance = axios.create({ baseURL: "https://fbclone-gur.herokuapp.com" });
// instance.defaults.headers.common["Content-Type"] = "multipart/form-data";

export default instance;
