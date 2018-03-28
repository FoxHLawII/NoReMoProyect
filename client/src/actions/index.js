import axios from "axios";
import { FETCH_USER } from "./types";

const fetchUser = dispatcher => {
  axios
    .get("/api/current_user")
    .then(response => dispatcher({ type: FETCH_USER, payload: response }));
};
