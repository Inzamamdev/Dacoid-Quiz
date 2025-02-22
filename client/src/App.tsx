import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoutes";
import { Toaster } from "./components/ui/toaster";
import Quiz from "./pages/Quiz";
import LoginPage from "./pages/Login";
import SignupPage from "./pages/Signup";
import QuizHistory from "./pages/History";
function App() {
  return (
    <>
      <Toaster />

      <Router>
        <Routes>
          <Route path="/" element={<SignupPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route element={<ProtectedRoute />}>
            <Route path="/quiz" element={<Quiz />} />
            <Route path="/history" element={<QuizHistory />} />
          </Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
