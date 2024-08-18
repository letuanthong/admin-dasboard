import axios from 'axios';

export const fetchProducts = async () => {
  const { data } = await axios.get(`https://testdeploy.up.railway.app/api/v1/products/all`);
  return data;
};