import axios from 'axios';

export const fetchSubcategories = async () => {
  const { data } = await axios.get(`https://testdeploy.up.railway.app/api/v1/sub/category/all`);
  return data;
};