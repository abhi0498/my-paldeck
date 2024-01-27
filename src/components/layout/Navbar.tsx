import Image from "next/image";
import Link from "next/link";
import React from "react";
import { FiMenu } from "react-icons/fi";

const Navbar = () => {
  return (
    <div className="navbar bg-base-100">
      <div className="navbar-start">
        <div className="drawer w-10">
          <input id="my-drawer" type="checkbox" className="drawer-toggle" />
          <div className="drawer-content">
            <label htmlFor="my-drawer" className="drawer-button">
              <FiMenu className="text-2xl drawer-button" />
            </label>
          </div>
          <div className="drawer-side">
            <label
              htmlFor="my-drawer"
              aria-label="close sidebar"
              className="drawer-overlay"
            ></label>
            <ul className="menu p-4 w-80 min-h-full bg-base-200 text-base-content">
              {/* Sidebar content here */}
              <li>
                <Link href={"/"}> Home </Link>
              </li>
            </ul>
          </div>
        </div>

        <Link href="/" className="text-xl">
          <h1>PalDeck</h1>
        </Link>
      </div>

      <div className="navbar-end"></div>
    </div>
  );
};

export default Navbar;
