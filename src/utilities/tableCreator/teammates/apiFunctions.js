export const deleteMember = async (e, cell, setMembers, data, organizationId, removeMember) => {
	try {
		e.stopPropagation();

		const memberId = cell.row.original.id;
		const memberToDelete = data.filter(member => member.id === memberId)
		const memberToDeleteData = {memberId: memberToDelete[0].id, userId: memberToDelete[0].userId, organizationId: organizationId };

		const result = await removeMember(memberToDeleteData);

		// We directly edit the array, so there is no need to refetch the members
		setMembers(prevMembers =>
			prevMembers.filter(member => member.id !== memberId),
		);
	} catch (error) {
		console.error(error);
	}
	
};

export const editMember = (
	e,
	table,
	row,
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

		// we are going to send for update only the member that was changed
		data ? submitFormFunc(data, data[row.id]) : null;
	} else {
		alert(
			'Please check the format for the inputs, (correct email syntax and first and name last).',
		);
	}
};
