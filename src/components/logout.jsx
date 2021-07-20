import { useEffect } from "react";
import auth from "../services/authService";

const Logout = () => {
  useEffect(() => {
    auth.logout();
    window.location = "/"; // Reload the page
  }, []);

  return null;
};

export default Logout;
