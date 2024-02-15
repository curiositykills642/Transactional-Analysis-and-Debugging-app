import React from "react";
import { Link, useLocation } from "react-router-dom";

function NavLinkItem({ to, children }) {
  const location = useLocation();

  // Check if the current path matches the link's "to" prop
  const isActive = location.pathname === to;

  return (
    <Link to={to} className={`nav-link ${isActive ? "active-link" : ""}`}>
      {children}
    </Link>
  );
}

export default NavLinkItem;
