const formDataFormatter = formData => {
	const organizedData = [];

	Object.keys(formData).forEach(key => {
		const id = key.split('_')[0];

		const index = organizedData.findIndex(item => item.id === id);

		if (index === -1) {
			const newItem = { id, status: false };
			newItem[key.split('_')[1]] = formData[key];
			organizedData.push(newItem);
		} else {
			organizedData[index][key.split('_')[1]] = formData[key];
		}
	});

	return organizedData;
};

export default formDataFormatter;
