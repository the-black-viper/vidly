import { useEffect } from "react";

const Logout = () => {
  useEffect(() => {
    localStorage.removeItem("token");
    window.location = "/"; // Reload the page
  }, []);

  return null;
};

export default Logout;
