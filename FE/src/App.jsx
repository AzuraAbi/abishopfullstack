import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/home";
import Login from "./pages/login";
import Register from "./pages/register";
import AccountInfo from "./pages/accountinfo";
import SecuritySettings from "./pages/security-settings"
import ChangeUsername from "./pages/changeusername"
import ChangeEmail from "./pages/changeemail"
import ChangePhone from "./pages/changephone"
import ChangePassword from "./pages/changepassword"

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
        <Route path="/security-settings/change-username" element={<ChangeUsername />} />
        <Route path="/security-settings/change-email" element={<ChangeEmail />} />
        <Route path="/security-settings/change-phone" element={<ChangePhone />} />
        <Route path="/security-settings/change-password" element={<ChangePassword />} />
        <Route path="/business-settings" element={<BusinessSettings />} />
        <Route path="/help-settings" element={<HelpSettings />} />
      </Routes>
    </Router>
  );
}

export default App;
