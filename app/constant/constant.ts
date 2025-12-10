export const USER_STATUS = {
  ACTIVE: 'active',
  INACTIVE: 'inactive',
}

export const API_URL = {
  REGISTER: { method: 'post', path: '/api/auth/register' },
  LOGIN: { method: 'post', path: '/api/auth/login' },
  CREATE_USER: { method: 'post', path: '/api/users' },
  PRODUCTS: { method: 'get', path: '/api/products' },
  GET_DOC_BY_SLUG: { method: 'post', path: '/api/documentation' },
}

export const USER_ROLE = {
  DPP: 'DPP',
  OB: 'OB',
  ADM: 'ADM',
}
