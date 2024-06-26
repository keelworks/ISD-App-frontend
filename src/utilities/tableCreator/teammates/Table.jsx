import React, { useEffect, useRef, useState } from 'react';
import ArrowDown from '../../../assets/icons/arrow-down.svg';
import ArrowUp from '../../../assets/icons/arrow-up.svg';
import Delete from '../../../assets/icons/trash.svg';
import Edit from '../../../assets/icons/edit.svg';
import useColumns from './useColumns';

import {
	flexRender,
	getCoreRowModel,
	getSortedRowModel,
	useReactTable,
} from '@tanstack/react-table';
import { deleteMember, editMember } from './apiFunctions';
import TeammatesModal from '../../modals/TeammatesModal/TeammatesModal';
import useCompanyMembersApi from '../../formPostLogic/companyMembersApi';

const Table = ({ tableData, setMembers }) => {
	const [data, setData] = useState([]);
	const [editedRows, setEditedRows] = useState({});
	const [sorting, setSorting] = useState([]);
	const isResizingRef = useRef(false);
	const columns = useColumns();
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [isEditing, setIsEditing] = useState(false);
	const { submitForm } = useCompanyMembersApi();
	const [inputErrors, setInputErrors] = useState({});
	let errors = {};

	useEffect(() => {
		setData(tableData);
	}, [tableData]);

	const submitFormFunc = members => {
		console.log('test');
		// In the backend they should take the members data and post all the new members
		// Also Update the members that have been edited so
		// We are just posting the data to them.
		submitForm(members);
	};

	const table = useReactTable({
		data,
		columns,
		columnResizeMode: 'onChange',
		state: {
			sorting,
		},
		defaultColumn: {
			size: 50,
		},
		onSortingChange: setSorting,
		getCoreRowModel: getCoreRowModel(),
		getSortedRowModel: getSortedRowModel(),
		meta: {
			editedRows,
			setEditedRows,
			updateData: (rowIndex, columnId, value) => {
				setData(old =>
					old.map((row, index) => {
						if (index === rowIndex) {
							return {
								...old[rowIndex],
								[columnId]: value,
							};
						}
						return row;
					}),
				);
			},
		},
		debugTable: true, //remove for production
	});

	// Table Render helpers
	const renderHeaderSorterIcons = header => {
		const isSortable = header.column.getCanSort();
		if (isSortable) {
			return (
				<>
					{{
						asc: (
							<img
								src={ArrowUp}
								alt='Arrow'
								className='arrow-icon'
							/>
						),
						desc: (
							<img
								src={ArrowDown}
								alt='Arrow'
								className='arrow-icon'
							/>
						),
					}[header.column.getIsSorted() ? 'asc' : 'desc'] ?? null}
				</>
			);
		}
	};

	const renderTableHeaders = headerGroup => {
		return (
			<>
				{headerGroup.headers.map(header => {
					const isSortable = header.column.getCanSort();
					return (
						<th
							className={isSortable ? 'header' : null}
							key={header.id}
							colSpan={header.colSpan}
							onMouseDown={e => {
								if (!isResizingRef.current && isSortable) {
									header.column.getToggleSortingHandler()(e);
								}
							}}
							style={{ width: header.getSize() }}>
							{header.isPlaceholder ? null : (
								<div>
									{flexRender(
										header.column.columnDef.header,
										header.getContext(),
									)}
									{renderHeaderSorterIcons(header)}
								</div>
							)}
							{isSortable ? (
								<div
									{...{
										onDoubleClick: () =>
											header.column.resetSize(),
										onMouseDown: e => {
											isResizingRef.current = true;
											e.stopPropagation();
											header.getResizeHandler()(e);
										},
										onMouseUp: () => {
											e.stopPropagation();
											isResizingRef.current = false;
										},
										onTouchStart: e => {
											isResizingRef.current = true;
											e.stopPropagation();
											header.getResizeHandler()(e);
										},
										onTouchEnd: e => {
											e.stopPropagation();
											isResizingRef.current = false;
										},
										onMouseLeave: e => {
											e.stopPropagation();
											isResizingRef.current = false;
										},
										className: 'resizer',
									}}
								/>
							) : null}
						</th>
					);
				})}
			</>
		);
	};

	const uniqueRenders = cell => {
		if (cell.column.columnDef.header === 'Status') {
			return (
				<div
					className={`status-icon ${
						cell.row.original.status
							? 'active-status'
							: 'inactive-status'
					}`}>
					<span>&bull;</span>
					{cell.row.original.status ? 'Active' : 'invited'}
				</div>
			);
		} else if (cell.column.columnDef.header === '') {
			return (
				<div className='icon-container'>
					<img
						src={Delete}
						alt='Delete'
						className='delete'
						onClick={e => {
							deleteMember(e, cell, setMembers);
						}}
					/>
					<img
						src={Edit}
						alt='Edit'
						className='edit'
						onClick={e => {
							handleKeyDown(e, table, cell.row, setIsEditing);
						}}
					/>
				</div>
			);
		} else {
			return flexRender(cell.column.columnDef.cell, cell.getContext());
		}
	};

	// const renderErrors = (row, cell) => {
	// 	console.log(inputErrors, 'errors check');

	// 	if (
	// 		cell.column.columnDef.header === 'Name' &&
	// 		inputErrors.name &&
	// 		cell.id in inputErrors
	// 	) {
	// 		return errs
	// 	}
	// 	if (
	// 		cell.column.columnDef.header === 'Email address' &&
	// 		inputErrors.email &&
	// 		cell.id in inputErrors
	// 	) {
	// 		alert('Syntax for email address is incorrect');
	// 	}
	// 	return ' ';
	// };

	const renderTableBody = () => {
		return (
			<>
				{table
					.getRowModel()
					.rows.slice(0, 10)
					.map(row => {
						return (
							<tr key={row.id} className='table-body-row'>
								{row.getVisibleCells().map(cell => {
									return (
										<td
											key={cell.id}
											className={`td-cell ${
												cell.column.columnDef.header ===
												'Status'
													? 'status'
													: ''
											} 
											${cell.column.columnDef.header === 'Name' ? 'name' : ''}`}
											style={{
												width: cell.column.getSize(),
											}}>
											{uniqueRenders(cell)}
											{/* <p>{renderErrors(row, cell)}</p> */}
										</td>
									);
								})}
							</tr>
						);
					})}
			</>
		);
	};

	// Api helper function

	const openModal = e => {
		e.stopPropagation();
		setIsModalOpen(prev => !prev);
	};

	const handleKeyDown = (e, table, row, setIsEditing) => {
		setIsEditing(true);
		editMember(
			e,
			table,
			row,
			setIsEditing,
			inputErrors,
			data,
			submitFormFunc,
		);
	};

	const removeEditing = e => {
		e.stopPropagation();

		const isValidEmail = email => {
			const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
			return emailRegex.test(email);
		};

		const isValidName = name => {
			const nameRegex = /^[a-zA-Z]+\s[a-zA-Z]+$/;
			return nameRegex.test(name);
		};

		// const findRowWithIndex = td => {
		// 	let rowIndex = 0;
		// 	let parentNode = td.parentNode.parentNode.parentNode;

		// 	for (let i = 0; i < parentNode.children.length; i++) {
		// 		const row = parentNode.children[i];
		// 		if (row.contains(td)) {
		// 			rowIndex = i;
		// 			break;
		// 		}
		// 	}

		// 	return rowIndex;
		// };

		// const input = e.target;

		// const { rowIndex } = findRowWithIndex(input);
		// console.log(rowIndex, 'index check');

		if (e.target.id === 'email-input') {
			const email = e.target.value;
			if (!isValidEmail(email)) {
				errors['email'] = 'Invalid email Address';
			} else {
				errors['email'] = null;
			}
		}

		if (e.target.id === 'name-input') {
			const name = e.target.value;
			if (!isValidName(name)) {
				errors['name'] = 'Invalid name format';
			} else {
				errors['name'] = null;
			}
		}

		setInputErrors(prev => ({
			...prev,
			...errors,
		}));

		if (
			isEditing &&
			e.key === 'Enter' &&
			Object.values(errors).every(error => error === null)
		) {
			setIsEditing(false);
			const newRowState = {};
			const meta = table.options.meta;
			table.getRowModel().rows.forEach(row => {
				newRowState[row.id] = false; // Mark all rows as not editable
			});
			meta?.setEditedRows(newRowState);

			submitFormFunc(data);
		} else if (
			isEditing &&
			e.key === 'Enter' &&
			Object.values(errors).some(error => error !== null)
		) {
			alert(
				'Please check the format for the inputs, (correct email syntax and first and name last).',
			);
			return;
		}
	};

	useEffect(() => {
		if (isEditing) {
			document.addEventListener('keydown', e => removeEditing(e));
		}

		return () => {
			document.removeEventListener('keydown', e => removeEditing(e));
		};
	}, [isEditing]);

	return (
		<table>
			<thead>
				{table.getHeaderGroups().map(headerGroup => (
					<tr key={headerGroup.id} className='table-header-row'>
						{renderTableHeaders(headerGroup)}
					</tr>
				))}
			</thead>
			<tbody>
				{renderTableBody()}
				<tr className='table-body-row add-teammates'>
					<td
						className='add-teammates-text'
						colSpan={columns.length}
						onClick={e => {
							openModal(e);
						}}>
						+ Add teammates
					</td>
				</tr>
			</tbody>
			<TeammatesModal
				isModalOpen={isModalOpen}
				setIsModalOpen={setIsModalOpen}
				setMembers={setMembers}
				data={data}
			/>
		</table>
	);
};

export default Table;
