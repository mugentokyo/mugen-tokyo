import axios from "axios";

export default axios.create({
<<<<<<< HEAD
  baseURL: "http://localhost:3000/api",
=======
  baseURL: `${import.meta.env.VITE_API_URL}/api`,
>>>>>>> b6804596885d160d01c6d87a2c8ae750931b843b
});
