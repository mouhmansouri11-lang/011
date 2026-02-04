import { Toaster } from "sonner";
import { TooltipProvider } from "./components/ui/tooltip";
import NotFound from "./pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import { AuthProvider } from "./contexts/AuthContext";
import Home from "./pages/Home";
import PatientLogin from "./pages/auth/PatientLogin";
import ProfessionalLogin from "./pages/auth/ProfessionalLogin";
import PatientDashboard from "./pages/patient/Dashboard";
import BloodPressureDetail from "./pages/patient/BloodPressureDetail";
import BloodSugarDetail from "./pages/patient/BloodSugarDetail";
import Appointments from "./pages/patient/Appointments";
import SearchDoctors from "./pages/patient/SearchDoctors";
import Prescriptions from "./pages/patient/Prescriptions";
import LabResults from "./pages/patient/LabResults";
import PatientRegister from "./pages/auth/PatientRegister";
import ProfessionalRegister from "./pages/auth/ProfessionalRegister";
import DoctorDashboard from "./pages/doctor/Dashboard";

function Router() {
  return (
    <Switch>
      <Route path={"/"} component={Home} />
      <Route path={"/auth/patient/login"} component={PatientLogin} />
      <Route path={"/auth/patient/register"} component={PatientRegister} />
      <Route path={"/auth/professional/login"} component={ProfessionalLogin} />
      <Route path={"/auth/professional/register"} component={ProfessionalRegister} />
      <Route path={"/patient/dashboard"} component={PatientDashboard} />
      <Route path={"/patient/health/blood-pressure"} component={BloodPressureDetail} />
      <Route path={"/patient/health/blood-sugar"} component={BloodSugarDetail} />
      <Route path={"/patient/appointments"} component={Appointments} />
      <Route path={"/patient/search"} component={SearchDoctors} />
      <Route path={"/patient/prescriptions"} component={Prescriptions} />
      <Route path={"/patient/lab-results"} component={LabResults} />
      <Route path={"/doctor/dashboard"} component={DoctorDashboard} />
      <Route path={"/404"} component={NotFound} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider
        defaultTheme="light"
      >
        <AuthProvider>
          <TooltipProvider>
            <Toaster />
            <Router />
          </TooltipProvider>
        </AuthProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
