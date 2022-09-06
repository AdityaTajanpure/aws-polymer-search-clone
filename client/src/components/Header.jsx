import { Navbar, Nav, NavDropdown } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import { AiFillBulb, AiOutlineReload } from "react-icons/ai";
import { RiVipDiamondFill } from "react-icons/ri";
import { FaAws } from "react-icons/fa";

function Header() {
  return (
    <>
      <Navbar className="navbarContainer" expand="lg">
        <Navbar.Brand className="d-flex align-items-center ms-2">
          <FaAws className="d-inline-block align-top pr-2" size={"2em"} />
          <h5 className="navTitle">Everything AWS</h5>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mx-auto">
            <div id="searchId">
              <Nav.Link href="#">
                <NavLink
                  className="navItem"
                  to="/search"
                  activeClassName="setItem"
                >
                  Search & Query
                </NavLink>
              </Nav.Link>
            </div>
            <div id="chartId">
              <Nav.Link href="#">
                <NavLink
                  to="/chart"
                  className="navItem"
                  activeClassName="setItem"
                >
                  Visualize
                </NavLink>
              </Nav.Link>
            </div>
          </Nav>
          <Nav className="mx-auto">
            <Nav.Link href="#">
              <h5 className="bulbIcon">
                <AiFillBulb />
              </h5>
            </Nav.Link>
            <Nav.Link href="#">
              <NavLink to="/query">
                <h5 className="reloadIcon">
                  <AiOutlineReload />
                </h5>
              </NavLink>
            </Nav.Link>
            <NavDropdown title="More sites" id="collasible-nav-dropdown">
              <NavDropdown.Item
                href="https://flixgem.com/?utm_source=aws"
                target="_blank"
              >
                <div className="d-flex gap-2 align-items-center">
                  <div>
                    <h4 style={{ color: "blue" }}>
                      <RiVipDiamondFill />
                    </h4>
                  </div>
                  <div>
                    <b>FlixGem</b>
                    <p>Discover Hidden gems for your netflix </p>
                  </div>
                </div>
              </NavDropdown.Item>
              <NavDropdown.Item
                href="https://interviewgeni.us/?utm_source=aws"
                target="_blank"
              >
                <div className="d-flex gap-2 align-items-center">
                  <div>
                    <h4 className="bulbIcon">
                      <AiFillBulb />
                    </h4>
                  </div>
                  <div>
                    <b>InterviewGenius</b>
                    <p>Master your Tech interview </p>
                  </div>
                </div>
              </NavDropdown.Item>
            </NavDropdown>
            <Nav.Link
              className="polymer"
              href="https://www.polymersearch.com/?utm_source=aws"
              target="_blank"
            >
              <h6>Built with Polymer</h6>
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </>
  );
}
export default Header;
