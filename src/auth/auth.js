import { jwtDecode } from 'jwt-decode';

export const getCurrentUser = () => {
  const token = localStorage.getItem('accessToken');
  if (!token) return null;

  try {
    const decoded = jwtDecode(token);
    return {
      id: decoded.id,
      email: decoded.sub,
      firstName: decoded.firstName,
      exp: decoded.exp
    };
  } catch (error) {
    return null;
  }
};

