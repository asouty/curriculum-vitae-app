import axios from 'axios';
import { getToken } from '../component/Authentication.tsx';

export function getAuthRequest(url: string) {
  return axios.get(url, { headers: {'Authorization' : `Bearer ${getToken()}`}});
}
export function postAuthRequest(url: string, data: any) {
    return axios.post(url, { headers: {'Authorization' : `Bearer ${getToken()}`}}, data);
  }