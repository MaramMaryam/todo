// utils/auth.ts
export const isAuthenticated = () => {
    return !!document.cookie.split('; ').find(row => row.startsWith('authToken='));
  };
  