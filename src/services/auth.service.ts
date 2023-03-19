import instance from '@/services/instance';
import { GetTokenResponse } from '@/types/services/auth';
import { LOCAL_STORAGE_KEYS } from '@/types/common/local-storage';

class Auth {
  getToken = async (): Promise<GetTokenResponse> => {
    const res = await instance.get(`/auth/anonymous?platform=subscriptions`);
    localStorage.setItem(LOCAL_STORAGE_KEYS.TOKEN, res.data.token);
    return res.data;
  };
}

const AuthService = new Auth();
export default AuthService;
