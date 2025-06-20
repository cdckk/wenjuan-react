import axios, { ResDataType } from "./ajax";

type RegisterOption = {
    username: string
    password: string
}

// 用户注册
export const register = async (data: RegisterOption) => {
    const url = '/api/user/register'
    const res = await axios.post(url, data) as ResDataType
    return res
}

// 用户登录
export const login = async (data: RegisterOption) => {
    const url = '/api/user/login'
    const res = await axios.post(url, data) as ResDataType
    return res
}