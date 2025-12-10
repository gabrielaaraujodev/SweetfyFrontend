import api from "../pathConfiguration";
import {  IRequestRegister, RequestLogin } from "./types";

export async function fetchLogin(request: RequestLogin) {
    const response = await api.post('/Auth/login', request);
    return response.data;
  }

export async function fetchRegister(request: IRequestRegister) {
    const response = await api.post('/Auth/register', request);
    return response.data;
  }