import { useState } from "react";
import "./TeamMembers.scss";
import { useNavigate } from "react-router-dom";
import Table from "../../utilities/tableCreator/teammates/Table";
import { useEffect } from "react";
import { useLazyGetMembersByOrganizationIdQuery } from "../../redux/RTKQueries/membersQuery";
import { useSelector } from "react-redux";
import { selectCurrentCompanyId } from "../../redux/slices/currentUserSlice";
import { transformMembersData } from "../../utilities/utils";

const TeamMembers = () => {
  const organizationId = useSelector(selectCurrentCompanyId);
  const navigate = useNavigate();
  const [fetchMembers] = useLazyGetMembersByOrganizationIdQuery();

  const [members, setMembers] = useState([]);

  useEffect(() => {
    (async function () {
      try {
        const members = await fetchMembers(organizationId);
        setMembers(transformMembersData(members.data));
      } catch (error) {
        console.error("Fetching error: ", error);
      }
    })();
  }, []);

  //Make api call here and set to setMembers instead of using dummy data.

  //   const [members, setMembers] = useState([
  //     {
  //       id: 1,
  //       name: "Jake Jill",
  //       status: true,
  //       role: "Stakeholder",
  //       email: "da@da.com",
  //     },
  //     {
  //       id: 2,
  //       name: "Justin Trudeau",
  //       status: true,
  //       role: "Stakeholder",
  //       email: "da33@d33a.com",
  //     },
  //   ]);

  useEffect(() => {
    console.log(members);
  }, [members]);

  const goToDashboard = () => {
    navigate("/requests");
  };

  return (
    <main className="table-main">
      <button className="button go-to-dashboard" onClick={goToDashboard}>
        Go to Dashboard
      </button>
      <div className="table-container">
        <div className="members">
          <div className="table-header-container">
            <div>Team members</div>
            <div className="user-count">{members.length} users</div>
          </div>
          {members && <Table tableData={members} setMembers={setMembers} />}
        </div>
      </div>
    </main>
  );
};

export default TeamMembers;
