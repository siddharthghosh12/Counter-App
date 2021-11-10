import axios from "axios";

export default axios.create({
  baseURL: "https://interview-8e4c5-default-rtdb.firebaseio.com/front-end",
  headers: { "Content-Type": "application/json" },
});
