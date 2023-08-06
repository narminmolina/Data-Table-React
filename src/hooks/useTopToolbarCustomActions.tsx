import { Button } from '@mantine/core';
import { useContext, useState } from 'react';
import { MRT_ColumnOrderState, MRT_SortingState } from 'mantine-react-table';
import { IconDeviceFloppy, IconLogout, IconReload } from '@tabler/icons-react';

import { LoginContext } from 'contexts/LoginContext';
import { defaultColumnOrder, defaultSorting, initialColumnOrder } from 'constants';

export const useTopToolbarCustomActions = () => {
	const { logout } = useContext(LoginContext);
	const [sorting, setSorting] = useState<MRT_SortingState>(defaultSorting);
	const [columnOrder, setColumnOrder] = useState<MRT_ColumnOrderState>(defaultColumnOrder);

	const handleSaveButtonClick = () => {
		localStorage.setItem('sorting', JSON.stringify(sorting));
		localStorage.setItem('columnOrder', JSON.stringify(columnOrder));
	};

	const handleLoadButtonClick = () => {
		localStorage.removeItem('sorting');
		localStorage.removeItem('columnOrder');
		setSorting([]);
		setColumnOrder([...initialColumnOrder]);
	};

	const renderTopToolbarCustomActions = () => (
		<div className="table-top-toolbar-custom-actions">
			<Button color="blue.6" onClick={handleSaveButtonClick} variant="filled" rightIcon={<IconDeviceFloppy size={18} />}>
				Save
			</Button>
			<Button color='teal.4' onClick={handleLoadButtonClick} variant="filled" rightIcon={<IconReload size={18} />}>
				Load
			</Button>
			<Button color="blue" variant='outline' onClick={logout} rightIcon={<IconLogout size={18} />}>
				Logout
			</Button>
		</div>
	);

	return {
		sorting,
		columnOrder,
		setSorting,
		setColumnOrder,
		renderTopToolbarCustomActions,
	};
};
