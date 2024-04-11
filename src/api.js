
import axios from 'axios';

const GET_QR_API = 'http://localhost:3003/qrsessions'
// const GET_QR_API = '/qrsessions'


// API for QR check-in screen
export const fetchQR = async (callback) => {
  try {
    const response = await axios.get(GET_QR_API);
    return response;
  } catch (error) {
    console.error('Error fetching data: ', error);
  }
};



  