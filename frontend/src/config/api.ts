import axios from 'axios';

export const getCountryCode = async () => {
  try {
    const response = await axios.get<{
      country_code: string;
    }>('https://ipapi.co/json/');
    const { data } = response;
    return data.country_code;
  } catch (e) {
    console.log(e);
  }
};
