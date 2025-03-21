import AsyncStorage from '@react-native-async-storage/async-storage';
import { loginUser, logoutUser, register } from '@/api/user/userApi';
import { User } from '@/api/user/userModel';

class AuthService {
    private static userKey = 'loggedInUser';

    static async login(email: string, password: string): Promise<User> {
        const user = await loginUser(email, password);
        await AsyncStorage.setItem(this.userKey, JSON.stringify(user));
        return user;
    }

    static async register(name: string, email: string, password: string): Promise<User> {
        const user = await register(name, email, password);
        await AsyncStorage.setItem(this.userKey, JSON.stringify(user));
        return user;
    }

    static async getUser(): Promise<User | null> {
        const userJson = await AsyncStorage.getItem(this.userKey);
        if (userJson) {
            return JSON.parse(userJson);
        }
        return null;
    }

    static async isUserLoggedIn(): Promise<boolean> {
        const user = await this.getUser();
        return user !== null;
    }

    static async hasBackendSession(): Promise<boolean> {
        const cookies = await AsyncStorage.getItem('backend_session');
        return cookies !== null;
    }

    static async logout(): Promise<void> {
        await logoutUser();
        await AsyncStorage.removeItem(this.userKey);
        await AsyncStorage.removeItem('backend_session');
    }
}

export default AuthService;