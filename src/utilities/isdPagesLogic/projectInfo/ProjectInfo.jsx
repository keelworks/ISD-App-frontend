import "./ProjectInfo.scss";

const InfoBlock = ({ title, content }) => {
  return (
    <li key={title} className="info-block">
      <div className="title">{title}</div>
      <div className="content">{content}</div>
    </li>
  );
};
const ProjectInfo = () => {
  //TODO: Need to retrieve the project info from the backend
  const INFO = [
    { "Project ID": "ID13405GE3045" },
    { "Delivery Date": "September 30, 2023" },
    { Stakeholder: "Thomas Garrod" },
    { "Subject Matter Expert": "Gagan Gundyadka" },
    { "Instructional System Designer": "Irina Lavrova" },
    { "Quality Assurance": "Lei Lei" },
  ];

  const info = INFO.map((item) => {
    const title = Object.keys(item)[0];
    return <InfoBlock title={title} content={item[title]} />;
  });

  return (
    <div className="isd-flow-project-info-container">
      <ul className="isd-flow-project-info">{info}</ul>
    </div>
  );
};

export default ProjectInfo;
