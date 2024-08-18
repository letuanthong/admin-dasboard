import axios from 'axios';

export const fetchOrders = async () => {
  const { data } = await axios.get(`https://testdeploy.up.railway.app/api/v1/order/all`);
  return data;
};