import { getItem } from './storage'

const TTL_AUTH_CHECK = 4 * 3600;

export const isAuth = () => {

    const user = getItem('user');

    if (!user) {
        return false;
    }

    const exp = new Date(user.storage_at).getTime() + (TTL_AUTH_CHECK * 1000);

    if (exp > new Date().getTime()) {
        return true;
    }

    return false;
}
