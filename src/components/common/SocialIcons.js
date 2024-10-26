import React from "react";
import { socialIcons } from "../data/Data";
import { Link } from "react-router-dom";

export default function SocialIcons() {
  return (
    <>
      <div className="col-lg-3 px-5">
        <div className="d-inline-flex align-items-center py-2">
          <nav className="navbar navbar-expand-lg bg-dark navbar-dark p-3 p-lg-0">
            <div className="navbar-nav mr-auto py-0">
              <Link to={`/account`} className="nav-link">
                Đăng nhập
              </Link>
            </div>
          </nav>
        </div>
      </div>
    </>
  );
}
