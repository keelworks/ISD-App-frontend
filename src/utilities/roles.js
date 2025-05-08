const ROLES = {
    ISD_SUPERVISOR: "ISD Supervisor",
    PROJECT_MANAGER: "Project Manager",
    STAKEHOLDER: "Stakeholder",
    SME: "Subject Matter Expert",
    ISD: "Instructional System Designer",
    QA: "QA",
    SUPPORT_STAFF: "Support Staff",
    ADMIN: "Admin",
}

export default ROLES;

export const convertRoleStringToLiteral = role => role.split(" ").join("_").toUpperCase();