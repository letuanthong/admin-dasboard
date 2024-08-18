import axios from 'axios';

export const login = async (userPhoneNumber: string, userPassword: string) => {
  try {
    const response = await axios.post('https://testdeploy.up.railway.app/api/v1/auth/log-in', {
      userPhoneNumber,
      userPassword
    });
    const token = response.data.data.jwtToken;
    console.log('Received token:', token);
    // Lưu token vào sessionStorage
    sessionStorage.setItem('token', token);
    return token;
  } catch (error) {
    console.error('Error during login:', error);
    // Xử lý lỗi ở đây
    throw error;
  }
};

export const logout = async(jwtToken: string) => {
      // const history = useHistory();
      try {
        const response = await axios.post('https://testdeploy.up.railway.app/api/v1/auth/log-out', {
          jwtToken
        });
        if (response.status === 200) {
          sessionStorage.removeItem('token');
          // history.push('/login');
        }else {
          alert(response.data.message);
          console.log('Failed to logout');
        }
      }catch (error) {
      // Xóa token khỏi sessionStorage
      console.log('Something went wrong:', error);
      }
    };
