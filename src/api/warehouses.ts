import axios from 'axios';

export const fetchWarehouses = async () => {
  const { data } = await axios.get(`https://testdeploy.up.railway.app/api/v1/warehouses`);
  return data;
};