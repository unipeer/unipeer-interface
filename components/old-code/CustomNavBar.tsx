<Navbar bg="light" expand="lg">
  <Container>
    <Navbar.Brand href="#home">
      <img
        src="/nav_logo.svg"
        width="150"
        height="30"
        className="d-inline-block align-top"
        alt="Unipeer logo"
      />
    </Navbar.Brand>
    <Navbar.Toggle aria-controls="basic-navbar-nav" />
    <Navbar.Collapse id="basic-navbar-nav">
      <Nav
        className="me-auto"
        onSelect={(selectedKey, test) => {
          if (selectedKey === "method") {
            {
              console.log("handle paypal");
              handleShow;
            }
          }
        }}
      >
        <Nav.Item>
          <Nav.Link eventKey="chain">
            <img
              src="/ic_venmo.svg"
              width="30"
              height="30"
              className="d-inline-block align-top"
              alt="Gnosis"
            />{" "}
            Gnosis
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="method" onClick={handleShow}>
            <img
              src="/ic_paypal.svg"
              width="30"
              height="30"
              className="d-inline-block align-top"
              alt="Paypal"
            />{" "}
            Paypal
          </Nav.Link>
        </Nav.Item>
        {/* <NavDropdown title="Paypal" id="basic-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">
                <img
                  src="/ic_paypal.svg"
                  width="30"
                  height="30"
                  className="d-inline-block align-top"
                  alt="Gnosis"
                />{" "}
                Paypal
              </NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">
                <img
                  src="/ic_venmo.svg"
                  width="30"
                  height="30"
                  className="d-inline-block align-top"
                  alt="Gnosis"
                />{" "}
                Venmo
              </NavDropdown.Item>
            </NavDropdown> */}
      </Nav>
      <Nav>
        <NavDropdown.Item>
          <CustomConnectKitButton isNav={true} />
        </NavDropdown.Item>
      </Nav>
    </Navbar.Collapse>
  </Container>
</Navbar>;
