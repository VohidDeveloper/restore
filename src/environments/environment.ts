import { ENDPOINTS } from 'shared/constants';

const DOMAIN = 'https://api.ai-restovration.com/';
export const environment = {
  production: false,
  webApi: DOMAIN + 'api/v1',
  authApi: DOMAIN + 'api/v1/auth',
  api: ENDPOINTS,
};
