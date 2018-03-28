import axios from "axios";
import { FETCH_USER } from "./types";

// export const fetchUser = () => {
//   return function(dispatcher) {
//     axios.get("/api/current_user").then(response => {
//       dispatcher({ type: FETCH_USER, payload: response });
//     });
//   };
// };

// export const fetchUser=()=>{
//   return async function(dispatcher){
//     let response=await axios.get("/api/current_user");
//     dispatcher({type:FETCH_USER, payload: response});
//   }
// }

export const fetchUser = () =>
  async function(dispatcher) {
    let response = await axios.get("/api/current_user");
    dispatcher({ type: FETCH_USER, payload: response });
  };
