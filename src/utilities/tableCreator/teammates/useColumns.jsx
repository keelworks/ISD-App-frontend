import { useMemo } from 'react';
import TableCell from './TableCell';
import options from '../../../pages/TeamMembers/options';

const useColumns = () => {
	return useMemo(
		() => [
			{
				header: 'Name',
				accessorKey: 'name',
				cell: TableCell,
				footer: props => props.column.id,
				meta: {
					type: 'text',
				},
			},
			{
				header: 'Status',
				accessorKey: 'status',
				cell: TableCell,
				footer: props => props.column.id,
				meta: {
					type: 'boolean',
				},
			},
			{
				header: 'Role',
				accessorKey: 'role',
				cell: TableCell,
				footer: props => props.column.id,
				meta: {
					type: 'select',
					options: options,
				},
			},
			{
				header: 'Email address',
				accessorKey: 'email',
				cell: TableCell,
				footer: props => props.column.id,
				meta: {
					type: 'text',
				},
			},
			{
				header: '',
				accessorKey: 'Edit-delete',
				cell: info => info.getValue(),
				footer: props => props.column.id,
				enableSorting: false,
			},
		],
		[],
	);
};

export default useColumns;
