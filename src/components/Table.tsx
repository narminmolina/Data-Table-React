import { Text, Title } from '@mantine/core';
import { useInfiniteQuery } from '@tanstack/react-query';
import { UIEvent, useCallback, useEffect, useMemo, useRef } from 'react';
import { MantineReactTable, MRT_Virtualizer } from 'mantine-react-table';

import { ApiResponse } from 'types';
import { columns } from 'constants';
import { fetchTableData } from 'utils';
import { useTopToolbarCustomActions } from 'hooks/useTopToolbarCustomActions';

// NOTE: The number of items to render above and below the visible area.
// More info can be found here: https://tanstack.com/virtual/v3/docs/api/virtualizer#overscan
const rowVirtualizerProps = { overscan: 25 };
const bottomToolbarProps = { style: { display: 'flex', alignItems: 'center' } };

export const Table = () => {
	const tableContainerRef = useRef<HTMLDivElement>(null);
	const rowVirtualizerInstanceRef = useRef<MRT_Virtualizer<HTMLDivElement, HTMLTableRowElement>>(null);
	// prettier-ignore
	const { sorting, columnOrder, setSorting, setColumnOrder, renderTopToolbarCustomActions } = useTopToolbarCustomActions();

	const { data, fetchNextPage, isError, isFetching, isLoading } = useInfiniteQuery<ApiResponse>({
		queryKey: ['table-data'],
		queryFn: fetchTableData,
		getNextPageParam: (_lastPage, allPages) => allPages.length,
		keepPreviousData: true,
		refetchOnWindowFocus: false,
	});

	const flatData = useMemo(() => data?.pages.flatMap(page => page.data) ?? [], [data]);
	const totalFetchedItems = flatData.length;
	const totalItemCount = data?.pages.at(0)?.meta.totalItemCount ?? 0;

	const fetchMoreOnBottomReached = useCallback(
		(containerRefElement: HTMLDivElement | null) => {
			if (containerRefElement) {
				const { scrollHeight, scrollTop, clientHeight } = containerRefElement;
				// NOTE: Once the user has scrolled within 400px of the bottom of the table, fetch more data if we can.
				if (scrollHeight - scrollTop - clientHeight < 400 && !isFetching && totalFetchedItems < totalItemCount) {
					fetchNextPage();
				}
			}
		},
		[fetchNextPage, isFetching, totalFetchedItems, totalItemCount]
	);

	const toolbarAlertBannerProps = useMemo(
		() => (isError ? { color: 'red', children: 'Error loading data' } : undefined),
		[isError]
	);

	const tableContainerProps = useMemo(
		() => ({
			ref: tableContainerRef,
			style: { maxHeight: '600px' },
			onScroll: (event: UIEvent<HTMLDivElement>) => fetchMoreOnBottomReached(event.target as HTMLDivElement),
		}),
		[fetchMoreOnBottomReached]
	);

	const renderBottomToolbarCustomActions = useCallback(
		() => (
			<Text>
				Fetched {totalFetchedItems} of {totalItemCount} total rows.
			</Text>
		),
		[totalItemCount, totalFetchedItems]
	);

	// NOTE: This is for scrolling to top of table when sorting changes.
	useEffect(() => {
		if (rowVirtualizerInstanceRef.current) {
			rowVirtualizerInstanceRef.current.scrollToIndex(0);
		}
	}, [sorting]);

	return (
		<>
			<Title order={1} align="center" mb={20} mt={20}>
				React Data Table with Infinite Scrolling, Virtualization and Custom Actions implemented with Mantine UI Library
			</Title>
			<MantineReactTable
				data={flatData}
				columns={columns}
				enableColumnOrdering
				enablePagination={false}
				enableColumnActions={false}
				enableDensityToggle={false}
				enableRowVirtualization
				initialState={{
					showGlobalFilter: true,
				}}
				enableColumnFilters={false}
				enableFullScreenToggle={false}
				mantineSearchTextInputProps={{ sx: { marginRight: '1rem' } }}
				mantineBottomToolbarProps={bottomToolbarProps}
				mantineTableContainerProps={tableContainerProps}
				mantineToolbarAlertBannerProps={toolbarAlertBannerProps}
				onColumnOrderChange={setColumnOrder}
				onSortingChange={setSorting}
				renderTopToolbarCustomActions={renderTopToolbarCustomActions}
				renderBottomToolbarCustomActions={renderBottomToolbarCustomActions}
				rowVirtualizerInstanceRef={rowVirtualizerInstanceRef}
				rowVirtualizerProps={rowVirtualizerProps}
				state={{
					isLoading,
					showAlertBanner: isError,
					showProgressBars: isFetching,
					sorting,
					columnOrder,
				}}
			/>
		</>
	);
};
