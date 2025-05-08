import ROLES from"../../utilities/roles.js";

const options = [
	{ value: 'Select role', label: 'Select role' },
	{ value: 'supervisor', label: ROLES.SUPERVISOR },
	{ value: 'manager', label: ROLES.PROJECT_MANAGER },
	{ value: 'stakeholder', label: ROLES.STAKEHOLDER },
	{ value: 'expert', label: ROLES.SME },
	{ value: 'designer', label: ROLES.ISD },
	{ value: 'qa', label: ROLES.QA },
	{ value: 'staff', label: ROLES.SUPPORT_STAFF },
];

export default options;
