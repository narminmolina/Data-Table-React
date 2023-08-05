import { ReactNode, createContext, useState } from 'react';

interface LoginContextParams {
	isUserLoggedIn: boolean;
	login: () => void;
	logout: () => void;
}
interface LoginProviderProps {
	children: ReactNode;
}

export const LoginContext = createContext<LoginContextParams>({
	isUserLoggedIn: false,
	login: () => null,
	logout: () => null,
});

export const LoginProvider = ({ children }: LoginProviderProps) => {
	const [isUserLoggedIn, setIsUserLoggedIn] = useState<boolean>(() =>
		JSON.parse(localStorage.getItem('isUserLoggedIn') || 'false')
	);

	const login = () => {
		setIsUserLoggedIn(true);
		localStorage.setItem('isUserLoggedIn', 'true');
	};

	const logout = () => {
		setIsUserLoggedIn(false);
		localStorage.removeItem('isUserLoggedIn');
	};

	return <LoginContext.Provider value={{ isUserLoggedIn, login, logout }}>{children}</LoginContext.Provider>;
};
