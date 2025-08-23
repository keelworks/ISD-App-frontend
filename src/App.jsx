import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import {
  Home,
  LogIn,
  SignUp,
  Requests,
  CourseRequest,
  CourseRequestById,
  AccountSetUpEmail,
  AccountSetUpNamePassword,
  AccountSetUpCompanyName,
  AccountSetUpAccountSuccessfullyCreated,
  Users,
  Error,
  TeamMembers,
  ISDFlowNeedsAnalysis,
  ISDFlowObjective,
  ISDFlowFinalAssessmentStrategy,
  ISDFlowCourseStructure,
  ISDFlowCourseStrategyDocument,
  NewCourseRequestReview,
} from "./pages";
import { useSelector } from "react-redux";
import { selectCurrentToken } from "./redux/slices/authSlice";
import { history } from "./utilities/_helpers";

const ProtectedRoute = ({ token, children }) => {
  return token ? children : <Navigate to="/" replace={true} />;
};

function App() {
  history.navigate = useNavigate();
  const token = useSelector(selectCurrentToken);

  return (
    <Routes>
      {token ? (
        <Route path="/" element={<Requests />} />
      ) : (
        <Route path="/" element={<Home />} />
      )}
      <Route path="/login" element={<LogIn />} />
      <Route path="/signup" element={<SignUp />} />

      <Route
        path="/*"
        element={
          <ProtectedRoute token={token}>
            <Routes>
              <Route path="/requests" element={<Requests />} />
              <Route path="/course_request" element={<CourseRequest />} />
              <Route
                path="/course_request/:currentRequestId"
                element={<CourseRequestById />}
              />
              <Route
                path="/accountsetup/email"
                element={<AccountSetUpEmail />}
              />
              <Route path="/members" element={<TeamMembers />} />
              <Route
                path="/accountsetup/name_password"
                element={<AccountSetUpNamePassword />}
              />
              <Route
                path="/accountsetup/company_name"
                element={<AccountSetUpCompanyName />}
              />
              <Route
                path="/accountsetup/account_successfully_created"
                element={<AccountSetUpAccountSuccessfullyCreated />}
              />
              <Route path="/accountsetup/users" element={<Users />} />
              <Route
                path="/isdflow/needs_analysis"
                element={<ISDFlowNeedsAnalysis />}
              />
              <Route path="/isdflow/objective" element={<ISDFlowObjective />} />
              <Route
                path="/isdflow/final_assessment_strategy"
                element={<ISDFlowFinalAssessmentStrategy />}
              />
              <Route
                path="/isdflow/course_structure"
                element={<ISDFlowCourseStructure />}
              />
              <Route
                path="/isdflow/course_strategy_document"
                element={<ISDFlowCourseStrategyDocument />}
              />
              <Route
                path="/review/new_course_request/:currentRequestId"
                element={<NewCourseRequestReview />}
              />
            </Routes>
          </ProtectedRoute>
        }
      />

      <Route path="*" element={<Error />} />
    </Routes>
  );
}

export default App;
