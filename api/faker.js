import { faker } from '@faker-js/faker';

const generateTableData = () => {
	const tableData = [];
	for (let i = 1; i <= 500; i++) {
		tableData.push({
			id: i,
			firstName: faker.person.firstName(),
			lastName: faker.person.lastName(),
			email: faker.internet.email(),
			city: faker.location.city(),
			registeredAt: faker.date.past().toISOString(),
		});
	}
	return tableData;
};

const data = generateTableData();
console.log(JSON.stringify(data));
