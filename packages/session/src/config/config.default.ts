export const session = {
  maxAge: 24 * 3600 * 1000, // ms
  key: 'FAAS_SESS',
  httpOnly: true,
  encrypt: true,
  // sameSite: null,
};
