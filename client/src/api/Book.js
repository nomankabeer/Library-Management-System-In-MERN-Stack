import axios from './axios';
import getAuthHeader from './getAuthHeader';
import BookModel from "../models/Book"
import cookie from "js-cookie";

export const getUserBooks = async (page) => {
  try {
    const { data } = await axios.post(
      // '/u/user',
      // '/auth/user',
      '/u/books/1?search=programing',
      {},
      { headers: await getAuthHeader() }
    );
    // console.log(new BookModel(data) , '=============');
    return { success: true , data: data.books.map(book => new BookModel(book)), };
  } catch (error) {
    return { success: false , message: error };
    switch (error.response.status) {
      case 400:
        return { success: false , message: 'Please login again' };
      default:
        return { success: false , message: 'There was an error logging you in. Please, try again. '}
    }
  }

};
