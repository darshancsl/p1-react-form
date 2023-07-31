import React from "react";
import Nav from 'react-bootstrap/Nav';
import { Link } from "react-router-dom";
import { mainNavigations } from "../../utils/Navigations/mainNavigation";

const Navigation = () => {
  return (
    <Nav variant="dark" className="bg-dark">
      {
        mainNavigations?.map(({path, name}) => {
          return (
            <Nav.Item key={name}>
              <Nav.Link className="text-light fw-medium fs-6" as={Link} to={path}>{name}</Nav.Link>
            </Nav.Item>
          )
        })
      }
    </Nav>
  );
}

export default Navigation;