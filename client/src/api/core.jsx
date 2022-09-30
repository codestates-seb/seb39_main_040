// import axios from "axios";

// const instance = axios.create({
//   baseURL: `${process.env.REACT_APP_API}`,
// });

// axios.interceptors.request.use(
//   // function(config) {
//   //     config.headers["Authorization"] = ${}
//   // }
//   (response) => {
//     return response;
//   },

//   async (error) => {
//     const {
//       config,
//       response: { status },
//     } = error;
//     if (status === 401) {
//       if (error.response.data.message === "Unauthorized") {
//         const originalRequest = config;
//         const refreshToken = localStorage.getItem("refresh_token");
//         // token 재발급 요청
//         const { data } = await axios.post(`${baseURL}/users/token`, {
//           refreshToken,
//         });
//         // 새로운 access token 저장
//         const { accessToken: newAccessToken, refreshToken: newRefreshToken } =
//           data;
//         localStorage.multiSet([
//           ["accessToken", newAccessToken],
//           ["refreshToken", newRefreshToken],
//         ]);
//         axios.defaults.headers.common.AccessToken = `${newAccessToken}`;
//         originalRequest.headers.common.AccessToken = `${newAccessToken}`;

//         // 만료된 액세스 토큰 대신 새로 발급 받은 액세스 토큰으로 재요청
//         return axios(originalRequest);
//       }
//     }
//     return Promise.reject(error);
//   }
// );

// export default instance;

import axios from "axios";

const instance = axios.create({
  baseURL: process.env.REACT_APP_API,
  // baseURL: "http://localhost:3001/",
  // baseURL: process.env.REACT_APP_DB_HOST,
});

instance.interceptors.request.use(
  async (config) => {
    let token = sessionStorage.getItem("access_token") || "";
    config.headers["AccessToken"] = `${token}`; //여기는 accessToken
    axios.defaults.headers.common["AccessToken"] = `${token}`;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  (response) => {
    const res = response.data;
    return res;
  },
  (error) => {
    const { config, response: status } = error;
    if (status === 401) {
      if (error.response.data.message === "TokenExpiredError") {
        const originalRequest = config;
        const refreshToken = localStorage.getItem("refresh_Token");
        // token refresh 요청
        const { data } = axios.patch(
          `${process.env.REACT_APP_API}/users/token`, // token refresh api
          {
            refreshToken,
          }
        );
        // 새로운 토큰 저장
        const { accessToken: newAccessToken, refreshToken: newRefreshToken } =
          data;
        localStorage.multiSet([
          ["accessToken", newAccessToken],
          ["refreshToken", newRefreshToken],
        ]);
        axios.defaults.headers.common["AccessToken"] = `${newAccessToken}`;
        originalRequest.headers["AccessToken"] = `${newAccessToken}`;
        // 401로 요청 실패했던 요청 새로운 accessToken으로 재요청
        return axios(originalRequest);
      }
    }
    return Promise.reject(error);
  }
);

export default instance;
