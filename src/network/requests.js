import axios from "axios";
import {
    SUCCESS,
    LOGIN_ERROR,
    LOGIN_SERVER_ERROR,
    PROVIDE_INFO_ERROR,
    INFO_REPEAT,
    TOKEN_ERROR
} from "./status"

const cacheMap = new Map(); // 执行请求缓存，解决同时间多此请求同一接口问题

const cacheRequest = async(options) =>{
  let promise = null,
  optionsString = JSON.stringify(options);

if (!cacheMap.has(optionsString)) {
  promise = new Promise((resolve, reject) => {
    request(options)
      .then(res => {
        cacheMap.delete(optionsString);
        resolve(res.data);
      })
      .catch(e => {
        cacheMap.delete(optionsString);
        reject(e);
      });
  });
  cacheMap.set(optionsString, promise);
  return promise;
} else {
  return cacheMap.get(optionsString);
}
}
export function request (option) {
    return new Promise((resolve,reject)=>{
        const instances  = axios.create({
            baseURL:'https://mock.apifox.cn/m1/2971789-0-default',
            timeout:5000,
        })

         instances.interceptors.request.use(
            params=>{
                if (
                    Object.prototype.hasOwnProperty.call(params.headers, 'token') ||
                    params.headers['token']
                  )
                    params.headers['token'] = store.getState().user.token;
                    return params;
            },
            err =>{
                return Promise.reject(err);
            }
         );

         instances.interceptors.response.use(
            function (response) {
              // 对自定义状态码进行分析
              switch (response.data.code) {
                /* 成功登录 */
                case SUCCESS.code:
                  break;
                /* 登录失败 */
                case LOGIN_ERROR.code:
                  return Promise.reject(LOGIN_ERROR.msg);
                /* 服务端异常，登录失败 */
                case LOGIN_SERVER_ERROR.code:
                  window.localStorage.removeItem("token");
                  return Promise.reject(LOGIN_SERVER_ERROR.msg);
                /* token验证失败 */
                case TOKEN_ERROR.code:
                  window.localStorage.removeItem("token");
                  return Promise.reject(TOKEN_ERROR.msg);
                /* 服务端异常 */
                // case SERVER_EXCEPTION.code:
                //  return Promise.reject(SERVER_EXCEPTION.msg);
                /* 提供信息错误导致相应失败 */
                case PROVIDE_INFO_ERROR.code:
                  ElMessage("error", response.data.msg);
                  return Promise.reject(PROVIDE_INFO_ERROR.msg);
                /* 提交信息重复，如服务端某个号码已经注册 */
                case INFO_REPEAT.code:
                  ElMessage("error", response.data.msg);
                  return Promise.reject(INFO_REPEAT.msg);
                default:
                  break;
              }
              return response;
            },
            function (err) {
              return Promise.reject(err);
            }
          );
          instances(option)
          .then((res) => {
            resolve(res);
          })
          .catch((err) => {
            reject(err);
          });
    })
}

/**
 * @description: get方法
 * @return {Promise} 请求返回的Promise
 * @author: Austral
 */
export const Get =(options)=>{
    return cacheRequest (
        {
            ...options,
            method:'GET'
        }
    )

}

/**
 * @description: post方法
 * @return {Promise} 请求返回的Promise
 * @author: Austral
 */
export const Post = (options)=>{
    return cacheRequest (
        {
            ...options,
            method:'POST'
        }
    )

}

/**
 * @description: delete方法
 * @return {Promise} 请求返回的Promise
 * @author: Austral
 */
export const Delete = (options)=>{
    return cacheRequest (
        {
            ...options,
            method:'DELETE'
        }
    )

}

/**
 * @description: put方法
 * @return {Promise} 请求返回的Promise
 * @author: Austral
 */
export const Put = (options)=>{
    return cacheRequest (
        {
            ...options,
            method:'PUT'
        }
    )

}
