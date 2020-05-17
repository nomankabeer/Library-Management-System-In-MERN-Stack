import axios from './axios';
import getAuthHeader from './getAuthHeader';
import UserModel from "../models/User"
import cookie from "js-cookie";

export const getCurrentUser = async () => {
  try {
    const { data } = await axios.post(
      '/auth/user',
      {},
      { headers: await getAuthHeader() }
    );
    return { success: true , data: new UserModel(data) };
  } catch (error) {
    return { success: false , message: 'Please login again' };
    switch (error.response.status) {
      case 400:
        return { success: false , message: 'Please login again' };
      default:
        return { success: false , message: 'There was an error logging you in. Please, try again. '}
    }
  }
};

export const login = async (email , password) => {
  try {
    const {data}  = await axios.post(
      '/auth/login',
      { email , password},
    );
    return { success: true , data: new UserModel(data.user , data.authToken) };
  } catch (error) {
    return { success: false , message: 'Incorrect email or password!' };
    switch (error.response.status) {
      case 400:
        return { success: false , message: 'Incorrect email or password!' };
      default:
        return { success: false , message: 'There was an error logging you in. Please, try again. '}
    }
  }
};


export const logout = async () => {
  localStorage.removeItem('user');
  cookie.remove('authToken')
  return { success: true , message: 'User is logged out' };
};


export const updateUserProfile = async (email , username) => {
  try {
    const { data } = await axios.post(
      '/auth/user/update',
      { email , username},
      { headers: await getAuthHeader() }
    );
    return { success: true , data: new UserModel(data.user) };
  } catch (error) {
    return { success: false , message: 'Please login again' };
    switch (error.response.status) {
      case 400:
        return { success: false , message: 'Please login again' };
      default:
        return { success: false , message: 'There was an error logging you in. Please, try again. '}
    }
  }
};