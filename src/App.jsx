import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
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
  ISDFlowObjective,
  ISDFlowFinalAssessmentStrategy,
  ISDFlowCourseStructure,
  ISDFlowCourseStrategyDocument,
} from "./pages";
import { useSelector } from "react-redux";
import { selectCurrentToken } from "./redux/slices/authSlice";

const ProtectedRoute = ({ token, children }) => {
  return token ? children : <Navigate to="/" replace={true} />;
};

function App() {
  const token = useSelector(selectCurrentToken);

  return (
    <Router>
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
                <Route path="/accountsetup/users" element={<Users />} />
                <Route
                  path="/isdflow/needs_analysis"
                  element={<ISDFlowNeedsAnalysis />}
                />
                <Route
                  path="/isdflow/objective"
                  element={<ISDFlowObjective />}
                />
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
                />{" "}
              </Routes>
            </ProtectedRoute>
          }
        />

        <Route path="*" element={<Error />} />
      </Routes>
    </Router>
  );
}

export default App;
