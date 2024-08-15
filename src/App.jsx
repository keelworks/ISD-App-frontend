import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import {
  Home,
  LogIn,
  SignUp,
  Requests,
  CourseRequest,
  AccountSetUpEmail,
  AccountSetUpNamePassword,
  AccountSetUpCompanyName,
  Users,
  Error,
  TeamMembers,
  ISDFlowNeedsAnalysis,
  Objective,
} from "./pages";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useGetAuthStatusQuery } from "./redux/RTKQueries/authQuery";
import { logIn, logOut } from "./redux/slices/authSlice";
import FinalAssessmentStrategy from "./pages/ISDFlow/FinalAssessmentStrategy/FinalAssessmentStrategy";
import CourseStructure from "./pages/ISDFlow/CourseStructure/CourseStructure.jsx";

function App() {
  const dispatch = useDispatch();
  const { data, error } = useGetAuthStatusQuery();

  useEffect(() => {
    // Check the authentication status
    if (data) {
      dispatch(logIn());
    }

    if (error) {
      dispatch(logOut());
    }
  }, [data, error, dispatch]);

  return (
    <Router>
      <Routes>
        {data ? (
          <Route path="/" element={<CourseRequest />} />
        ) : (
          <Route path="/" element={<Home />} />
        )}
        <Route path="/login" element={<LogIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/requests" element={<Requests />} />
        <Route path="/course_request" element={<CourseRequest />} />
        <Route path="/accountsetup/email" element={<AccountSetUpEmail />} />
        <Route path="/members" element={<TeamMembers />} />
        <Route
          path="/accountsetup/name_password"
          element={<AccountSetUpNamePassword />}
        />
        <Route
          path="/accountsetup/company_name"
          element={<AccountSetUpCompanyName />}
        />
        <Route path="/accountsetup/users" element={<Users />} />
        <Route
          path="/isdflow/needs_analysis"
          element={<ISDFlowNeedsAnalysis />}
        />
        <Route path="/isdflow/objective" element={<Objective />} />
        <Route
          path="/isdflow/final_assessment_strategy"
          element={<FinalAssessmentStrategy />}
        />
        <Route path="/isdflow/course_structure" element={<CourseStructure />} />
        <Route path="*" element={<Error />} />
      </Routes>
    </Router>
  );
}

export default App;
