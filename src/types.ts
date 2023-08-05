export interface TableData {
	id: number;
	firstName: string;
	lastName: string;
	email: string;
	city: string;
	registeredAt: string;
}

export interface ApiResponse {
	data: TableData[];
	meta: {
		currentPage: number;
		pageSize: number;
		totalItemCount: number;
	};
}
