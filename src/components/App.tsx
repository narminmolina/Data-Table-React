import { useContext } from 'react';

import { Table } from 'components/Table';
import { Login } from 'components/Login';
import { LoginContext } from 'contexts/LoginContext';

export const App = () => {
	const { isUserLoggedIn } = useContext(LoginContext);

	return isUserLoggedIn ? <Table /> : <Login />;
};
