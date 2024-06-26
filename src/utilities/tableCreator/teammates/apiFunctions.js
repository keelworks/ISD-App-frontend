export const deleteMember = (e, cell, setMembers) => {
	e.stopPropagation();
	// Using the id api post call needs to be made
	const memberId = cell.row.original.id;

	// For now we directly edit the local array
	setMembers(prevMembers =>
		prevMembers.filter(member => member.id !== memberId),
	);
};

export const editMember = (
	e,
	table,
	row,
	setIsEditing,
	inputErrors,
	data,
	submitFormFunc,
) => {
	e.stopPropagation();

	if (Object.values(inputErrors).every(error => error === null)) {
		// For now we directly edit the local array
		const meta = table.options.meta;
		meta?.setEditedRows(old => ({
			...old,
			[row.id]: !old[row.id],
		}));

		data ? submitFormFunc(data) : null;
	} else {
		alert(
			'Please check the format for the inputs, (correct email syntax and first and name last).',
		);
	}
};
