import { adminStorage } from './localStorage';

const ADMIN_SESSION_KEY = 'admin_session';

export const authUtils = {
  generateCredentials: () => {
    const username = 'admin' + Math.random().toString(36).substr(2, 6);
    const password = Math.random().toString(36).substr(2, 10);
    return { username, password };
  },

  login: (username: string, password: string): boolean => {
    const credentials = adminStorage.getCredentials();
    if (credentials && credentials.username === username && credentials.password === password) {
      localStorage.setItem(ADMIN_SESSION_KEY, 'true');
      return true;
    }
    return false;
  },

  logout: (): void => {
    localStorage.removeItem(ADMIN_SESSION_KEY);
  },

  isAuthenticated: (): boolean => {
    return localStorage.getItem(ADMIN_SESSION_KEY) === 'true';
  }
};