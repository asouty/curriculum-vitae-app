import axios from 'axios';
import { getToken } from '../component/Authentication.tsx';

export async function getAuthRequest<T>(url: string): Promise<T> {
  try {
    return (await axios.get(url, { headers: { 'Authorization': `Bearer ${getToken()}` } })).data;
  } catch (reason) {
    console.log(reason);
    throw reason;
  }
}
export async function postAuthRequest<T>(url: string, data: any): Promise<T> {
  try {
    return (await axios.post(url, { headers: { 'Authorization': `Bearer ${getToken()}` } }, data)).data;
  } catch (reason) {
    console.log(reason);
    throw reason;
  }
}