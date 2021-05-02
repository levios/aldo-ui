import axios from "axios";

const { REACT_APP_AXIOS_HOST } = process.env;
const { REACT_APP_AXIOS_PORT } = process.env;

export default axios.create({
  //baseURL: "http://localhost:8081",
  baseURL: `http://${REACT_APP_AXIOS_HOST}:${REACT_APP_AXIOS_PORT}`,  // TODO
  headers: {
    "Content-type": "application/json"
  }
});