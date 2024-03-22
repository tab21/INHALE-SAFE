import React from "react";
import { Menu, MenuItem } from "react-pro-sidebar";
import { RiDashboardFill } from "react-icons/ri";
import { HiOutlineNewspaper } from "react-icons/hi";
import { BiSolidHelpCircle } from "react-icons/bi";
import { FiSettings } from "react-icons/fi";
import { Link } from "react-router-dom";
import "./navbar.css";

// importing logo
import Logo from "../../Assets/Logo.png";

function Sidebars() {
  return (
    <>
      <Menu
        className="bg-mainBlue h-full text-white mr-0.5 text-left hover:rounded-md"
        menuItemStyles={{
          button: {
            [`&.active`]: {
              backgroundColor: "#13395e",
              color: "#b6c8d9",
            },
          },
        }}
      >
        {/* heading for the sidebar */}
        <MenuItem
          icon={<img src={Logo} alt="Logo"></img>}
          className="text-2xl font-bold text-center hover:rounded-md"
          component={<Link to="/" />}
        >
          <h1>
            <span className="text-neonBlue">InHale</span>
            <span className="text-neonGreen">Safe</span>
          </h1>
          <hr />
        </MenuItem>

        {/* menu items */}
        <MenuItem
          className=" hover:text-mainBlue hover:rounded-md"
          icon={<RiDashboardFill size={30} />}
          component={<Link to="/" />}
        >
          Dashboard
        </MenuItem>

        <MenuItem
          className=" hover:text-mainBlue hover:rounded-md"
          icon={<HiOutlineNewspaper size={30} />}
          component={<Link to="/articles" />}
        >
          <Link to="/articles">Articles </Link>
        </MenuItem>

        <MenuItem
          className=" hover:text-mainBlue hover:rounded-md"
          icon={<FiSettings size={30} />}
          component={<Link to="/settings" />}
        >
          <Link to="/settings">Settings </Link>
        </MenuItem>
      </Menu>

      {/* footer */}
      <Menu className="absolute bottom-10 text-white text-left w-[90%] justify-self-center mx-auto">
        <MenuItem
          className="hover:text-mainBlue hover:rounded-md"
          icon={<BiSolidHelpCircle size={30} />}
          component={<Link to="./help" />}
        >
          Help
        </MenuItem>
      </Menu>
    </>
  );
}
export default Sidebars;
