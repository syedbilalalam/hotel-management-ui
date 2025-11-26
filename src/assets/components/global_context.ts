import { createContext } from 'react';
import type { Login } from '@src/main';

interface UserContextObject {
    login: Login;
}

// User Context for global app variables
export const UserContext = createContext<UserContextObject | null>(null);