import axios from "axios";

const instance = axios.create({
  baseURL: "",
});

instance.interceptors.request.use(
  async (config) => {
    let token = localStorage.getItem("access_token") || "";
    config.headers["AccessToken"] = `${token}`;
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
    if (error.response.data.status === 401) {
      const originalRequest = error.config;
      const refreshtoken = localStorage.getItem("refresh_token");

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

            const newAccessToken = localStorage.getItem("access_token");
            originalRequest.headers["AccessToken"] = `${newAccessToken}`;
            axios.defaults.headers.common["AccessToken"] = `${newAccessToken}`;

            window.location.reload();
            return axios(originalRequest);
          })
          .catch((err) => {
            localStorage.clear();
            console.log(err);
            window.location.href = "/";

            return false;
          });
      }
    }
    return Promise.reject(error);
  }
);

export default instance;
