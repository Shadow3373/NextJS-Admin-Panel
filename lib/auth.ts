// Client-side localStorage management
export const getTokenClient = (): string | undefined => {
  return localStorage.getItem('token') || undefined;
};

export const setTokenClient = (token: string, expiresInDays = 7): void => {
  localStorage.setItem('token', token);
  // Store expiration date separately if needed
  const expirationDate = new Date();
  expirationDate.setDate(expirationDate.getDate() + expiresInDays);
  localStorage.setItem('tokenExpiration', expirationDate.toISOString());
};

export const removeTokenClient = (): void => {
  localStorage.removeItem('token');
  localStorage.removeItem('tokenExpiration');
};

export const isAuthenticatedClient = (): boolean => {
  return !!getTokenClient();
};