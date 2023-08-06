import { ApiResponse } from 'types';

export const getDaysSinceRegistration = (registeredAt: string) => {
	const today = new Date();
	const registrationDate = new Date(registeredAt);
	const difference = Math.abs(today.getTime() - registrationDate.getTime());
	const daysSinceRegistration = Math.ceil(difference / (1000 * 60 * 60 * 24));
	return daysSinceRegistration;
};

export const fetchTableData = async ({ pageParam = 0 }) => {
	const fetchSize = 50;
	const url = new URL('http://localhost:4200/api/table-data');

	url.searchParams.set('start', `${pageParam * fetchSize}`);
	url.searchParams.set('size', `${fetchSize}`);

	const response = await fetch(url.href);
	const json = (await response.json()) as ApiResponse;
	return json;
};
