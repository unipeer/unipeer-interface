import Link from "next/link";
import { ConnectKitButton } from "connectkit";
import { CustomConnectKitButton } from "./CustomConnectKitButton";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import React, { useState } from "react";
import { render } from "react-dom";
import Form from "react-bootstrap/Form";
import ToggleButton from "react-bootstrap/ToggleButton";
import ToggleButtonGroup from "react-bootstrap/ToggleButtonGroup";
import { ButtonGroup } from "react-bootstrap";
import PaymentModeModal from "./modals/payment";

export default function CustomNavBar() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  //   <header>
  //   <nav>
  //     <Bars />
  //     <ul className="flex justify-between items-center p-8">
  //       <li>
  //         <Link href="/">
  //           {/* <a className="text-black-500 no-underline font-medium text-lg">
  //             Unipeer
  //           </a> */}
  //         </Link>
  //       </li>
  //       <li></li>
  //       <li>
  //         <CustomConnectKitButton isNav={true} />
  //       </li>
  //     </ul>
  //   </nav>
  // </header>

  const [paymentModeValue, setPaymentModeValue] = useState(1);
  return (
    <>
      <PaymentModeModal />
      {/* <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Payment Mode</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div id="center-vertical">
            <ToggleButtonGroup
              type="radio"
              name="options"
              vertical={true}
              defaultValue={1}
            >
              <ToggleButton
                id="tbg-check-1"
                value={1}
                variant="primary"
                onChange={(e) => setPaymentModeValue(1)}
                size="lg"
                checked={paymentModeValue === 1}
                className={paymentModeValue === 1 ? "b1" : "b2"}
              >
                Paypal
                <br />
                No address selected
              </ToggleButton>
              <br />
              <ToggleButton
                id="tbg-check-2"
                value={2}
                variant="primary"
                onChange={(e) => setPaymentModeValue(2)}
                size="lg"
                checked={paymentModeValue === 2}
                className={paymentModeValue === 2 ? "b1" : "b2"}
              >
                Venmo
                <br />
                No address selected
              </ToggleButton>
            </ToggleButtonGroup>
          </div>
        </Modal.Body>
      </Modal> */}
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
      </Navbar>
    </>
  );
}
