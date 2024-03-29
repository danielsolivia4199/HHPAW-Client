/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import Link from 'next/link';
import {
  Navbar, //
  Container,
  Nav,
  Button,
} from 'react-bootstrap';
import { signOut } from '../utils/auth';

export default function NavBar() {
  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark" className="custom-navbar">
      <Container>
        <Link passHref href="/">
          <Navbar.Brand className="custom-navbar-text">Hip Hop Pizza and Wangs</Navbar.Brand>
        </Link>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            {/* CLOSE NAVBAR ON LINK SELECTION: https://stackoverflow.com/questions/72813635/collapse-on-select-react-bootstrap-navbar-with-nextjs-not-working */}
            <Link passHref href="/">
              <Nav.Link>Home</Nav.Link>
            </Link>
            <Link passHref href="/orders">
              <Nav.Link>View Orders</Nav.Link>
            </Link>
            <Link passHref href="/orders/new">
              <Nav.Link>Create Order</Nav.Link>
            </Link>
            <Link passHref href="/revenue">
              <Nav.Link>Revenue</Nav.Link>
            </Link>
            <Button variant="primary" size="sm" onClick={signOut}>
              Sign Out
            </Button>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
