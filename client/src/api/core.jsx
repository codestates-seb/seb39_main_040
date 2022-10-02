import axios from "axios";

const instance = axios.create({
  baseURL: "",
  // baseURL: "http://localhost:3001/",
  // baseURL: process.env.REACT_APP_DB_HOST,
});

instance.interceptors.request.use(
  async (config) => {
    let token = localStorage.getItem("access_token") || "";
    const refreshtoken = localStorage.getItem("refresh_token");
    // config.headers["Content-Type"] = "application/json; charset=utf-8";
    config.headers["AccessToken"] = `${token}`; //여기는 accessToken
    // axios.defaults.withCredentials = true;
    axios.defaults.headers.common["AccessToken"] = `${token}`;
    // axios.defaults.headers.common["RefreshToken"] = `${refreshtoken}`;
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
    // const { config, response: status } = error;
    console.log(error.response.status);
    if (error.response.data.status === 401) {
      console.log("토큰 재발급");
      const originalRequest = error.config;
      const refreshtoken = localStorage.getItem("refresh_token");
      //const accesstoken = localStorage.getItem("access_token");
      console.log(refreshtoken);
      if (refreshtoken) {
        axios.defaults.headers.common["RefreshToken"] = `${refreshtoken}`;
        axios
          .patch(`${process.env.REACT_APP_API}/users/token`, {
            headers: { RefreshToken: refreshtoken },
          })
          .then((res) => {
            console.log(res.headers);
            localStorage.setItem("access_token", res.headers.accesstoken);
            localStorage.setItem("refresh_token", res.headers.refreshtoken);
            // const newRefreshToken = localStorage.getItem("refresh_token");
            const newAccessToken = localStorage.getItem("access_token");
            originalRequest.headers["AccessToken"] = `${newAccessToken}`;
            axios.defaults.headers.common["AccessToken"] = `${newAccessToken}`;
            window.alert("토큰재발급 성공!");
            window.location.reload();
            // 401로 요청 실패했던 요청 새로운 accessToken으로 재요청
            return axios(originalRequest);
          })
          .catch((err) => {
            localStorage.clear();
            window.alert("토큰 재발급 실패");
            console.log(err);
            window.location.href = "/";

            return false;
          });
      }
      // token refresh 요청
      // const data = axios.patch(
      //   `${process.env.REACT_APP_API}/users/token`, // token refresh api
      //   { headers: { RefreshToken: refreshtoken } }
      // );
      // console.log(data);

      // 새로운 토큰 저장
      // const { accesstoken: newAccessToken, refreshtoken: newRefreshToken } =
      //   data;
      // localStorage.multiSet([
      //   ["accessToken", newAccessToken],
      //   ["refreshToken", newRefreshToken],
      // ]);
      // axios.defaults.headers.common.Authorization = `${newAccessToken}`;
      // originalRequest.headers.Authorization = `${newAccessToken}`;
      // // 401로 요청 실패했던 요청 새로운 accessToken으로 재요청
      // return axios(originalRequest);
    }
    return Promise.reject(error);
  }
);

export default instance;
