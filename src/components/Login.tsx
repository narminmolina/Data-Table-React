import { useContext } from 'react';
import { Button, TextInput } from '@mantine/core';

import { LoginContext } from 'contexts/LoginContext';

const hardCodedUsers = [
	{ email: 'user@gmail.com', password: '123456' },
	{ email: 'test@gmail.com', password: '123456' },
];

export const Login = () => {
	const { login } = useContext(LoginContext);

	const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		const target = event.target as HTMLFormElement;
		const { value: email } = target.elements.namedItem('email') as HTMLInputElement;
		const { value: password } = target.elements.namedItem('password') as HTMLInputElement;

		if (!hardCodedUsers.find(user => user.email === email && user.password === password)) {
			alert('Invalid email or password');
			return;
		}

		login();
	};

	return (
		<form className="login-form" onSubmit={handleSubmit}>
			<TextInput type="email" name="email" label="Email" placeholder="Please enter email" required />
			<TextInput type="password" name="password" label="Password" placeholder="Please enter password" required />
			<Button type="submit" color="indigo">
				Login
			</Button>
		</form>
	);
};
