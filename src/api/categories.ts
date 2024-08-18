import axios from 'axios';

export const fetchCategories = async () => {
  const { data } = await axios.get(`https://testdeploy.up.railway.app/api/v1/category/all`);
  return data;
};