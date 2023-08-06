import { MRT_ColumnDef } from 'mantine-react-table';

import { TableData } from 'types';
import { getDaysSinceRegistration } from 'utils';

const storedSorting = localStorage.getItem('sorting');
const storedColumnOrder = localStorage.getItem('columnOrder');

export const initialColumnOrder = [
	'id',
	'firstName',
	'lastName',
	'fullName',
	'email',
	'city',
	'registeredAt',
	'daysSinceRegistration',
];
// NOTE: We need to destruct initialColumnOrder array into a new array in order to pass new reference to the Table component.
// Because mantine-react-table component keeps same reference to initialColumnOrder array and mutates it's value.
export const defaultColumnOrder = storedColumnOrder ? JSON.parse(storedColumnOrder) : [...initialColumnOrder];
export const defaultSorting = storedSorting ? JSON.parse(storedSorting) : [];
const dateTimeFormatOptions: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };

export const columns: MRT_ColumnDef<TableData>[] = [
	{ accessorKey: 'id', header: 'ID', maxSize: 130 },
	{ accessorKey: 'firstName', header: 'First name' },
	{ accessorKey: 'lastName', header: 'Last Name' },
	{ accessorKey: 'email', header: 'Email' },
	{ accessorKey: 'city', header: 'City' },
	{
		id: 'fullName',
		header: 'Full Name',
		accessorFn: row => `${row.firstName} ${row.lastName}`,
	},
	{
		id: 'registeredAt',
		header: 'Registered At',
		minSize: 200,
		accessorFn: row => new Intl.DateTimeFormat('en', dateTimeFormatOptions).format(new Date(row.registeredAt)),
	},
	{
		id: 'daysSinceRegistration',
		header: 'DSR',
		maxSize: 130,
		accessorFn: row => getDaysSinceRegistration(row.registeredAt),
	},
];
