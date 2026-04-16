import axios from "axios"

const API = import.meta.env.PROD
  ? "/.netlify/functions"
  : "http://localhost:3001"


export default API