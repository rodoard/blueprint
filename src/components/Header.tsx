import { NavLink } from "@remix-run/react";
import { Navbar } from "flowbite-react";

export const Header = () => (
  <Navbar
    fluid
    rounded
  >
    <Navbar.Toggle />
    <Navbar.Collapse>
      <NavLink to="/" end>
        Home
      </NavLink>
    </Navbar.Collapse>
  </Navbar>
)