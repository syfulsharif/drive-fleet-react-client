import { api } from './axios';

const GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID || '';

export const googleLogin = async (credential) => {
  const { data } = await api.post('/auth/google', { credential });
  return data;
};

export const initializeGoogleSignIn = (callback) => {
  if (window.google && window.google.accounts) {
    window.google.accounts.id.initialize({
      client_id: GOOGLE_CLIENT_ID,
      callback: callback,
    });
    return true;
  }
  return false;
};

export const renderGoogleButton = (elementId, callback) => {
  if (window.google && window.google.accounts) {
    window.google.accounts.id.renderButton(
      document.getElementById(elementId),
      { theme: 'outline', size: 'large', width: '100%' }
    );
    return true;
  }
  return false;
};