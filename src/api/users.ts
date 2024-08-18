import axios from 'axios';

export const fetchUsers = async () => {
  const { data } = await axios.get(`https://testdeploy.up.railway.app/api/v1/users/all`);
  return data;
};