import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/home";
import Login from "./pages/login";
import Register from "./pages/register";
import AccountInfo from "./pages/accountinfo";
import SecuritySettings from "./pages/security-settings"
import BusinessSettings from "./pages/business-settings"
import HelpSettings from "./pages/help-settings"

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/accountinfo" element={<AccountInfo />} />
        <Route path="/security-settings" element={<SecuritySettings />} />
        <Route path="/business-settings" element={<BusinessSettings />} />
        <Route path="/help-settings" element={<HelpSettings />} />
      </Routes>
    </Router>
  );
}

export default App;
