import axios from 'axios';

const baseURL = 'https://erpapi.fuliaoyi.com:9051';

export const setCookie = (key, value) => {
  const exp = new Date();
  exp.setTime(exp.getTime() + (1000 * 60 * 60 * 24));
  document.cookie = `${key}=${value};expires=${exp.toGMTString()};path=/`;
};


export const getCookie = (key) => {
  const ca = document.cookie.split(';');
  let value = '';
  ca.forEach((item) => {
    const c = item;
    if (c.indexOf(`${key}=`) >= 0) {
      value = c.replace(`${key}=`, '');
    }
  });
  return value.trim();
};


axios.interceptors.request.use((req) => {
  if (req.headers.Token) {
    return req;
  }

  const o = Object.assign({}, req, {
    headers: {
      common: {
        Token: getCookie('token') || '******',
      },
    },
  });
  return o;
}, error => Promise.reject(error));

export const req = (method ,url, data, params) => new Promise((res)=>{
  axios({
    method: method || 'GET',
    url: baseURL + url,
    params,
    data,
    timeout: 20 * 1000,
  }).then(r => {
    res(r.data);
  })
});
