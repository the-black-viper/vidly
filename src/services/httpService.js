import axios from "axios";

// Handle Unexpected errors globally
// axios.interceptors.response.use(null, (error) => {
//   const expectedError =
//     error.response && error.response >= 400 && error.response.status < 500;
//   if (!expectedError) {
//     console.log("Logging Error", error);
//     alert("Unexpected error occured");
//   }
//   return Promise.reject(error); // Goes to the try catch block
// });

export default {
  get: axios.get,
  post: axios.post,
  put: axios.put,
  delete: axios.delete,
};
