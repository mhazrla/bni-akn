export const GlobalComponent = {
  // Api Calling
  API_URL: 'https://api-node.themesbrand.website/',
  // API_URL : 'http://127.0.0.1:3000/',
  headerToken: { Authorization: `Bearer ${localStorage.getItem('token')}` },

  // API Dev
  API_DEV: 'http://localhost:3000/api/',

  // API AIO
  API_AIO: 'https://myapps.aio.co.id/cms-api-dev/api/auth/employee',

  // Auth Api
  AUTH_API: 'https://api-node.themesbrand.website/auth/',
  AUTH_DEV: 'http://localhost:3000/api/auth/',

  // Products Api
  // product: 'apps/product',
  productDelete: 'apps/product/',

  // Orders Api
  order: 'apps/order',
  orderId: 'apps/order/',

  // Customers Api
  customer: 'apps/customer',

  // Admin
  admin: 'admin/',
  // User Data API
  user: 'user-data/user/',
  stock: 'stock/',
  request: 'request/',
  products: 'products/',
  verified: 'verified/',
  transaction: 'transaction/',
  history: 'history/',

  // Role
  roles: 'roles/',
  permissions: 'permissions/',
};
