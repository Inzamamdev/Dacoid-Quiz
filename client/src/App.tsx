import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { Toaster } from "./components/ui/toaster";
import Quiz from "./pages/Quiz";
import LoginPage from "./pages/Login";
import SignupPage from "./pages/Signup";
function App() {
  return (
    <>
      <Toaster />
      <Router>
        <Routes>
          <Route path="/" element={<SignupPage />} />
          <Route path="/login" element={<LoginPage />} />

          <Route path="/quiz" element={<Quiz />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
