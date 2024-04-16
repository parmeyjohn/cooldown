import axios from "axios";

axios.defaults.baseURL =
  process.env.NODE_ENV !== "production"
    ? "http://localhost:3003"
    : "https://cooldown-node-backend.fly.dev";

export default axios;
